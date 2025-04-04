import React, { useState, useEffect } from 'react';
import RomaniaMap from '../assets/RomaniaMap';

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
        <div className="flex flex-col items-center mt-5 p-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-white">Alege: {targetCounty}</h1>
            <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
                <RomaniaMap onCountyClick={handleClick} className="map h-auto w-full z-1" />
            </div>
            <p className="mt-4 text-xl text-primary font-semibold">
                Județ selectat: {selectedCounty || 'Niciun județ selectat'}
            </p>
        </div>
    );
};

export default MapComponent;
