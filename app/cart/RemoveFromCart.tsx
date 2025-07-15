'use client';
import { removeItem } from './actions';

type Props = {
  cartItemId: number;
};

export default function RemoveFromCart(props: Props) {
  return (
    <form className="h-full">
      <button
        className="h-full uppercase bg-light-blue text-dark-green text-sm font-bold w-auto px-5 border-0"
        formAction={() => removeItem(props.cartItemId)}
        data-test-id="cart-product-remove-<product id>"
      >
        Remove
      </button>
    </form>
  );
}
