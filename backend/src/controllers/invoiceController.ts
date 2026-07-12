import { Request, Response } from 'express';
import { generateInvoicePDF } from '../services/invoiceService';

// Mock booking database for demo purposes (In reality this would come from prisma)
const mockBookings: any = {
  '123': {
    id: '123',
    status: 'CONFIRMED',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1 234 567 890',
    type: 'TOUR',
    totalPrice: 120.00
  },
  '124': {
    id: '124',
    status: 'PAID',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1 987 654 321',
    type: 'HOTEL',
    totalPrice: 450.00
  }
};

export const downloadInvoice = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    
    // Fetch booking
    let booking = mockBookings[bookingId];
    if (!booking) {
      // Fallback dummy
      booking = {
        id: bookingId,
        status: 'PENDING',
        customerName: 'Guest Customer',
        type: 'PACKAGE',
        totalPrice: 999.99
      };
    }

    const pdfBuffer = await generateInvoicePDF(booking);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-${booking.id}.pdf"`);
    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};
