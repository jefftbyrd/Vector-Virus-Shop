import Link from 'next/link';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

export default async function Header() {
  const cartCookie = await getCookie('cart');
  const cartItems: [] = parseJson(cartCookie) || [];

  const totalCartItems: number = cartItems.reduce(
    (acc: number, item: { quantity: number }) => {
      return (acc += item.quantity);
    },
    0,
  );

  return (
    <header>
      <Link href="/">
        <h2 className="lowercase text-[#0e372e] font-grotesk text-[1.6rem] bg-[#3acda8] h-full tracking-[0.3rem] font-black px-5 leading-[3.2rem]">
          Vector
        </h2>
      </Link>
      <nav>
        <div>
          <Link href="/viruses">Viruses</Link>
        </div>
        <Link href="/about">About</Link>
        <Link href="/cart" data-test-id="cart-link">
          Cart:{' '}
          <span data-test-id="cart-count">
            {`[${totalCartItems ? totalCartItems : 'empty'}]`}
          </span>
        </Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}
