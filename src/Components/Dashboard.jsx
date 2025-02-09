import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.5 }, backgroundColor: '#f0f0f0' }}
                    className='dashboard-card'>
                    <Link to="/county">
                        <h2 className="text-xl font-bold mb-4">Invata judetele</h2>
                        <p>Invata judetele Romaniei jucandu-te</p>
                    </Link>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.5 }, backgroundColor: '#f0f0f0' }}
                    className='dashboard-card'>
                    <Link to="/invata-judetele">
                        <h2 className="text-xl font-bold mb-4">Invata judetele</h2>
                        <p>Learn about the counties of Romania.</p>
                    </Link>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.5 }, backgroundColor: '#f0f0f0' }}
                    className='dashboard-card'>
                    <Link to="/invata-judetele">
                        <h2 className="text-xl font-bold mb-4">Invata judetele</h2>
                        <p>Learn about the counties of Romania.</p>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

export default Dashboard