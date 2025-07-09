import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import LoginModal from './Login/LoginModal';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logout } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false); // for desktop avatar dropdown

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getInitials = (name) => {
        return name.split(" ").map((n) => n[0]).join("");
    };

    const toggleMenu = () => setMenuOpen((open) => !open);
    const toggleDropdown = () => setDropdownOpen((open) => !open);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        setDropdownOpen(false);
    };

    // Click outside for mobile menu only
    useEffect(() => {
        if (!menuOpen) return;
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    // Click outside for desktop dropdown only
    const dropdownRef = useRef(null);
    useEffect(() => {
        if (!dropdownOpen) return;
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen]);

    return (
        <nav className="fixed top-0 w-full text-text flex justify-center z-50">
            <div className="bg-surface bg-opacity-95 w-[98%] max-w-4xl flex items-center justify-between p-2 sm:p-4 rounded-2xl mt-2 shadow-lg border border-primary">
                {/* Left: Logo */}
                <div className="text-lg sm:text-2xl font-bold text-primary">
                    <Link to="/">RoHarta</Link>
                </div>
                {/* Right: Dashboard + Avatar/Login (desktop only) */}
                <div className="hidden sm:flex items-center gap-x-4">
                    <Link
                        to={user ? "/dashboard" : "#"}
                        className={`${user ? "text-text" : "text-muted cursor-not-allowed"}`}
                        data-tooltip-id="dashboard-tooltip"
                        data-tooltip-content={!user ? "Logare este necesara pentru mai multe functionalitati" : ""}
                    >
                        Dashboard
                    </Link>
                    <Tooltip id="dashboard-tooltip" place="bottom" type="dark" effect="solid" />
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <div
                                className="w-10 h-10 bg-primary text-text rounded-full flex items-center justify-center cursor-pointer border-2 border-accent shadow-md"
                                onClick={toggleDropdown}
                            >
                                {getInitials(user.name)}
                            </div>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg border border-primary z-50">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-text hover:bg-accent hover:text-background transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={openModal} className="bg-primary text-text hover:bg-accent font-bold py-2 px-4 rounded cursor-pointer transition shadow-md">Logare</button>
                    )}
                </div>
                {/* Mobile: Hamburger */}
                <button className="sm:hidden ml-2 p-2" onClick={toggleMenu} aria-label="Open menu">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                {/* Mobile: Dropdown menu */}
                {menuOpen && (
                    <div ref={menuRef} className="absolute top-full left-0 w-full flex flex-col items-center bg-surface bg-opacity-95 rounded-b-2xl shadow-lg border-x border-b border-primary mt-1 z-50 sm:hidden">
                        <Link
                            to={user ? "/dashboard" : "#"}
                            className={`w-full text-center py-2 ${user ? "text-text" : "text-muted cursor-not-allowed"}`}
                            onClick={e => {
                                if (!user) {
                                    e.preventDefault();
                                    toast.info("Logare este necesara pentru mai multe functionalitati");
                                }
                                setMenuOpen(false);
                            }}
                        >
                            Dashboard
                        </Link>
                        <div className="w-full flex justify-center">
                            {user ? (
                                <button onClick={handleLogout} className="bg-primary text-text hover:bg-accent font-bold py-2 px-4 rounded w-full transition shadow-md mb-2">Logout</button>
                            ) : (
                                <button onClick={openModal} className="bg-primary text-text hover:bg-accent font-bold py-2 px-4 rounded w-full transition shadow-md mb-2">Logare</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </nav>
    );
};

export default Navbar;