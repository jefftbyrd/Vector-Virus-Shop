'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

const BurgerMenu = (props) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [isOpen, setIsOpen] = useState(false);
  const [burgerColor, setBurgerColor] = useState(
    isHomePage ? '#3acda8' : '#3acda8',
  );
  const [burgerX, setBurgerX] = useState('3vw');
  const [burgerY, setBurgerY] = useState(isHomePage ? '16px' : '16px');

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const { scrollY } = useScroll();

  // Always create transforms, but use static values on non-homepage
  const burgerBarsColor = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? ['#3acda8', '#3acda8'] : ['#3acda8', '#3acda8'],
  );
  const burgerPositionX = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? ['3vw', '3vw'] : ['3vw', '3vw'],
  );
  const burgerPositionY = useTransform(
    scrollY,
    [0, 100],
    isHomePage ? ['16px', '16px'] : ['16px', '16px'],
  );

  // Always call hooks, but only update state on homepage
  useMotionValueEvent(burgerBarsColor, 'change', (latest) => {
    if (isHomePage) {
      setBurgerColor(latest);
    }
  });

  useMotionValueEvent(burgerPositionX, 'change', (latest) => {
    if (isHomePage) {
      setBurgerX(latest);
    }
  });

  useMotionValueEvent(burgerPositionY, 'change', (latest) => {
    if (isHomePage) {
      setBurgerY(latest);
    }
  });

  const burgerStyles = {
    bmBurgerBars: {
      background: burgerColor,
    },
    bmBurgerButton: {
      left: burgerX,
      top: burgerY,
    },
  };

  return (
    <div className="burgerMenu">
      <Menu
        styles={burgerStyles}
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
  );
};

export default BurgerMenu;
