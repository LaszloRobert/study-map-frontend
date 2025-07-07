import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-background">
            <div className="grid grid-cols-1 gap-8 mt-6 md:flex md:justify-center md:items-center md:gap-8 md:max-w-4xl md:mx-auto">
                <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.5 }, backgroundColor: '#23262F' }}
                    className='dashboard-card bg-surface rounded-xl shadow-lg border border-primary p-8'>
                    <Link to="/county">
                        <h2 className="text-xl font-bold mb-4 text-primary">Învață județele</h2>
                        <p className="text-text">Învață județele României jucându-te.</p>
                    </Link>
                </motion.div>

                <motion.div
                    className='dashboard-card bg-surface rounded-xl shadow-lg border border-primary p-8 opacity-50 cursor-not-allowed pointer-events-none'>
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-primary">Învață râurile</h2>
                        <p className="text-text">Funcționalitate în curs de implementare.</p>
                    </div>
                </motion.div>

                <motion.div
                    className='dashboard-card bg-surface rounded-xl shadow-lg border border-primary p-8 opacity-50 cursor-not-allowed pointer-events-none'>
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-primary">Învață munții</h2>
                        <p className="text-text">Funcționalitate în curs de implementare.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Dashboard