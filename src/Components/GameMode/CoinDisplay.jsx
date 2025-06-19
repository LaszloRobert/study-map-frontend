import React from 'react';

const CoinDisplay = ({ coins }) => (
  <div className="fixed top-2 left-2 z-30 flex items-center bg-white/90 text-primary text-base sm:text-lg font-bold py-1.5 px-3 rounded-md shadow-lg border border-primary">
    💰 Coins: {coins}
  </div>
);

export default CoinDisplay; 