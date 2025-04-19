import { gql, useLazyQuery } from "@apollo/client";
import { ConnectWithShopify } from "../../components";
import { useQueryParams } from "../../hooks";

const GET_PRODUCTS = gql`
  query GetProducts($shop: String!, $accessToken: String!) {
    getProducts(shop: $shop, accessToken: $accessToken) {
      id
      title
    }
  }
`;

type response = {
  getProducts: {
    id: string;
    title: string;
  }[];
}

const ProductsPage = () => {
  const { params } = useQueryParams();

  const [fetchProducts, { loading, data }] = useLazyQuery<response>(GET_PRODUCTS)

  const { shop, accessToken } = params;

  return (
    <div>
      <h1>Products</h1>

      {shop && accessToken ? (
        <>
          <button onClick={() => fetchProducts({ variables: { shop, accessToken } })}>Fetch Products</button>
          {loading && <p>Loading...</p>}
          {(data?.getProducts || []).map((p) => (
            <div key={p.id}>
              <h2>{p.title}</h2>
            </div>
          ))}
        </>
      ) : (
        <ConnectWithShopify />
      )}
    </div>
  );
};

export default ProductsPage;
