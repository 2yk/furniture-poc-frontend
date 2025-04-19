export type Product = {
  id: string;
  title: string;
};

export type GetProductsResponse = {
  getProducts: Product[];
}