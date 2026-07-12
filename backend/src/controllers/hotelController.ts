import { Request, Response } from 'express';
import prisma from '../db';
import { parseDate } from '../utils/date';

export const createHotel = async (req: Request, res: Response) => {
  try {
    const { vendorId, hotelCode, name, category, city, country } = req.body;
    
    // Ensure vendor exists
    const vendor = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

    const hotel = await prisma.hotel.create({
      data: { vendorId, hotelCode, name, category, city, country }
    });

    res.status(201).json(hotel);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createRoomType = async (req: Request, res: Response) => {
  try {
    const { hotelId, roomCode, name, maxOccupancy } = req.body;

    const roomType = await prisma.roomType.create({
      data: { hotelId, roomCode, name, maxOccupancy }
    });

    res.status(201).json(roomType);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Advanced Inventory loading logic with conflict prevention
export const loadInventory = async (req: Request, res: Response) => {
  try {
    const { roomId, dates, allocation } = req.body;
    
    // dates: array of "YYYY-MM-DD"
    // allocation: number of rooms to SET as Total Allocation

    if (!Array.isArray(dates) || dates.length === 0) {
      return res.status(400).json({ error: 'Dates array is required' });
    }

    const inventoryRecords = [];

    // Process using a transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      for (const dateStr of dates) {
        const date = parseDate(dateStr);
        
        // Upsert inventory
        const record = await tx.hotelInventory.upsert({
          where: {
            roomId_date: {
              roomId,
              date
            }
          },
          update: {
            totalAlloc: allocation,
          },
          create: {
            roomId,
            date,
            totalAlloc: allocation,
            soldAlloc: 0,
            blockedAlloc: 0,
            stopSell: false
          }
        });
        
        // Validate no negative inventory conceptually
        const available = record.totalAlloc - record.soldAlloc - record.blockedAlloc;
        if (available < 0) {
          throw new Error(`Negative inventory conflict on ${dateStr} for room ${roomId}`);
        }

        inventoryRecords.push(record);
      }
    });

    res.status(200).json({ message: 'Inventory updated successfully', count: dates.length });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
