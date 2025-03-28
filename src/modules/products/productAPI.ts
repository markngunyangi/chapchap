import { Http } from '@/http';
import type { Product } from './productsTypes';

export async function getProductforSpecificStore(storeId: number): Promise<Product | undefined> {
    return await Http.get<Product>(
      `/products?store=${storeId}`,
      {},
      {}
    );
}
