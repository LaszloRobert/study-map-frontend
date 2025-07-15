import React, { useState, useEffect } from 'react';
import RomaniaMap from '../assets/RomaniaMap';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

const counties = [
    'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani', 'Brașov', 'Brăila',
    'Buzău', 'Caraș-Severin', 'Călărași', 'Cluj', 'Constanța', 'Covasna', 'Dâmbovița', 'Dolj',
    'Galați', 'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara', 'Ialomița', 'Iași', 'Ilfov', 'Maramureș',
    'Mehedinți', 'Mureș', 'Neamț', 'Olt', 'Prahova', 'Satu Mare', 'Sălaj', 'Sibiu', 'Suceava',
    'Teleorman', 'Timiș', 'Tulcea', 'Vaslui', 'Vâlcea', 'Vrancea', 'București'
];

const MapComponent = () => {
    const [selectedCounty, setSelectedCounty] = useState('');
    const [targetCounty, setTargetCounty] = useState('');

    const randomCounty = () => {
        const randomCounty = counties[Math.floor(Math.random() * counties.length)];
        setTargetCounty(randomCounty);
    }

    // Generate a random county on component mount
    useEffect(() => {
        randomCounty();
    }, []); // Run only once when the component loads

    const handleClick = (e) => {
        let countyName = e.target.getAttribute('name');
        setSelectedCounty(countyName);
        checkCounty(countyName, e);
    };

    const checkCounty = (countyName, e) => {
        if (countyName === targetCounty) {
            randomCounty();
            document.querySelectorAll('path[name]').forEach(p => {
                p.style.fill = ''; // reset all
            });
        } else {
            e.target.style.fill = 'red';
        }
    };


    return (
        <>
            <Helmet>
                <title>Harta României - Roharta</title>
                <meta name="description" content="Explorează harta interactivă a României pe Roharta. Descoperă județele, învață geografie și multe altele!" />
                <link rel="canonical" href="https://www.roharta.ro/map" />
                <meta property="og:title" content="Harta României - Roharta" />
                <meta property="og:description" content="Explorează harta interactivă a României pe Roharta. Descoperă județele, învață geografie și multe altele!" />
                <meta property="og:url" content="https://www.roharta.ro/map" />
            </Helmet>
            <div className="flex flex-col items-center mt-2 sm:mt-5 p-2 sm:p-4 min-h-screen bg-gradient-to-b from-background via-surface to-background">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-text font-bold text-center">Alege: {targetCounty}</h1>
                <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
                    <RomaniaMap onCountyClick={handleClick} className="map h-auto w-full z-1" />
                </div>
                <p className="mt-2 sm:mt-4 text-base sm:text-lg text-primary font-semibold text-center">
                    Județ selectat: <span className="text-accent">{selectedCounty || 'Niciun județ selectat'}</span>
                </p>
                <div className="mt-4 text-center">
                    <Link to="/blog" className="text-muted hover:text-primary text-sm transition-colors">
                        📚 Învață mai multe despre geografia României
                    </Link>
                </div>
            </div>
        </>
    );
};

export default MapComponent;
