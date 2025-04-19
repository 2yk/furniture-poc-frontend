import { gql, useLazyQuery } from "@apollo/client";
import { ConnectWithShopify } from "../../components";
import { useQueryParams } from "../../hooks";
import { GetProductsResponse } from "../../types";
import { ProductList } from "./product-list.component";

const GET_PRODUCTS = gql`
  query GetProducts($shop: String!, $accessToken: String!) {
    getProducts(shop: $shop, accessToken: $accessToken) {
      id
      title
    }
  }
`;


const ProductsPage = () => {
  const { params } = useQueryParams();

  const [fetchProducts, { loading, data }] = useLazyQuery<GetProductsResponse>(GET_PRODUCTS)

  const { shop, accessToken } = params;

  return (
    <div>
      <h1>Products</h1>

      {shop && accessToken ? (
        <>
          <button onClick={() => fetchProducts({ variables: { shop, accessToken } })}>Fetch Products</button>

          {loading && <p>Loading...</p>}

          <ProductList products={data?.getProducts || []} />
        </>
      ) : (
        <ConnectWithShopify />
      )}
    </div>
  );
};

export default ProductsPage;
