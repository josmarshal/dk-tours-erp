export interface OfferConfig {
  id: string;
  offerCode: string;
  type: string; // 'EarlyBird', 'StayPay', 'Discount'
  combinable: boolean;
  rules: any;
}

export class SpecialOffersEngine {
  
  /**
   * Evaluates an array of available offers and returns the optimal valid combination.
   * Basic logic:
   * 1. If an offer is NOT combinable, it must be used alone. We calculate its savings and pick the best one.
   * 2. If offers ARE combinable, we can stack them (as long as rules permit).
   */
  public evaluateBestOffers(availableOffers: OfferConfig[], basePrice: number, stayDays: number): { appliedOffers: OfferConfig[], finalPrice: number } {
    let bestDiscount = 0;
    let appliedOffers: OfferConfig[] = [];

    // Separate combinable vs non-combinable
    const combinable = availableOffers.filter(o => o.combinable);
    const nonCombinable = availableOffers.filter(o => !o.combinable);

    // Evaluate standalone non-combinable offers
    for (const offer of nonCombinable) {
      const discount = this.calculateDiscount(offer, basePrice, stayDays);
      if (discount > bestDiscount) {
        bestDiscount = discount;
        appliedOffers = [offer];
      }
    }

    // Evaluate stacked combinable offers
    let stackedDiscount = 0;
    const stackedOffers: OfferConfig[] = [];
    for (const offer of combinable) {
      const discount = this.calculateDiscount(offer, basePrice, stayDays);
      if (discount > 0) {
        stackedDiscount += discount;
        stackedOffers.push(offer);
      }
    }

    // Compare standalone vs stacked
    if (stackedDiscount > bestDiscount) {
      return {
        appliedOffers: stackedOffers,
        finalPrice: Math.max(0, basePrice - stackedDiscount)
      };
    }

    return {
      appliedOffers,
      finalPrice: Math.max(0, basePrice - bestDiscount)
    };
  }

  private calculateDiscount(offer: OfferConfig, basePrice: number, stayDays: number): number {
    switch (offer.type) {
      case 'StayPay':
        // e.g., rules: { stay: 4, pay: 3 } -> 1 day free per 4 days
        const { stay, pay } = offer.rules;
        if (stayDays >= stay) {
          const freeDays = Math.floor(stayDays / stay) * (stay - pay);
          const pricePerDay = basePrice / stayDays;
          return freeDays * pricePerDay;
        }
        return 0;
      case 'EarlyBird':
        // e.g., rules: { discountPercent: 10 }
        return basePrice * (offer.rules.discountPercent / 100);
      case 'Discount':
        // e.g., rules: { flatAmount: 50 }
        return offer.rules.flatAmount;
      default:
        return 0;
    }
  }
}
