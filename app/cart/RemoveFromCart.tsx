'use client';
import { removeItem } from './actions';

type Props = {
  cartItemId: number;
};

export default function RemoveFromCart(props: Props) {
  return (
    <form className="h-full">
      <button
        className="h-full flex flex-row gap-2 items-center uppercase border-1 border-light-blue/70 text-light-blue text-xs sm:text-sm font-bold p-2"
        formAction={() => removeItem(props.cartItemId)}
        data-test-id="cart-product-remove-<product id>"
      >
        <span>x</span> <span className="uppercase">Remove</span>
      </button>
    </form>
  );
}
