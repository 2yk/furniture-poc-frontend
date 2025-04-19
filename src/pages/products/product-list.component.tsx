import { useCallback, useState } from "react";
import { Product } from "../../types";
import { gql, useMutation } from "@apollo/client";

type Props = {
  shop: string;
  accessToken: string;
  products: Product[];
};

const UPDATE_PRODUCT = gql`
  mutation updateProduct($shop: String!, $accessToken: String!, $input: UpdateProdcutInputDto!) {
    updateProduct(shop: $shop, accessToken: $accessToken, input: $input) {
      id
      title
    }
  }
`;

export const ProductList = ({ shop, accessToken, products }: Props) => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [selectedProductId, setSelectedProductId] = useState('');
  const [value, setValue] = useState('');

  const onEditEvent = useCallback((product: Product) => {
    setSelectedProductId(product.id);
    setValue(product.title);
  }, []);

  const onSaveEvent = useCallback(async () => {
    try {
      const { data } = await updateProduct({
        variables: {
          shop, accessToken,
          input: {
            id: selectedProductId,
            title: value,
          },
        },
      });

      if (!data) {
        throw new Error("No data returned from updateProduct mutation");
      }

      setValue('');
      setSelectedProductId('');
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }, [updateProduct, setSelectedProductId, setValue, selectedProductId, value, shop, accessToken]);

  return products.map((p) => (
    <div key={p.id}>
      {selectedProductId === p.id ? (
        <>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={onSaveEvent}>Save</button>
          <button onClick={() => setSelectedProductId('')}>Cancel</button>
        </>
      ) : (
        <>
          <h3>
            {p.title}
            <button onClick={() => onEditEvent(p)}>Edit</button>
          </h3>
        </>
      )}
    </div>
  ))
};
