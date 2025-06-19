import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.5 }, backgroundColor: '#23262F' }}
                    className='dashboard-card bg-surface rounded-xl shadow-lg border border-primary p-8'>
                    <Link to="/county">
                        <h2 className="text-xl font-bold mb-4 text-primary">Invata judetele</h2>
                        <p className="text-text">Invata judetele Romaniei jucandu-te</p>
                    </Link>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.5 }, backgroundColor: '#23262F' }}
                    className='dashboard-card bg-surface rounded-xl shadow-lg border border-primary p-8'>
                    <Link to="/invata-judetele">
                        <h2 className="text-xl font-bold mb-4 text-primary">Invata judetele</h2>
                        <p className="text-text">Learn about the counties of Romania.</p>
                    </Link>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.5 }, backgroundColor: '#23262F' }}
                    className='dashboard-card bg-surface rounded-xl shadow-lg border border-primary p-8'>
                    <Link to="/invata-judetele">
                        <h2 className="text-xl font-bold mb-4 text-primary">Invata judetele</h2>
                        <p className="text-text">Learn about the counties of Romania.</p>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

export default Dashboard