import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MapComponent from './Components/MapComponent';
import { UserProvider, UserContext } from './Components/UserContext';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import CountyMode from './Components/GameMode/CountyMode';
import PrivateRoute from "./Components/PrivateRoute";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div class="pt-[85px]"> {/* Add padding to avoid content being hidden behind the navbar */}
          <Routes>
            <Route path="/map" element={<MapComponent />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/county" element={<PrivateRoute element={<CountyMode />} />} />
            <Route path="*" element={<Navigate to="/map" />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}  // Toast will automatically close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
      />
    </UserProvider>
  );
}

export default App;
