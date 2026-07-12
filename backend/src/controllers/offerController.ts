import { Request, Response } from 'express';
import prisma from '../db';
import { SpecialOffersEngine, OfferConfig } from '../services/offerEngine';

export const createOffer = async (req: Request, res: Response) => {
  try {
    const { offerCode, name, type, combinable, rules } = req.body;
    
    const specialOffer = await prisma.specialOffer.create({
      data: { offerCode, name, type, combinable, rules }
    });

    res.status(201).json(specialOffer);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const evaluateOffers = async (req: Request, res: Response) => {
  try {
    const { basePrice, stayDays } = req.body;

    const offers = await prisma.specialOffer.findMany();
    
    // Map to engine config
    const offerConfigs: OfferConfig[] = offers.map(o => ({
      id: o.id,
      offerCode: o.offerCode,
      type: o.type,
      combinable: o.combinable,
      rules: o.rules
    }));

    const engine = new SpecialOffersEngine();
    const result = engine.evaluateBestOffers(offerConfigs, parseFloat(basePrice), parseInt(stayDays, 10));

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
