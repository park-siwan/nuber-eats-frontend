import React from 'react';

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

const Button: React.FC<IButtonProps> = ({ canClick, loading, actionText }) => {
  return (
    <button
      className={`py-4 text-lg font-medium text-white transition-colors focus:outline-none ${
        canClick
          ? 'bg-lime-600 hover:bg-lime-700'
          : 'pointer-events-none bg-gray-300'
      }`}
    >
      {loading ? 'loading...' : actionText}
    </button>
  );
};

export default Button;
