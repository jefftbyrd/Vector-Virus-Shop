'use client';
import { useState } from 'react';
import { updateCartQuantity } from './actions';

interface UpdateProps {
  cartItemQuantity: number;
  cartItemId: number;
  removeItem: (cartItemId: number) => void;
}

export default function Update(props: UpdateProps) {
  const [quantity, setQuantity] = useState(props.cartItemQuantity);

  return (
    <form className="w-25 sm:w-50">
      <div className="quantityController">
        <button
          className="quantityButton"
          formAction={
            quantity <= 1
              ? () => props.removeItem(props.cartItemId)
              : async () => {
                  setQuantity(quantity - 1);
                  await updateCartQuantity(props.cartItemId, quantity - 1);
                }
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
            const newValue = Number(event.currentTarget.value);
            if (newValue <= 0) {
              props.removeItem(props.cartItemId);
            } else {
              setQuantity(newValue);
            }
          }}
        />

        <button
          className="quantityButton"
          formAction={async () => {
            setQuantity(quantity + 1);
            await updateCartQuantity(props.cartItemId, quantity + 1);
          }}
        >
          +
        </button>
      </div>
    </form>
  );
}
