'use client';
import { useState } from 'react';
import { updateCartQuantity } from './actions';

interface UpdateProps {
  cartItemQuantity: number;
  cartItemId: number;
}

export default function Update(props: UpdateProps) {
  const [quantity, setQuantity] = useState(props.cartItemQuantity);
  return (
    <form>
      <div className="quantityController">
        <button
          className="quantityButton"
          onClick={() => setQuantity(quantity - 1)}
          formAction={() =>
            updateCartQuantity(props.cartItemId, Number(quantity))
          }
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
            setQuantity(Number(event.currentTarget.value));
          }}
        />
        <button
          className="quantityButton"
          onClick={() => setQuantity(quantity + 1)}
          formAction={() =>
            updateCartQuantity(props.cartItemId, Number(quantity))
          }
        >
          +
        </button>
      </div>
    </form>
  );
}
