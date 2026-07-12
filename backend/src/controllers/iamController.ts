import { Request, Response } from 'express';
import prisma from '../db';

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { name, typeId } = req.body;
    const org = await prisma.organization.create({
      data: { name, typeId }
    });
    res.status(201).json(org);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, passwordHash, firstName, lastName, organizationId } = req.body;
    
    // Create user and link to organization
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        organizations: {
          create: {
            organizationId
          }
        }
      }
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const assignRole = async (req: Request, res: Response) => {
  try {
    const { userId, organizationId, roleId } = req.body;
    
    // Find OrgUser
    const orgUser = await prisma.organizationUser.findUnique({
      where: {
        userId_organizationId: { userId, organizationId }
      }
    });

    if (!orgUser) return res.status(404).json({ error: 'User not in org' });

    const userRole = await prisma.userRole.create({
      data: {
        orgUserId: orgUser.id,
        roleId
      }
    });

    res.status(201).json(userRole);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
