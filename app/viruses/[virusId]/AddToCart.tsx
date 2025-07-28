'use client';
import { useState } from 'react';
import createOrUpdateCookie from './actions';

type Props = {
  virusId: number;
};

export default function AddToCart(props: Props) {
  const [quantity, setQuantity] = useState(1);
  return (
    <form className="">
      <div className="quantityController">
        <button
          className="quantityButton"
          formAction={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>

        <input
          className="quantityNumber"
          data-test-id="product-quantity"
          value={Number(quantity)}
          type="number"
          min="1"
          onChange={(event) => {
            const newValue = Number(event.currentTarget.value);
            setQuantity(Math.max(1, newValue || 1));
          }}
        />

        <button
          className="quantityButton"
          formAction={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>

      <button
        formAction={async () => {
          setQuantity(1);
          await createOrUpdateCookie(props.virusId, Number(quantity));
        }}
        data-test-id="product-add-to-cart"
        className="addToCartButton"
      >
        Add to cart
      </button>
    </form>
  );
}
