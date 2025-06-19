import React, { useContext, useState, useEffect, useRef } from 'react';
import { ReactComponent as RomaniaMap } from '../../assets/Romania-Map.svg';
import { toast } from 'react-toastify';
import { getUnlockedCounties, unlockCountyForUser } from '../../Service/countyApiService';
import { UserContext } from '../UserContext';

const initialUnlockedCounties = []; // Counties purchased by the user.
const initialCoins = 30;
const countyPrice = 10;
const gameTime = 10; // seconds per round

// Helper: returns a random hex color.
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const CountyMode = () => {
    const { user } = useContext(UserContext);

    // Permanent state for unlocked counties and coins.
    const [unlockedCounties, setUnlockedCounties] = useState(initialUnlockedCounties);
    const [coins, setCoins] = useState(initialCoins);
    const [feedback, setFeedback] = useState('');

    // Hover state (used outside game mode)
    const [hoveredCounty, setHoveredCounty] = useState('');
    const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });

    // Game mode states.
    const [gameMode, setGameMode] = useState(false);
    const [gamePool, setGamePool] = useState(null); // Pool of counties for the current game.
    const [currentGameCounty, setCurrentGameCounty] = useState(null);
    const [timer, setTimer] = useState(gameTime);

    // Persistent colors for each county in the game.
    const [countyColors, setCountyColors] = useState({});

    const [lockPositions, setLockPositions] = useState([]);

    const [highlightedCounty, setHighlightedCounty] = useState(null);

    const svgRef = useRef(null);

    // Fetch unlocked counties from an API.
    useEffect(() => {
        const fetchUnlockedCounties = async () => {
            try {
                const unlockedCountiesFromDB = await getUnlockedCounties(user.userId);
                console.log('Unlocked counties:', unlockedCountiesFromDB);
                setUnlockedCounties(unlockedCountiesFromDB);
            } catch (e) {
                console.log(e);
                toast.error('Eroare la incarcarea judetelor deblocate');
            }
        };

        fetchUnlockedCounties();
    }, [user.userId]);

    // Calculate lock positions and update SVG fills.
    useEffect(() => {
        if (!svgRef.current) return;

        const calculateLocks = () => {
            const newPositions = [];
            const paths = svgRef.current.querySelectorAll('path[name]');

            paths.forEach((path) => {
                const name = path.getAttribute('name');

                if (!gameMode) {
                    // Outside game mode.
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
                    // In game mode.
                    if (gamePool && gamePool.includes(name)) {
                        path.classList.remove('locked');
                        path.style.fill = countyColors[name] || '';
                        // If this county is the highlighted one, add a red outline.
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
    }, [unlockedCounties, gameMode, gamePool, highlightedCounty]);

    // Game timer effect.
    useEffect(() => {
        if (gameMode && timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else if (timer === 0 && gameMode) {
            endRound(false);
        }
    }, [timer, gameMode]);

    // Mouse event handlers.
    const handleMouseEnter = (e) => {
        // Disable hover effect when in game mode.
        if (gameMode) return;

        const county = e.target.getAttribute('name');
        if (county && !unlockedCounties.includes(county)) {
            setHoveredCounty(county);
            setDialogPosition({ x: e.clientX + 10, y: e.clientY + 10 });
        }
    };

    const handleMouseLeave = () => {
        // Disable hover effect when in game mode.
        if (gameMode) return;
        setHoveredCounty('');
    };

    // Global click handler.
    const handleClick = async (e) => {
        const county = e.target.getAttribute("name");

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

    // Unlock a county by spending coins.
    const unlockCounty = async (county) => {
        if (coins >= countyPrice) {
            setCoins((c) => c - countyPrice);
            setUnlockedCounties([...unlockedCounties, county]);
            setHoveredCounty('');
            setFeedback(`Unlocked ${county}!`);
            console.log('Unlocking county:', user);
            await unlockCountyForUser(user.userId, county, coins - countyPrice);
        } else {
            toast.warning('Nu ai suficiente monede!');
        }
        setTimeout(() => setFeedback(''), 2000);
    };

    // Start game: create a game pool and initialize persistent colors.
    const startGame = () => {
        if (unlockedCounties.length === 0) {
            toast.warning('Nu este deblocat niciun judet!');
            return;
        }
        // Create a copy of the unlocked counties as the game pool.
        const pool = [...unlockedCounties];
        setGamePool(pool);
        setGameMode(true);

        // Initialize a persistent color for each county in the pool.
        const initialColors = {};
        pool.forEach((county) => {
            initialColors[county] = getRandomColor();
        });
        setCountyColors(initialColors);

        // Start the game with the first county.
        setNextCounty(pool);
    };

    // Choose the next county from the current pool.
    const setNextCounty = (currentPool) => {
        if (!currentPool || currentPool.length === 0) {
            setFeedback("Game Over! All counties completed.");
            setGameMode(false);
            setCurrentGameCounty(null);
            setGamePool(null);
            return;
        }
        const randomCounty = currentPool[Math.floor(Math.random() * currentPool.length)];
        setCurrentGameCounty(randomCounty);
        setTimer(gameTime);
    };

    // End round immediately after a click and move on.
    const endRound = (correct) => {
        if (correct) {
            setFeedback("✅ Correct! You earned 10 coins.");
            setCoins((c) => c + 10);
            // Remove the correctly guessed county from the game pool.
            setGamePool((prevPool) => {
                const newPool = prevPool.filter((county) => county !== currentGameCounty);
                // Immediately move to the next county.
                setNextCounty(newPool);
                return newPool;
            });
        } else {
            setHighlightedCounty(currentGameCounty);
            setTimeout(() => {
                setHighlightedCounty(null);
            }, 2000);
            setFeedback("❌ Wrong county!");
            // For an incorrect answer, move on using the same pool.
            setNextCounty(gamePool);
        }
        setTimeout(() => setFeedback(""), 500);
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-4 pt-[85px] bg-background">
            <div className="absolute top-[20px] left-4 flex items-center bg-gradient-to-r from-primary to-secondary text-background text-md font-bold py-2 px-4 rounded-lg shadow-md border border-primary">
                💰 Coins: {coins}
            </div>

            {/* Start Game Button */}
            {!gameMode && (
                <button
                    onClick={startGame}
                    className="bg-primary py-2 px-4 rounded-lg shadow-md absolute top-[20px] text-text font-semibold hover:bg-accent transition border border-accent"
                >
                    🎮 Incepe jocul
                </button>
            )}

            {/* Game Instructions */}
            {gameMode && currentGameCounty && (
                <div className="bg-surface p-4 rounded-xl shadow-lg border border-primary text-center max-w-xs mx-auto -mt-[80px]">
                    <p className="text-xl font-semibold text-text">
                        Alege: <span className="text-primary">{currentGameCounty}</span>
                    </p>
                    <div className="mt-2 text-accent font-medium text-lg flex items-center justify-center gap-1">
                        ⏳ <span>{timer}s</span> remaining
                    </div>
                </div>
            )}

            {/* Wrap the map with a container that conditionally has the "game-mode" class */}
            <div className={`relative w-full max-w-3xl ${gameMode ? 'game-mode' : ''}`}>
                <RomaniaMap
                    ref={svgRef}
                    onClick={handleClick}
                    onMouseMove={!gameMode ? handleMouseEnter : undefined}
                    onMouseLeave={!gameMode ? handleMouseLeave : undefined}
                    className="w-full h-auto map"
                />

                {/* Render lock icons for counties not yet unlocked (outside game mode) */}
                <svg
                    viewBox="0 0 613 433"
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                >
                    {lockPositions.map((pos, index) => (
                        <g
                            key={index}
                            transform={`translate(${pos.x},${pos.y})`}
                            className="cursor-pointer"
                            onClick={() => unlockCounty(pos.name)}
                        >
                            <text
                                x="0"
                                y="5"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="20"
                                fill="#333"
                            >
                                🔒
                            </text>
                            <text
                                x="0"
                                y="25"
                                textAnchor="middle"
                                fontSize="12"
                                fill="#333"
                            >
                                {countyPrice}
                            </text>
                        </g>
                    ))}
                </svg>

                {/* Hover tooltip (only shows when not in game mode) */}
                {hoveredCounty && (
                    <div
                        className="absolute bg-white p-4 rounded-lg shadow-lg border border-gray-200"
                        style={{
                            position: 'fixed',
                            left: dialogPosition.x,
                            top: dialogPosition.y,
                            zIndex: 1000,
                        }}
                    >
                        <h3 className="font-bold mb-2">{hoveredCounty}</h3>
                        <p className="mb-2">Cost deblocare: {countyPrice} coins</p>
                    </div>
                )}
            </div>

            <div className="mt-8 w-full max-w-3xl">
                <h2 className="text-xl font-bold mb-4">Unlocked Counties</h2>
                <div className="grid grid-cols-3 gap-4">
                    {unlockedCounties.map((county) => (
                        <div key={county} className="p-2 bg-gray-100 rounded text-center">
                            {county}
                        </div>
                    ))}
                </div>
            </div>

            {feedback && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                    {feedback}
                </div>
            )}
        </div>
    );
};

export default CountyMode;
