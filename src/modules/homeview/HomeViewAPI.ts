import { Http } from '@/http';

import type {
    StoreList
} from './HomeViewTypes';

export async function getproducts(): Promise<StoreList | undefined> {
    return await Http.get<StoreList>(
      '/products',
      {},
      {}
    );
  }

  export async function getFeaturedProducts(): Promise<StoreList | undefined> {
    return await Http.get<StoreList>(
      '/products/featured',
      {},
      {}
    );
  }