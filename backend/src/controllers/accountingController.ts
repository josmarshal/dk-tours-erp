import { Request, Response } from 'express';
import prisma from '../db';
import { Prisma } from '@prisma/client';
import { parseDate } from '../utils/date';

export const postJournalEntry = async (req: Request, res: Response) => {
  try {
    const { journalNo, date, reference, description, sourceModule, lines } = req.body;
    
    // lines should be an array of { accountId, debit, credit, currency, exchangeRate }

    if (!lines || lines.length < 2) {
      return res.status(400).json({ error: 'A journal entry must have at least two lines' });
    }

    // Strict Double-Entry Validation
    let totalBaseDebit = new Prisma.Decimal(0);
    let totalBaseCredit = new Prisma.Decimal(0);

    const processedLines = lines.map((line: any) => {
      const debit = new Prisma.Decimal(line.debit || 0);
      const credit = new Prisma.Decimal(line.credit || 0);
      const exRate = new Prisma.Decimal(line.exchangeRate || 1);
      
      const baseDebit = debit.mul(exRate);
      const baseCredit = credit.mul(exRate);

      totalBaseDebit = totalBaseDebit.add(baseDebit);
      totalBaseCredit = totalBaseCredit.add(baseCredit);

      return {
        accountId: line.accountId,
        debit,
        credit,
        currency: line.currency || 'KWD',
        exchangeRate: exRate,
        baseDebit,
        baseCredit
      };
    });

    // We check if debits == credits in base currency.
    // decimal.js handles the precision correctly.
    if (!totalBaseDebit.equals(totalBaseCredit)) {
      return res.status(400).json({ 
        error: 'Unbalanced Journal Entry. Total debits must equal total credits.',
        totalBaseDebit: totalBaseDebit.toString(),
        totalBaseCredit: totalBaseCredit.toString()
      });
    }

    // Save to DB in a transaction
    const journalEntry = await prisma.journalEntry.create({
      data: {
        journalNo,
        date: parseDate(date),
        reference,
        description,
        sourceModule,
        lines: {
          create: processedLines
        }
      },
      include: {
        lines: true
      }
    });

    res.status(201).json(journalEntry);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
