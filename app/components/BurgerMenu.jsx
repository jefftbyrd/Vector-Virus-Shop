'use client';
// import './BurgerMenu.css'; // Optional: for custom styles
import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="burgerMenu">
      <Menu
        // right
        pushRotate
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        isOpen={isOpen}
        onStateChange={handleStateChange}
      >
        <a onClick={closeMenu} className="menu-item" href="/">
          Home
        </a>
        <a onClick={closeMenu} className="menu-item" href="/about">
          About
        </a>
        <a onClick={closeMenu} className="menu-item" href="/contact">
          Contact
        </a>
        {/* Add more menu items as needed */}
      </Menu>
    </div>
  );
};

export default BurgerMenu;
