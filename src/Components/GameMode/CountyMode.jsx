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
import { Helmet } from "react-helmet";

const CountyMode = () => {
    const { user, setUser } = useContext(UserContext);
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

    // Dynamic unlock price
    const countyPrice = 10 + 5 * unlockedCounties.length;

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
        setGameMode,
        stopGame
    } = useCountyGame(unlockedCounties, setCoins, user.userId, coins, setUser, user);

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
            await unlockCountyForUser(user.userId, county, coins - countyPrice);
            refreshUnlocked();
        } else {
            toast.warning('Nu ai suficiente monede!');
        }
    };

    return (
        <>
            <Helmet>
                <title>Modul Județe - Roharta</title>
                <meta name="description" content="Testează-ți cunoștințele despre județele României în Modul Județe pe Roharta." />
                <link rel="canonical" href="https://www.roharta.ro/county" />
                <meta property="og:title" content="Modul Județe - Roharta" />
                <meta property="og:description" content="Testează-ți cunoștințele despre județele României în Modul Județe pe Roharta." />
                <meta property="og:url" content="https://www.roharta.ro/county" />
            </Helmet>
            <div className="relative flex flex-col items-center min-h-screen p-2 pt-24 bg-background max-w-full">
                <CoinDisplay coins={coins} />
                {!gameMode && (
                    <button
                        onClick={startGame}
                        className="bg-primary py-2 px-4 rounded-lg shadow-md mt-2 mb-2 text-text font-semibold hover:bg-accent transition border border-accent text-sm sm:text-base
                            w-full max-w-xs sm:absolute sm:top-[20px] sm:left-4 sm:translate-x-0 sm:w-auto sm:mb-0 sm:mt-0"
                    >
                        🎮 Începe jocul
                    </button>
                )}
                {gameMode && (
                    <button
                        onClick={stopGame}
                        className="bg-red-500 py-1 px-2 rounded-md shadow-md mt-2 mb-2 text-white text-xs sm:text-sm font-semibold hover:bg-red-600 transition border border-red-700
                            w-full max-w-xs sm:absolute sm:top-[20px] sm:right-4 sm:w-auto sm:mb-0 sm:mt-0"
                    >
                        ⏹️ Stop joc
                    </button>
                )}
                <div className="w-full flex flex-col items-center gap-2">
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
        </>
    );
};

export default CountyMode;
