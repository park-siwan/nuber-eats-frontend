import React from 'react';
import nuberLogo from '../images/logo.svg';

export const Header = () => (
  <header className="py-4">
    <div className="mx-auto w-full max-w-screen-xl">
      <img src={nuberLogo} className="mb-10 w-52" alt="Nuber Eats" />
      im the header
    </div>
  </header>
);
