'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

const BurgerMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [burgerColor, setBurgerColor] = useState('#0e372e');
  const [burgerX, setBurgerX] = useState('3vw');
  const [burgerY, setBurgerY] = useState('4vw');

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const { scrollY } = useScroll();
  const burgerBarsColor = useTransform(
    scrollY,
    [0, 100],
    ['#1e7663', '#3acda8'],
  );
  const burgerPositionX = useTransform(scrollY, [0, 100], ['3vw', '3vw']);
  const burgerPositionY = useTransform(scrollY, [0, 100], ['4vw', '4.5vw']);

  // Convert MotionValue to regular state
  useMotionValueEvent(burgerBarsColor, 'change', (latest) => {
    setBurgerColor(latest);
  });

  useMotionValueEvent(burgerPositionX, 'change', (latest) => {
    setBurgerX(latest);
  });

  useMotionValueEvent(burgerPositionY, 'change', (latest) => {
    setBurgerY(latest);
  });

  const burgerStyles = {
    bmBurgerBars: {
      background: burgerColor,
    },
    bmBurgerButton: { left: burgerX, top: burgerY },
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
