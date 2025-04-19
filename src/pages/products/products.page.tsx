import { gql, useQuery } from "@apollo/client";
import { ConnectWithShopify } from "../../components";

const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      title
      price
    }
  }
`;

const ProductsPage = () => {
  const { loading, data } = useQuery(GET_PRODUCTS)

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ConnectWithShopify />
      <h1>Products</h1>
      <p>List of products will be displayed here.</p>
      {data.getProducts.map((p) => (
        <div key={p.id}>
          <h2>{p.title}</h2>
          <p>Price: ${p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
