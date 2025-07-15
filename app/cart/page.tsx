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

// import VirusesInCartList from './VirusesInCartList';

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
    <div className="orderSummary">
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
        <Link href={`/viruses/${cartItem.id}`} className="col-span-1">
          <img
            alt={cartItem.virusName}
            src={`/viruses/${cartItem.image}`}
            data-test-id="product-image"
          />
        </Link>

        <Link
          className="col-span-2 sm:col-span-1"
          href={`/viruses/${cartItem.id}`}
        >
          <h2 className="">{cartItem.virusName}</h2>
        </Link>

        <div className="grid grid-cols-3 col-span-full sm:grid-cols-1 sm:col-span-1 gap-2 sm:gap-0 h-auto mt-0 sm:mt-0 items-center justify-end">
          <h3 className="hidden sm:static">Quantity</h3>
          <UpdateCart
            cartItemId={Number(cartItem.id)}
            cartItemQuantity={Number(cartItem.quantity)}
          />
          <RemoveFromCart cartItemId={Number(cartItem.id)} />
        </div>

        <div className="flex col-span-full sm:grid-cols-1 sm:col-span-1 border-1 border-light-green/30 p-1 justify-center">
          <h3 className="">Subtotal</h3>
          <span className="text-white text-lg md:ml-2 ml-3">
            € {(Number(cartItem.price) * Number(cartItem.quantity)).toFixed(2)}
          </span>
        </div>
      </div>
    );
  });

  return (
    <div className="pageSpace">
      <h1 className="pageTitle">My Virus Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="cart w-auto">
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
  );
}
