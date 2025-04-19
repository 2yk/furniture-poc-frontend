import { gql, useLazyQuery } from "@apollo/client";
import { ConnectWithShopify } from "../../components";

const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
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
  const [fetchProducts, { loading, data }] = useLazyQuery<response>(GET_PRODUCTS)

  return (
    <div>
      <ConnectWithShopify />
      <h1>Products</h1>
      <button onClick={() => fetchProducts()}>Fetch Products</button>

      {loading && <p>Loading...</p>}
      {(data?.getProducts || []).map((p) => (
        <div key={p.id}>
          <h2>{p.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
