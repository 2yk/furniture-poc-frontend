import { useCallback, useState } from "react";

export const ConnectWithShopify = () => {
  const [shop, setShop] = useState('yk-test-store-9.myshopify.com');

  const onSubmit = useCallback(() => {
    if (!shop) return;

    window.location.href = `http://localhost:4000/auth/shopify?shop=${shop}`;
  }, [shop]);

  return (
    <div>
      <input value={shop} onChange={(e) => setShop(e.target.value)} />
      <button type="button" onClick={onSubmit}>Connect with Shopify</button>
    </div>
  );
};
