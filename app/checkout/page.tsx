/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Link from 'next/link';
// import { notFound } from 'next/navigation';
import React from 'react';
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

function CheckoutCart(props: any) {
  // function CheckoutCart(props: Props) {
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
  const cartCookie: any = await getCookie('cart');
  const cartItems: any = parseJson(cartCookie) || [];
  // const cartItems: [] = parseJson(cartCookie) || [];
  const viruses: any = await getVirusesInsecure();

  // Create new array merging cart and viruses data
  const virusesInCart: any = viruses
    .filter(
      (virus: any) => cartItems.map((item: any) => item.id).includes(virus.id),
      // cartItems.map((item: { id: number }) => item.id).includes(virus.id),
    )
    // REMOVED LINE BELOW. I DON'T THINK IT'S NECESSARY. CAUSED LOTS OF TS ERRORS.
    // .map(({ virusDesc, tagline, ...item }) => item)
    .reduce((acc: any, virus: any) => {
      // .reduce((acc, virus: { id: number }) => {
      const cartItem: any = cartItems.find(
        (item: any) => item.id === virus.id,
        // (item: { id: number }) => item.id === virus.id,
      );
      acc.push(cartItem ? { ...virus, ...cartItem } : virus);
      // acc.push(cartItem ? { ...virus, ...cartItem } : virus);
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

  const virusesInCartList = virusesInCart.map(
    (cartItem: {
      id: 'number';
      quantity: 'number';
      virusName: 'string';
      price: 'number';
      image: 'string';
    }) => {
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
    },
  );

  return (
    <div className="subGrid">
      <div className="inside">
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
    </div>
  );
}
