export interface Store {
  storeID: string;
  storeName: string;
  isActive: number;
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
}

export interface Deal {
  internalName: string;
  title: string;
  metacriticLink: string | null;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string; // "1" or "0"
  savings: string; // Percentage
  metacriticScore: string; // "0" to "100"
  steamRatingText: string | null;
  steamRatingPercent: string;
  steamAppID: string | null;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb: string;
}

export interface FilterState {
  lowerPrice: number;
  upperPrice: number;
  metacritic: number;
  steamRating: number;
  onSaleOnly: boolean;
  sortBy: 'Deal Rating' | 'Title' | 'Savings' | 'Price' | 'Metacritic' | 'Release';
  desc: boolean; // 0 or 1 in API, but using boolean for internal state
  storeID?: string;
}
