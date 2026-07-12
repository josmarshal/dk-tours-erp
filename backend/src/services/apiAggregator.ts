export interface NormalizedRoom {
  roomCode: string;
  name: string;
  maxOccupancy: number;
  availableAllocation: number;
  price: number;
  currency: string;
}

export interface NormalizedHotel {
  hotelCode: string;
  name: string;
  city: string;
  country: string;
  rooms: NormalizedRoom[];
}

export interface SupplierAdapter {
  supplierId: string;
  searchHotels(city: string, checkIn: string, checkOut: string): Promise<NormalizedHotel[]>;
  bookRoom(hotelCode: string, roomCode: string, checkIn: string, checkOut: string): Promise<string>;
}

// Example Mock Implementation of an API Supplier (e.g., Hotelbeds)
export class MockHotelbedsAdapter implements SupplierAdapter {
  supplierId = 'HOTELBEDS_API';

  async searchHotels(city: string, checkIn: string, checkOut: string): Promise<NormalizedHotel[]> {
    // In reality, this would make an HTTP request to the external supplier and map the response.
    console.log(`Searching external supplier for ${city} from ${checkIn} to ${checkOut}`);
    
    // Normalization mapping logic occurs here
    return [
      {
        hotelCode: 'EXT-HB-101',
        name: 'Grand Plaza Hotel',
        city: city,
        country: 'AE',
        rooms: [
          {
            roomCode: 'DBL-STD',
            name: 'Standard Double Room',
            maxOccupancy: 2,
            availableAllocation: 5,
            price: 150.00,
            currency: 'USD'
          }
        ]
      }
    ];
  }

  async bookRoom(hotelCode: string, roomCode: string, checkIn: string, checkOut: string): Promise<string> {
    // Call external booking API
    return `EXT-BOOKING-REF-${Math.floor(Math.random() * 1000000)}`;
  }
}

// Aggregator Service to search across multiple suppliers and internal database
export class InventoryAggregator {
  private adapters: SupplierAdapter[] = [];

  registerAdapter(adapter: SupplierAdapter) {
    this.adapters.push(adapter);
  }

  async searchAll(city: string, checkIn: string, checkOut: string): Promise<NormalizedHotel[]> {
    const promises = this.adapters.map(adapter => adapter.searchHotels(city, checkIn, checkOut));
    const results = await Promise.all(promises);
    
    // Flatten the array of arrays
    return results.flat();
  }
}
