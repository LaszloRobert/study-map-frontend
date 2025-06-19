import { useState, useEffect } from 'react';
import { getUnlockedCounties } from '../../../Service/countyApiService';

export function useUnlockedCounties(userId) {
  const [unlockedCounties, setUnlockedCounties] = useState([]);

  const fetchUnlocked = async () => {
    if (!userId) return;
    try {
      const unlocked = await getUnlockedCounties(userId);
      setUnlockedCounties(unlocked);
    } catch (e) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchUnlocked();
    // eslint-disable-next-line
  }, [userId]);

  return { unlockedCounties, setUnlockedCounties, refreshUnlocked: fetchUnlocked };
} 