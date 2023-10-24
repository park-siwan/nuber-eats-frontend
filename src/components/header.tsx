import React from 'react';
import nuberLogo from '../images/logo.svg';
import { useMe } from '../hooks/useMe';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-xs text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 xl:px-0">
          <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
