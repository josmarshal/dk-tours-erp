import { Request, Response } from 'express';
import prisma from '../db';
import { Prisma } from '@prisma/client';
import { parseDate } from '../utils/date';

export const getSalesReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, currency } = req.query;

    // We would use aggregation here. For MVP we will just fetch and sum bookings.
    const whereClause: any = {
      status: 'Confirmed'
    };

    if (startDate && endDate) {
      whereClause.createdAt = {
        gte: parseDate(startDate as string),
        lte: parseDate(endDate as string)
      };
    }

    if (currency) {
      whereClause.currency = currency;
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause
    });

    let totalSales = new Prisma.Decimal(0);
    bookings.forEach(b => {
      totalSales = totalSales.add(b.totalAmount);
    });

    res.status(200).json({
      totalBookings: bookings.length,
      totalSales,
      currency: currency || 'Mixed (Needs Normalization in Production)',
      bookings
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfitabilityReport = async (req: Request, res: Response) => {
  try {
    // In a real system, you calculate (Sales from Bookings) - (Costs from Vendor Invoices)
    // For MVP, we return a structural placeholder showing how this logic connects to the Ledger.
    
    // We would query the General Ledger for Accounts starting with '4' (Revenue) and '5' (COGS)
    const revenueEntries = await prisma.journalLine.findMany({
      where: {
        account: {
          code: { startsWith: '4' }
        }
      }
    });

    const costEntries = await prisma.journalLine.findMany({
      where: {
        account: {
          code: { startsWith: '5' }
        }
      }
    });

    res.status(200).json({
      message: 'Profitability Report Generated',
      totalRevenueRecords: revenueEntries.length,
      totalCostRecords: costEntries.length
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
