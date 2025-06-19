import React, { useContext, useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { unlockCountyForUser } from '../../Service/countyApiService';
import { UserContext } from '../UserContext';
import { useUnlockedCounties } from './hooks/useUnlockedCounties';
import { useCountyGame } from './hooks/useCountyGame';
import CountyMap from './CountyMap';
import GamePanel from './GamePanel';
import UnlockedCountiesList from './UnlockedCountiesList';
import CoinDisplay from './CoinDisplay';
import Tooltip from './Tooltip';

const countyPrice = 10;

const CountyMode = () => {
    const { user } = useContext(UserContext);
    const [coins, setCoins] = useState(user?.coins ?? 0);
    const [hoveredCounty, setHoveredCounty] = useState('');
    const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
    const [lockPositions, setLockPositions] = useState([]);
    const svgRef = useRef(null);

    // Unlocked counties hook
    const {
        unlockedCounties,
        setUnlockedCounties,
        refreshUnlocked
    } = useUnlockedCounties(user.userId);

    // Game logic hook
    const {
        gameMode,
        gamePool,
        currentGameCounty,
        timer,
        countyColors,
        highlightedCounty,
        startGame,
        endRound,
        setGameMode
    } = useCountyGame(unlockedCounties, setCoins);

    // Calculate lock positions and update SVG fills
    useEffect(() => {
        if (!svgRef.current) return;
        const calculateLocks = () => {
            const newPositions = [];
            const paths = svgRef.current.querySelectorAll('path[name]');
            paths.forEach((path) => {
                const name = path.getAttribute('name');
                if (!gameMode) {
                    if (unlockedCounties.includes(name)) {
                        path.classList.remove('locked');
                        path.style.fill = '';
                        path.style.stroke = '';
                        path.style.strokeWidth = '';
                    } else {
                        path.classList.add('locked');
                        const bbox = path.getBBox();
                        newPositions.push({
                            name,
                            x: bbox.x + bbox.width / 2,
                            y: bbox.y + bbox.height / 2,
                        });
                        path.style.fill = '';
                        path.style.stroke = '';
                        path.style.strokeWidth = '';
                    }
                } else {
                    if (gamePool && gamePool.includes(name)) {
                        path.classList.remove('locked');
                        path.style.fill = countyColors[name] || '';
                        if (highlightedCounty === name) {
                            path.style.stroke = 'red';
                            path.style.strokeWidth = '3px';
                        } else {
                            path.style.stroke = '';
                            path.style.strokeWidth = '';
                        }
                        path.style.cursor = 'pointer';
                    } else {
                        path.classList.remove('locked');
                        path.style.fill = '';
                        path.style.stroke = '';
                        path.style.strokeWidth = '';
                        path.style.cursor = 'default';
                    }
                }
            });
            setLockPositions(newPositions);
        };
        setTimeout(calculateLocks, 50);
    }, [unlockedCounties, gameMode, gamePool, highlightedCounty, countyColors]);

    // Mouse event handlers
    const handleMouseEnter = (e) => {
        if (gameMode) return;
        const county = e.target.getAttribute('name');
        if (county && !unlockedCounties.includes(county)) {
            setHoveredCounty(county);
            setDialogPosition({ x: e.clientX + 10, y: e.clientY + 10 });
        }
    };
    const handleMouseLeave = () => {
        if (gameMode) return;
        setHoveredCounty('');
    };

    // Click handler
    const handleClick = async (e) => {
        const county = e.target.getAttribute('name');
        if (gameMode) {
            if (county === currentGameCounty) {
                endRound(true);
            } else {
                endRound(false);
            }
        } else if (county && !unlockedCounties.includes(county)) {
            await unlockCounty(county);
        }
    };

    // Unlock a county by spending coins
    const unlockCounty = async (county) => {
        if (coins >= countyPrice) {
            setCoins((c) => c - countyPrice);
            setUnlockedCounties([...unlockedCounties, county]);
            setHoveredCounty('');
            toast.success(`Unlocked ${county}!`);
            await unlockCountyForUser(user.userId, county, coins - countyPrice);
            refreshUnlocked();
        } else {
            toast.warning('Nu ai suficiente monede!');
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-2 pt-[85px] bg-background max-w-full">
            <CoinDisplay coins={coins} />
            {!gameMode && (
                <button
                    onClick={startGame}
                    className="bg-primary py-2 px-4 rounded-lg shadow-md absolute top-[20px] left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 text-text font-semibold hover:bg-accent transition border border-accent text-sm sm:text-base"
                >
                    🎮 Incepe jocul
                </button>
            )}
            {gameMode && (
                <button
                    onClick={() => setGameMode(false)}
                    className="bg-red-500 py-1 px-2 rounded-md shadow-md absolute top-[20px] right-4 text-white text-xs sm:text-sm font-semibold hover:bg-red-600 transition border border-red-700"
                >
                    ⏹️ Stop joc
                </button>
            )}
            <div className="w-full flex flex-col items-center gap-4">
                <GamePanel
                    gameMode={gameMode}
                    currentGameCounty={currentGameCounty}
                    timer={timer}
                />
                <CountyMap
                    unlockedCounties={unlockedCounties}
                    lockPositions={lockPositions}
                    onCountyClick={handleClick}
                    onCountyHover={handleMouseEnter}
                    onCountyLeave={handleMouseLeave}
                    svgRef={svgRef}
                    gameMode={gameMode}
                    countyColors={countyColors}
                    highlightedCounty={highlightedCounty}
                    gamePool={gamePool}
                    countyPrice={countyPrice}
                />
                <Tooltip
                    hoveredCounty={hoveredCounty}
                    countyPrice={countyPrice}
                    dialogPosition={dialogPosition}
                />
                <UnlockedCountiesList unlockedCounties={unlockedCounties} />
            </div>
        </div>
    );
};

export default CountyMode;
