import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import LoginModal from './Login/LoginModal';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
    const { user, logout } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getInitials = (name) => {
        return name.split(" ").map((n) => n[0]).join("");
    }

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="fixed top-0 w-full text-text flex justify-center z-50">
            <div className='bg-surface bg-opacity-95 w-[98%] max-w-4xl flex flex-col sm:flex-row justify-between items-center p-2 sm:p-4 rounded-2xl mt-2 shadow-lg border border-primary'>
                <div className="text-2xl font-bold text-primary w-full sm:w-auto flex justify-between items-center">
                    <Link to="/">Mapping</Link>
                    <button className="sm:hidden ml-2 p-2" onClick={toggleMenu} aria-label="Open menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>

                <div className="hidden sm:flex items-center">
                    <Link
                        to={user ? "/dashboard" : "#"}
                        className={`mr-4 ${user ? "text-text" : "text-muted cursor-not-allowed"}`}
                        data-tooltip-id="dashboard-tooltip"
                        data-tooltip-content={!user ? "Logare este necesara pentru mai multe functionalitati" : ""}
                    >
                        Dashboard
                    </Link>
                    <Tooltip id="dashboard-tooltip" place="bottom" type="dark" effect="solid" />
                    <div>
                        {user ? (
                            <div className="relative" ref={menuRef}>
                                <div
                                    className="w-10 h-10 bg-primary text-text rounded-full flex items-center justify-center cursor-pointer border-2 border-accent shadow-md"
                                    onClick={toggleMenu}
                                >
                                    {getInitials(user.name)}
                                </div>
                                {menuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg border border-primary">
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
                </div>
                {menuOpen && (
                    <div className="flex flex-col items-center w-full sm:hidden mt-2 space-y-2">
                        <Link
                            to={user ? "/dashboard" : "#"}
                            className={`w-full text-center py-2 ${user ? "text-text" : "text-muted cursor-not-allowed"}`}
                            data-tooltip-id="dashboard-tooltip-mobile"
                            data-tooltip-content={!user ? "Logare este necesara pentru mai multe functionalitati" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Tooltip id="dashboard-tooltip-mobile" place="bottom" type="dark" effect="solid" />
                        <div className="w-full flex justify-center">
                            {user ? (
                                <button onClick={handleLogout} className="bg-primary text-text hover:bg-accent font-bold py-2 px-4 rounded w-full transition shadow-md">Logout</button>
                            ) : (
                                <button onClick={openModal} className="bg-primary text-text hover:bg-accent font-bold py-2 px-4 rounded w-full transition shadow-md">Logare</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </nav>
    )
}

export default Navbar;