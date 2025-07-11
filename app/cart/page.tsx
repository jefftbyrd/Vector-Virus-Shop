// import './cart.module.scss';
import Link from 'next/link';
// import { notFound } from 'next/navigation';
import React from 'react';
import type { Virus } from '../../database/viruses';
import { getVirusesInsecure } from '../../database/viruses';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import { CartTotal } from './actions';
import RemoveFromCart from './RemoveFromCart';
import UpdateCart from './UpdateCart';

export const metadata = {
  title: 'Cart',
  description: 'This is the cart page!',
};

interface CartItem {
  id: number;
  price: number;
  quantity: number;
  virusName: string;
  image: string;
}

interface CartItemsListProps {
  show: boolean;
  virusesInCartList: React.ReactElement[];
}

interface TotalAndCheckoutProps {
  show: boolean;
  virusesInCart: CartItem[];
}

interface CartEmptyProps {
  show: boolean;
}

function CartItemsList(props: CartItemsListProps) {
  if (!props.show) {
    return null;
  }
  return props.virusesInCartList;
}

function TotalAndCheckout(props: TotalAndCheckoutProps) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="orderSummary oneGrid">
      <h2>
        Order
        <br />
        Summary
      </h2>
      <div className="total">
        <h3>Total:</h3>
        <h3 data-test-id="cart-total" className="amount">
          €<CartTotal virusesInCart={props.virusesInCart} />
        </h3>
      </div>
      <form action="/checkout">
        <button className="buttonBlue">Checkout</button>
      </form>
    </div>
  );
}

function CartEmpty(props: CartEmptyProps) {
  if (!props.show) {
    return null;
  }
  return <h2 className="empty">Your cart is empty</h2>;
}

export default async function CartPage() {
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

  const virusesInCartList = virusesInCart.map((cartItem: CartItem) => {
    return (
      <div
        key={`cartItemId-${cartItem.id}`}
        className="cartItem"
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
          </Link>
          <div className="cartItemQuantity">
            <h3>Quantity</h3>
            <UpdateCart
              cartItemId={Number(cartItem.id)}
              cartItemQuantity={Number(cartItem.quantity)}
            />
            <RemoveFromCart cartItemId={Number(cartItem.id)} />
          </div>
          <div className="subtotal">
            <h3>Virus Total</h3>€{' '}
            {(Number(cartItem.price) * Number(cartItem.quantity)).toFixed(2)}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="subGrid">
      <div className="inside">
        <div className="cartPage threeOneGrid">
          <div className="virusCart three">
            <h1 className="pageTitle">My Virus Cart</h1>
            <div className="cart">
              <CartItemsList
                show={virusesInCart.length > 0}
                virusesInCartList={virusesInCartList}
              />
              <CartEmpty show={virusesInCart.length === 0} />
            </div>
          </div>
          <TotalAndCheckout
            show={virusesInCart.length > 0}
            virusesInCart={virusesInCart}
          />
        </div>
      </div>
    </div>
  );
}
