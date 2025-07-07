import { useState, useEffect } from 'react';
import { getRandomColor } from '../utils/colorUtils';
import { toast } from 'react-toastify';
import { saveUserCoins } from '../../../Service/countyApiService';

const countyPrice = 10;
const gameTime = 10;

export function useCountyGame(unlockedCounties, setCoins, userId, coins, setUser, user) {
  const [gameMode, setGameMode] = useState(false);
  const [gamePool, setGamePool] = useState(null);
  const [currentGameCounty, setCurrentGameCounty] = useState(null);
  const [timer, setTimer] = useState(gameTime);
  const [countyColors, setCountyColors] = useState({});
  const [highlightedCounty, setHighlightedCounty] = useState(null);

  useEffect(() => {
    if (gameMode && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && gameMode) {
      endRound(false);
    }
    // eslint-disable-next-line
  }, [timer, gameMode]);

  const saveCoinsToBackend = async (finalCoins) => {
    if (!userId) return;
    try {
      await saveUserCoins(userId, finalCoins);
      if (setUser && user) {
        setUser({ ...user, coins: finalCoins });
      }
    } catch (e) {
      toast.error('Eroare la salvarea monedelor!');
    }
  };

  const startGame = () => {
    if (!unlockedCounties || unlockedCounties.length === 0) {
      toast.warning('Nu este deblocat niciun județ!');
      return;
    }
    const pool = [...unlockedCounties];
    setGamePool(pool);
    setGameMode(true);
    const initialColors = {};
    pool.forEach((county) => {
      initialColors[county] = getRandomColor();
    });
    setCountyColors(initialColors);
    setNextCounty(pool);
  };

  const setNextCounty = (currentPool) => {
    if (!currentPool || currentPool.length === 0) {
      setGameMode(false);
      setCurrentGameCounty(null);
      setGamePool(null);
      saveCoinsToBackend(coins);
      return;
    }
    const randomCounty = currentPool[Math.floor(Math.random() * currentPool.length)];
    setCurrentGameCounty(randomCounty);
    setTimer(gameTime);
  };

  const endRound = (correct) => {
    if (correct) {
      setCoins((c) => c + 10);
      setGamePool((prevPool) => {
        const newPool = prevPool.filter((county) => county !== currentGameCounty);
        setNextCounty(newPool);
        return newPool;
      });
    } else {
      setHighlightedCounty(currentGameCounty);
      setTimeout(() => {
        setHighlightedCounty(null);
      }, 2000);
      toast.error('❌ Greșit!');
      setNextCounty(gamePool);
    }
  };

  // Call this to stop the game and save coins
  const stopGame = () => {
    setGameMode(false);
    setCurrentGameCounty(null);
    setGamePool(null);
    saveCoinsToBackend(coins);
  };

  return {
    gameMode,
    gamePool,
    currentGameCounty,
    timer,
    countyColors,
    highlightedCounty,
    startGame,
    endRound,
    setGameMode,
    setHighlightedCounty,
    setGamePool,
    setCurrentGameCounty,
    setTimer,
    setCountyColors,
    stopGame,
  };
} 