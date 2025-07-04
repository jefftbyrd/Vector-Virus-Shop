'use client';
import { removeItem } from './actions';

type Props = {
  cartItemId: number;
};

export default function RemoveFromCart(props: Props) {
  return (
    <form>
      <button
        className="remove buttonBlue"
        formAction={() => removeItem(props.cartItemId)}
        data-test-id="cart-product-remove-<product id>"
      >
        Remove
      </button>
    </form>
  );
}
