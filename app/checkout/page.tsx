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
    <div className="border-2 border-light-green/30 py-5 rounded-lg">
      <div className="flex flex-row items-end">
        <h2 className="font-grotesk text-3xl sm:text-5xl uppercase font-bold pl-5">
          Cart
        </h2>
        <div className="pl-2 sm:pl-5">({props.totalCartItems} items)</div>
      </div>
      <div className="flex flex-col gap-5 p-5 my-5 border-y-2 border-light-green/30">
        {props.virusesInCartList}
      </div>
      <div className="tracking-wider flex flex-col uppercase text-2xl sm:text-3xl pl-5">
        <div className="text-light-green font-bold">Total</div>
        <div className="">€ {props.cartTotal.toFixed(2)}</div>
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
        className="grid grid-cols-4 items-center gap-5 "
        data-test-id="product-<product id>"
      >
        <Link href={`/viruses/${cartItem.id}`} className="w-full">
          <img
            alt={cartItem.virusName}
            src={`/viruses/${cartItem.image}`}
            data-test-id="product-image"
            className="w-full aspect-square"
          />
        </Link>
        <div className="text-left col-span-2 ">
          <Link className="" href={`/viruses/${cartItem.id}`}>
            <h2 className="font-grotesk text-lg">{cartItem.virusName}</h2>
            <div className="text-light-green">x {cartItem.quantity}</div>
          </Link>
        </div>
        <div className="font-ddin font-bold text-sm border-l-0 border-light-green/30 self-center text-right ">
          €{(Number(cartItem.price) * Number(cartItem.quantity)).toFixed(2)}
        </div>
      </div>
    );
  });

  return (
    <div className="pageSpace">
      <h1 className="pageTitle">Checkout</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
        <div className="sm:col-span-3 order-2 sm:order-1">
          <CheckoutForm />
        </div>

        <div className="order-1 sm:order-2">
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
