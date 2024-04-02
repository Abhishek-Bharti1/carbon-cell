import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming you have some CSS file for styling
import CryptoPrices from './Crypto';
import PopulationGraph from './GraphPopulationData';
import { RxHamburgerMenu } from "react-icons/rx";
import MetaMaskIntegration from './MetaMaskWallet';
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState('Dashboard');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const setActiveLink = (link) => {
    setIsActive(link);
    setIsOpen(false);
  };

  return (
    <div className="container">
        <div className="hamburger" onClick={toggleSidebar}>
        <RxHamburgerMenu/>
        </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    

        <ul>
          <li className={isActive === 'Dashboard' ? 'active' : ''} onClick={() => setActiveLink('Dashboard')}>Dashboard</li>
          <li className={isActive === 'Graph Population Data' ? 'active' : ''} onClick={() => setActiveLink('Graph Population Data')}>Graph Population Data</li>
          <li className={isActive === 'Display Cryptocurrency Prices' ? 'active' : ""} onClick={()=>setActiveLink("Display Cryptocurrency Prices")}>Display Cryptocurrency Prices</li>
        </ul>
      </div>
      <div className="content">
        {isActive === 'Dashboard' && (
          <>
            <PopulationGraph/>
            <CryptoPrices/>
            <MetaMaskIntegration/>
          </>
        )}
        {isActive === 'Graph Population Data' && <PopulationGraph/>}
        {isActive === 'Display Cryptocurrency Prices' && <CryptoPrices/>}
      </div>
    </div>
  );
}

export default Sidebar;
