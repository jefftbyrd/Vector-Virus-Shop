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
      <div className="bg-dark-green h-16 hidden sm:block">
        <Link href="/">
          <h3 className="absolute top-2 left-5 lowercase font-grotesk text-4xl tracking-widest font-black text-light-green border-b-2 pb-1 border-white hover:text-white hover:border-light-green transition-all duration-200 ease-in-out">
            Vector
          </h3>
        </Link>
        <div className="normalMenu hidden top-0 right-0 sm:flex absolute top-0 z-100  items-center h-18">
          {/* <div className="flex flex-row h-full bg-light-green items-center logoContainer text-dark-green">
            <Link href="/">
              <h2 className="lowercase font-grotesk text-[1.7rem] leading-none tracking-[0.3rem] font-black h-full px-4 -translate-y-1">
                Vector
              </h2>
            </Link>
          </div> */}

          {/* <nav className="flex flex-row h-full bg-harsh-blue gap-5 uppercase tracking-wider text-white border-b-1 border-r-1 items-center px-10"> */}
          <nav className="flex flex-row h-full gap-5 text-lg uppercase tracking-widest items-center px-10 font-black text-light-green border-b-1 border-light-green/50">
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
      </div>
      <BurgerMenu totalCartItems={totalCartItems} />
    </header>
  );
}
