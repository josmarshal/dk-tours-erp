import { fetchApi } from './apiClient';

export const tourService = {
  createDeparture: async (tourId: string, date: string, startTime: string, capacity: number) => {
    return fetchApi('/tour/departures', {
      method: 'POST',
      body: JSON.stringify({ tourId, date, startTime, capacity })
    });
  }
};
