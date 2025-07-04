'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

interface CartItem {
  id: number;
  price: number;
  quantity: number;
}

interface CartTotalProps {
  virusesInCart: CartItem[];
}

export async function removeItem(cartItemId: number) {
  // 1. get the cookie
  const cartCookie = await getCookie('cart');

  // 2. parse the cookie
  const cart: CartItem[] =
    cartCookie === undefined ? [] : parseJson(cartCookie);

  // 3. edit the cookie value
  const itemToRemove: CartItem | undefined = cart.find((item: CartItem) => {
    return item.id === cartItemId;
  });

  // Handle case where item is not found
  if (!itemToRemove) {
    return;
  }

  const modifiedCart = cart.filter(
    (item: CartItem) => item.id !== itemToRemove.id,
  );

  (await cookies()).set('cart', JSON.stringify(modifiedCart));
}

export async function updateCartQuantity(
  cartItemId: number,
  cartItemQuantity: number,
): Promise<void> {
  // 1. get the cookie
  const cartCookie = await getCookie('cart');

  // 2. parse the cookie
  const cart: CartItem[] =
    cartCookie === undefined ? [] : parseJson(cartCookie);

  // 3. edit the cookie value
  const cartItemToUpdate: CartItem | undefined = cart.find((item: CartItem) => {
    return item.id === cartItemId;
  });

  // Handle case where item is not found
  if (!cartItemToUpdate) {
    return;
  }

  cartItemToUpdate.quantity = cartItemQuantity;

  (await cookies()).set('cart', JSON.stringify(cart));
}

// export async function CartTotal(props: Props) {
//   const cartTotalAmount: number = await props.virusesInCart.reduce(
//     (acc: number, virus: { price: number; quantity: number }) => {
//       return (acc += Number(virus.price) * virus.quantity);
//     },
//     0,
//   );
//   return cartTotalAmount;
// }

export async function CartTotal(props: CartTotalProps): Promise<number> {
  // export async function CartTotal(props: Props) {
  return await props.virusesInCart.reduce((acc: number, virus: CartItem) => {
    return (acc += Number(virus.price) * virus.quantity);
  }, 0);
}
