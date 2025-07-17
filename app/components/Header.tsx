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
      <div className="h-16 hidden sm:block">
        <Link href="/">
          {/* <h3 className="absolute top-2 left-5 lowercase font-grotesk text-4xl tracking-widest font-black text-light-green border-b-2 pb-1 border-white hover:text-white hover:border-light-green transition-all duration-200 ease-in-out"> */}
          {/* <h3 className="absolute top-2 left-5 lowercase font-grotesk text-4xl tracking-widest font-black hover:text-white transition-all duration-200 ease-in-out bg-gradient-to-b from-white to-middle2-green bg-clip-text text-transparent drop-shadow-md/30"> */}
          <h3 className="absolute top-2 left-5 xl:top-4 xl:left-6 lowercase font-grotesk text-4xl tracking-widest font-black text-light-green border-white hover:text-white hover:border-light-green transition-all duration-200 ease-in-out drop-shadow-md/30">
            Vector
          </h3>
        </Link>
        <div className="normalMenu hidden top-0 right-0 sm:flex absolute z-20 items-center h-14 md:h-18">
          <nav className="flex flex-row h-full sm:text-md md:text-lg uppercase tracking-widest items-center px-5 md:px-10 font-black text-white border-b-1 border-light-green/30">
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
