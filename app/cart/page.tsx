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
    <div className="orderSummary flex flex-col  border-light-green/30 sm:border-l-1 sm:p-8 h-auto gap-3">
      <h2 className="uppercase text-white text-4xl tracking-wider font-bold">
        Order
        <br />
        Summary
      </h2>
      <div className="flex text-3xl font-ddin">
        <h3 className="uppercase text-light-green font-bold">Total</h3>
        <h3 data-test-id="cart-total" className="ml-3">
          € <CartTotal virusesInCart={props.virusesInCart} />
        </h3>
      </div>
      <form action="/checkout">
        <button className="text-3xl uppercase text-dark-green tracking-wider bg-light-blue p-3 rounded-lg w-full">
          Checkout
        </button>
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
        className="cartItem "
        data-test-id="product-<product id>"
      >
        <div className="">
          <Link href={`/viruses/${cartItem.id}`} className="col-span-1">
            <img
              alt={cartItem.virusName}
              src={`/viruses/${cartItem.image}`}
              data-test-id="product-image"
            />
          </Link>
        </div>

        <div className="flex flex-col col-span-2 gap-3 ml-3">
          <div>
            <Link
              className="col-span-2 sm:col-span-1"
              href={`/viruses/${cartItem.id}`}
            >
              <h2 className="">{cartItem.virusName}</h2>
            </Link>
          </div>
          <div className="flex flex-row gap-2 sm:gap-5 sm:mt-0 items-center justify-start h-full">
            {/* <h3 className="hidden sm:block">Quantity</h3> */}
            <UpdateCart
              cartItemId={Number(cartItem.id)}
              cartItemQuantity={Number(cartItem.quantity)}
            />
            <RemoveFromCart cartItemId={Number(cartItem.id)} />
          </div>
          <div className="flex sm:grid-cols-1 sm:col-span-1 justify-start">
            <h3 className="">Subtotal</h3>
            <span className="text-white text-lg sm:text-2xl sm:ml-2 ml-3">
              €{' '}
              {(Number(cartItem.price) * Number(cartItem.quantity)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="pageSpace">
      <h1 className="pageTitle">My Virus Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="cart w-auto mb-5">
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
