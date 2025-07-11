import Link from 'next/link';
// import { notFound } from 'next/navigation';
import React from 'react';
import type { Virus } from '../../database/viruses';
import { getVirusesInsecure } from '../../database/viruses';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
// import deleteCookie from './actions';
// import RemoveFromCart from './cartActions';
import CheckoutForm from './CheckoutForm';

// import ConfirmOrder from './ConfirmOrder';

export const metadata = {
  title: 'Checkout',
  description: 'Virus checkout page',
};

interface CartItem {
  id: number;
  price: number;
  quantity: number;
  virusName: string;
  image: string;
}

interface CheckoutCartProps {
  show: boolean;
  cartTotal: number;
  totalCartItems: number;
  virusesInCartList: React.ReactElement[];
}

function CheckoutCart(props: CheckoutCartProps) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="checkoutCart">
      <div className="number">{props.totalCartItems} items</div>
      <div className="checkoutCartList">{props.virusesInCartList}</div>
      <div className="total">
        <p>Total</p>
        <p>€ {props.cartTotal.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default async function CheckoutPage() {
  const cartCookie = await getCookie('cart');
  const cartItems: CartItem[] = parseJson(cartCookie) || [];
  const viruses = await getVirusesInsecure();

  // Create new array merging cart and viruses data
  const cartItemIds: number[] = cartItems.map((item: CartItem) => item.id);
  const virusesInCart: CartItem[] = viruses
    .filter((virus: Virus) => cartItemIds.includes(virus.id))
    .map(({ virusDesc, tagline, ...item }) => item)
    .reduce((acc: CartItem[], virus: Omit<Virus, 'virusDesc' | 'tagline'>) => {
      const cartItem: CartItem | undefined = cartItems.find(
        (item: CartItem) => item.id === virus.id,
      );
      if (cartItem) {
        acc.push({ ...virus, ...cartItem });
      }
      return acc;
    }, []);

  // Calculate total price
  const cartTotal = virusesInCart.reduce(
    (acc: number, virus: { price: number; quantity: number }) => {
      return (acc += Number(virus.price) * virus.quantity);
    },
    0,
  );

  const totalCartItems: number = virusesInCart.reduce(
    (acc: number, item: { quantity: number }) => {
      return (acc += item.quantity);
    },
    0,
  );

  const virusesInCartList = virusesInCart.map((cartItem) => {
    return (
      <div
        key={`cartItemId-${cartItem.id}`}
        className="checkoutCartItem"
        data-test-id="product-<product id>"
      >
        <Link href={`/viruses/${cartItem.id}`}>
          <img
            alt={cartItem.virusName}
            src={`/viruses/${cartItem.image}`}
            data-test-id="product-image"
          />
        </Link>
        <div className="info">
          <Link className="virusName" href={`/viruses/${cartItem.id}`}>
            <h2>{cartItem.virusName}</h2>
            <div className="cartItemQuantity">x {cartItem.quantity}</div>
          </Link>
        </div>
        <div className="subtotal">
          €{(Number(cartItem.price) * Number(cartItem.quantity)).toFixed(2)}
        </div>
      </div>
    );
  });

  return (
    <div className="pageSpace">
      <div className="threeOneGrid">
        <div className="threeGrid">
          <CheckoutForm />
        </div>

        <div className="oneGrid">
          <CheckoutCart
            show={virusesInCart.length > 0}
            virusesInCartList={virusesInCartList}
            totalCartItems={totalCartItems}
            cartTotal={cartTotal}
          />
        </div>
      </div>
    </div>
  );
}
