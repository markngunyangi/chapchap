export type Product = {
    id: number;
    sub_category_id: number;
    store_id: number;
    imageUrl:string
    name: string;
    gross_price: number;
    discount: number;
    net_price: number;
    quantity: number;
    description: string;
    attributes: {
      color: string;
      storage: string;
    };
    created_at: string;
    modified_at: string;
    deleted_at: string | null;
  };