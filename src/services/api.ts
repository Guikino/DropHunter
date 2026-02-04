import type { Deal, FilterState, Store } from '../../types';

const BASE_URL = 'https://www.cheapshark.com/api/1.0';

export const getStores = async (): Promise<Store[]> => {
  try {
    const response = await fetch(`${BASE_URL}/stores`);
    if (!response.ok) throw new Error('Failed to fetch stores');
    const data = await response.json();
    // Filter only active stores
    return data.filter((s: Store) => s.isActive === 1);
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
};

export const getDeals = async (filters: FilterState, titleSearch?: string, pageNumber: number = 0): Promise<Deal[]> => {
  try {
    const params = new URLSearchParams();
    
    // API pagination
    params.append('pageNumber', pageNumber.toString());
    params.append('pageSize', '20');

    // Filtering
    if (titleSearch) {
      params.append('title', titleSearch);
    }
    
    // We only send params if they deviate from defaults to keep URL clean, 
    // but CheapShark handles defaults well.
    params.append('lowerPrice', filters.lowerPrice.toString());
    params.append('upperPrice', filters.upperPrice.toString());
    
    if (filters.metacritic > 0) {
      params.append('metacritic', filters.metacritic.toString());
    }
    
    if (filters.steamRating > 0) {
      params.append('steamRating', filters.steamRating.toString());
    }

    if (filters.onSaleOnly) {
      params.append('onSale', '1');
    }

    if (filters.storeID) {
      params.append('storeID', filters.storeID);
    }

    // Sorting
    params.append('sortBy', filters.sortBy);
    params.append('desc', filters.desc ? '1' : '0');

    const response = await fetch(`${BASE_URL}/deals?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch deals');
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching deals:", error);
    return [];
  }
};
