import { Request, Response } from 'express';
import prisma from '../db';
import { Prisma } from '@prisma/client';

export const requestRefund = async (req: Request, res: Response) => {
  try {
    const { workflowId, requesterId, referenceId } = req.body;
    
    // In a real system, you would fetch the amount from the referenceId (e.g., Booking)
    // For MVP, we'll assume the workflow configuration determines the limits

    const request = await prisma.approvalRequest.create({
      data: {
        workflowId,
        requesterId,
        referenceId,
        status: 'Pending'
      }
    });

    res.status(201).json({ message: 'Refund request submitted', request });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const approveRefund = async (req: Request, res: Response) => {
  try {
    const { requestId, approverId, approverRole } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const request = await tx.approvalRequest.findUnique({
        where: { id: requestId },
        include: { workflow: true }
      });

      if (!request) throw new Error('Request not found');
      if (request.status !== 'Pending') throw new Error('Request already processed');

      // Check if approver has the required role for this workflow
      if (approverRole !== request.workflow.requiredRole) {
        throw new Error('Approver does not have the required authority limit');
      }

      // Approve it
      const updatedRequest = await tx.approvalRequest.update({
        where: { id: requestId },
        data: {
          status: 'Approved',
          approverId
        }
      });

      // Here you would typically also generate the negative JournalEntry (Credit Note)
      // to actually execute the refund financially.

      return updatedRequest;
    });

    res.status(200).json({ message: 'Refund approved', result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
