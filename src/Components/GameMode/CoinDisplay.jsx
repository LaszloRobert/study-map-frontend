import React from 'react';

const CoinDisplay = ({ coins }) => (
  <div className="absolute top-[20px] left-4 flex items-center bg-gradient-to-r from-primary to-secondary text-background text-md font-bold py-2 px-4 rounded-lg shadow-md border border-primary">
    💰 Coins: {coins}
  </div>
);

export default CoinDisplay; 