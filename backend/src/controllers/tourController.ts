import { Request, Response } from 'express';
import prisma from '../db';
import { parseDate } from '../utils/date';

export const createTour = async (req: Request, res: Response) => {
  try {
    const { vendorId, tourCode, name, destination, durationMins } = req.body;
    
    // Ensure vendor exists and is active
    const vendor = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

    const tour = await prisma.tour.create({
      data: { vendorId, tourCode, name, destination, durationMins }
    });

    res.status(201).json(tour);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createDeparture = async (req: Request, res: Response) => {
  try {
    const { tourId, date, startTime, capacity } = req.body;

    const departure = await prisma.tourDeparture.create({
      data: { 
        tourId, 
        date: parseDate(date), 
        startTime, 
        capacity 
      }
    });

    res.status(201).json(departure);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCapacity = async (req: Request, res: Response) => {
  try {
    const { departureId, incrementSoldBy } = req.body;

    // Use Prisma's atomic decrement/increment to prevent concurrency issues
    const departure = await prisma.$transaction(async (tx) => {
      const dep = await tx.tourDeparture.findUnique({
        where: { id: departureId }
      });

      if (!dep) {
        throw new Error('Departure not found');
      }

      if (dep.sold + incrementSoldBy > dep.capacity) {
        throw new Error('Not enough capacity available');
      }

      return await tx.tourDeparture.update({
        where: { id: departureId },
        data: {
          sold: {
            increment: incrementSoldBy
          }
        }
      });
    });

    res.status(200).json({ message: 'Capacity updated', departure });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
