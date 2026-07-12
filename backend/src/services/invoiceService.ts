import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoicePDF = (booking: any): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];
      
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Header
      const logoPath = path.join(__dirname, '../assets/logo.jpg');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 50, 45, { width: 100 });
      }

      doc
        .fillColor('#444444')
        .fontSize(20)
        .text('INVOICE', 50, 160)
        .fontSize(10)
        .text(`Invoice Number: INV-${booking.id}`, 50, 190)
        .text(`Date: ${new Date().toLocaleDateString()}`, 50, 205)
        .text(`Status: ${booking.status}`, 50, 220);

      // Billing Details
      doc
        .text('Bill To:', 300, 160)
        .font('Helvetica-Bold')
        .text(booking.customerName || 'Customer', 300, 175)
        .font('Helvetica')
        .text(booking.customerEmail || '', 300, 190)
        .text(booking.customerPhone || '', 300, 205);

      // Line Items
      doc.moveDown(5);
      
      doc.font('Helvetica-Bold');
      doc.text('Description', 50, doc.y);
      doc.text('Amount', 450, doc.y, { width: 90, align: 'right' });
      doc.moveTo(50, doc.y + 5).lineTo(550, doc.y + 5).stroke();
      
      doc.moveDown(1);
      doc.font('Helvetica');
      doc.text(`Booking: ${booking.type === 'HOTEL' ? 'Hotel Stay' : 'Tour Package'}`, 50, doc.y);
      doc.text(`$${booking.totalPrice?.toFixed(2) || '0.00'}`, 450, doc.y, { width: 90, align: 'right' });

      doc.moveDown(3);
      doc.moveTo(400, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1);
      doc.font('Helvetica-Bold');
      doc.text('Total:', 400, doc.y);
      doc.text(`$${booking.totalPrice?.toFixed(2) || '0.00'}`, 450, doc.y, { width: 90, align: 'right' });

      // Footer
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(
          'Thank you for your business. Payment is due upon receipt.',
          50,
          700,
          { align: 'center', width: 500 }
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
