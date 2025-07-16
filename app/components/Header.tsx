import Link from 'next/link';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import BurgerMenu from './BurgerMenu';

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
    <header className="">
      <div className="normalMenu top-0 sm:sticky top-0 z-100 hidden sm:flex items-center h-16">
        <div className="flex flex-row h-full bg-light-green items-center logoContainer text-dark-green">
          <Link href="/">
            <h2 className="lowercase font-grotesk text-[1.7rem] leading-none tracking-[0.3rem] font-black h-full px-4 -translate-y-1">
              Vector
            </h2>
          </Link>
        </div>

        <nav className="flex flex-row h-full bg-harsh-blue gap-5 uppercase tracking-wider text-white border-b-1 border-r-1 items-center px-10">
          <Link href="/viruses">
            <div className="hoverHeader">Viruses</div>
          </Link>
          <Link href="/about">About</Link>
          <Link href="/cart" data-test-id="cart-link">
            Cart:{' '}
            <span data-test-id="cart-count">
              {`[${totalCartItems ? totalCartItems : 'empty'}]`}
            </span>
          </Link>
          {totalCartItems > 0 ? <Link href="/checkout">Checkout</Link> : null}
        </nav>
      </div>
      <BurgerMenu totalCartItems={totalCartItems} />
    </header>
  );
}
