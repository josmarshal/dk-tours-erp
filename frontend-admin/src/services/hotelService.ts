import { fetchApi } from './apiClient';

export const hotelService = {
  loadInventory: async (roomId: string, dates: string[], allocation: number) => {
    return fetchApi('/hotel/inventory', {
      method: 'POST',
      body: JSON.stringify({ roomId, dates, allocation })
    });
  }
};
