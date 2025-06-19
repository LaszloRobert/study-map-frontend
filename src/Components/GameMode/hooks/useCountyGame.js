import { useState, useEffect } from 'react';
import { getRandomColor } from '../utils/colorUtils';
import { toast } from 'react-toastify';


const gameTime = 10;

export function useCountyGame(unlockedCounties, setCoins) {
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
      toast.success('Joc terminat! Ai completat toate județele.');
      setGameMode(false);
      setCurrentGameCounty(null);
      setGamePool(null);
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
      setNextCounty(gamePool);
    }
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
  };
} 