import { Request, Response } from 'express';
import prisma from '../db';
import { Prisma } from '@prisma/client';
import { parseDate } from '../utils/date';

export const createQuotation = async (req: Request, res: Response) => {
  try {
    const { quotationNo, customerId, b2bAgentId, validUntil, currency, items } = req.body;
    
    // items: array of { productType, productId, amount }

    const quotation = await prisma.quotation.create({
      data: {
        quotationNo,
        customerId,
        b2bAgentId,
        validUntil: parseDate(validUntil),
        currency: currency || 'KWD',
        items: {
          create: items.map((item: any) => ({
            productType: item.productType,
            productId: item.productId,
            amount: new Prisma.Decimal(item.amount)
          }))
        }
      },
      include: {
        items: true
      }
    });

    res.status(201).json(quotation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const convertQuotationToTravelFile = async (req: Request, res: Response) => {
  try {
    const { quotationId, travelFileNo } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const quotation = await tx.quotation.findUnique({
        where: { id: quotationId },
        include: { items: true }
      });

      if (!quotation) throw new Error('Quotation not found');
      if (quotation.status !== 'Draft') throw new Error('Quotation already converted or expired');

      // Create Travel File
      const travelFile = await tx.travelFile.create({
        data: {
          fileNo: travelFileNo,
          status: 'Confirmed'
        }
      });

      // Create Bookings from Quotation Items
      const bookings = [];
      for (let i = 0; i < quotation.items.length; i++) {
        const item = quotation.items[i]!;
        
        const booking = await tx.booking.create({
          data: {
            bookingRef: `${travelFileNo}-B${i + 1}`,
            customerId: quotation.customerId || '', // Assuming customerId is mandatory at conversion
            travelFileId: travelFile.id,
            productType: item.productType,
            status: 'Confirmed',
            totalAmount: item.amount,
            currency: quotation.currency
          }
        });
        bookings.push(booking);
      }

      // Mark Quotation as Converted
      await tx.quotation.update({
        where: { id: quotationId },
        data: { status: 'Converted' }
      });

      return { travelFile, bookings };
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
