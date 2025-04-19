import { useCallback, useState } from "react";
import { Product } from "../../types";

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [value, setValue] = useState('');

  const onEditEvent = useCallback((product: Product) => {
    setSelectedProductId(product.id);
    setValue(product.title);
  }, []);

  return products.map((p) => (
    <div key={p.id}>
      {selectedProductId === p.id ? (
        <>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={() => setSelectedProductId('')}>Save</button>
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
