'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

const BurgerMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="burgerMenu ">
      <div className="">
        <Menu
          pageWrapId="pageWrap"
          outerContainerId="outerContainer"
          isOpen={isOpen}
          onStateChange={handleStateChange}
          width="50%"
        >
          <Link onClick={closeMenu} className="menu-item" href="/">
            Home
          </Link>
          <Link onClick={closeMenu} className="menu-item" href="/viruses">
            Viruses
          </Link>
          <Link onClick={closeMenu} className="menu-item" href="/about">
            About
          </Link>
          <Link
            href="/cart"
            data-test-id="cart-link"
            onClick={closeMenu}
            className="menu-item"
          >
            Cart{' '}
            <span data-test-id="cart-count">
              {`[${props.totalCartItems ? props.totalCartItems : 'empty'}]`}
            </span>
          </Link>
          {props.totalCartItems > 0 ? (
            <Link href="/checkout">Checkout</Link>
          ) : null}
        </Menu>
      </div>
      <div className="pb-2 w-fit m-auto">
        <Link href="/">
          <h2 className="">Vector</h2>
          <h3 className="">The Virus Shop</h3>
        </Link>
      </div>
      <div className="w-auto absolute right-2 -translate-y-2 top-0">
        <Link href="/">
          <Image
            src="/viruses/adenovirus-home.webp"
            alt="Vector, the virus shop"
            width={80} // Set desired width
            height={30} // Set actual height (for aspect ratio)
            className="h-auto drop-shadow-md/30"
          />
        </Link>
      </div>
    </div>
  );
};

export default BurgerMenu;
