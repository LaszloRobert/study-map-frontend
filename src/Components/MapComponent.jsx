import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { ReactComponent as RomaniaMap } from '../assets/Romania-Map.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const counties = [
    'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani', 'Brașov', 'Brăila',
    'Buzău', 'Caraș-Severin', 'Călărași', 'Cluj', 'Constanța', 'Covasna', 'Dâmbovița', 'Dolj',
    'Galați', 'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara', 'Ialomița', 'Iași', 'Ilfov', 'Maramureș',
    'Mehedinți', 'Mureș', 'Neamț', 'Olt', 'Prahova', 'Satu Mare', 'Sălaj', 'Sibiu', 'Suceava',
    'Teleorman', 'Timiș', 'Tulcea', 'Vaslui', 'Vâlcea', 'Vrancea', 'București'
];

const normalizeString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};


const MapComponent = () => {
    const { user } = useContext(UserContext);
    const [selectedCounty, setSelectedCounty] = useState('');
    const [targetCounty, setTargetCounty] = useState('');
    const [feedback, setFeedback] = useState('');

    const randomCounty = () => {
        const randomCounty = counties[Math.floor(Math.random() * counties.length)];
        setTargetCounty(randomCounty);
    }

    // Generate a random county on component mount
    useEffect(() => {
        randomCounty();
    }, []); // Run only once when the component loads

    useEffect(() => {
        if (feedback === 'Correct!' || feedback === 'Try again!') {
            const timer = setTimeout(() => {
                setFeedback('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [feedback])

    const handleClick = (e) => {
        const countyName = decodeURIComponent(e.target.getAttribute('name'));
        console.log(countyName);
        const normalizedCountyName = normalizeString(countyName);
        setSelectedCounty(countyName); // Keep the original name with diacritics for display
        checkCounty(normalizedCountyName);
    };

    const checkCounty = (countyName) => {
        const normalizedTargetCounty = normalizeString(targetCounty);
        if (countyName === normalizedTargetCounty) {
            setFeedback('Correct!');
            randomCounty();
        } else {
            setFeedback('Try again!');
        }
    };


    return (
        <div className="flex flex-col items-center mt-5 p-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-white">Alege: {targetCounty}</h1>
            <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
                <RomaniaMap onClick={handleClick} className="map h-auto w-full z-1" />
            </div>
            <p className="mt-4 text-lg text-white">{selectedCounty}</p>
            <AnimatePresence>
                {feedback === 'Correct!' && (
                    <motion.div
                        className="absolute top-[30%] right-20 flex flex-col"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-white">Correct</h1>
                        <FontAwesomeIcon icon={faCheck} className="text-green-500 text-2xl" />
                    </motion.div>
                )}
                {feedback === 'Try again!' && (
                    <motion.div
                        className="absolute top-[30%] left-20 flex flex-col"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%', y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-white">Mai incearca</h1>
                        <FontAwesomeIcon icon={faTimes} className="text-red-500 text-2xl" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MapComponent;
