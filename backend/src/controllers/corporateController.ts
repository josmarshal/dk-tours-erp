import { Request, Response } from 'express';
import prisma from '../db';

export const createCorporateAccount = async (req: Request, res: Response) => {
  try {
    const { customerId, companyName, taxNumber, creditLimit, paymentTerms } = req.body;
    
    // Ensure customer exists
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const corporateProfile = await prisma.corporateProfile.create({
      data: { customerId, companyName, taxNumber, creditLimit, paymentTerms }
    });

    res.status(201).json(corporateProfile);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCorporateLedger = async (req: Request, res: Response) => {
  try {
    const { corporateId } = req.params;

    // In a real scenario, this would query the General Ledger linked to this corporate account
    // For MVP, we return the profile
    const corporateProfile = await prisma.corporateProfile.findUnique({ 
      where: { id: corporateId as string } 
    });

    if (!corporateProfile) {
      return res.status(404).json({ error: 'Corporate account not found' });
    }

    res.status(200).json({
      corporateProfile,
      ledger: [] // Placeholder for aggregated journal entries
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
