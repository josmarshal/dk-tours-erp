import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

export const requirePermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // In a real app, userId would come from a verified JWT token.
      // For MVP, we'll assume it's passed in headers.
      const userId = req.headers['x-user-id'] as string;
      const orgId = req.headers['x-org-id'] as string;

      if (!userId || !orgId) {
        return res.status(401).json({ error: 'Unauthorized: Missing User/Org headers' });
      }

      // Check if user belongs to the org and has the required permission via their roles
      const orgUser = await prisma.organizationUser.findUnique({
        where: {
          userId_organizationId: {
            userId,
            organizationId: orgId,
          }
        },
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: {
                      permission: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      if (!orgUser) {
        return res.status(403).json({ error: 'Forbidden: User not part of organization' });
      }

      let hasPermission = false;
      for (const ur of orgUser.roles) {
        for (const rp of ur.role.permissions) {
          if (rp.permission.name === requiredPermission) {
            hasPermission = true;
            break;
          }
        }
        if (hasPermission) break;
      }

      if (!hasPermission) {
        return res.status(403).json({ error: `Forbidden: Requires permission '${requiredPermission}'` });
      }

      // Attach context
      (req as any).userContext = { userId, orgId };
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error during auth' });
    }
  };
};
