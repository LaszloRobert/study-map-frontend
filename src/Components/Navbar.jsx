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
        <nav className="fixed top-0 w-full text-white flex justify-center">
            <div className=' bg-black bg-opacity-80 w-[90%] flex justify-between items-center p-4 rounded-2xl mt-2 shadow-lg'>
                <div className="text-2xl font-bold">
                    <Link to="/">Mapping</Link>
                </div>

                <div className="flex items-center">
                    <Link
                        to={user ? "/dashboard" : "#"}
                        className={`mr-4 ${user ? "text-white" : "text-gray-500 cursor-not-allowed"}`}
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
                                    className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer"
                                    onClick={toggleMenu}
                                >
                                    {getInitials(user.name)}
                                </div>
                                {menuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-800"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={openModal} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded cursor-pointer">Logare</button>
                        )}
                    </div>
                </div>
            </div>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </nav>
    )
}

export default Navbar;