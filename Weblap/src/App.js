import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { DataProvider } from './Components/CategoriesContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/Main.css';
import './Style/Popup.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faPaintBrush, faRobot, faPersonWalking, faUtensils, faBookAtlas, faLeaf, faMicrochip, faCarSide } from '@fortawesome/free-solid-svg-icons';

import PostButton from './Components/PostButton';

import Home from './Pages/MultiplePost';
import CategorizedPost from './Pages/CategorizedPost';

import logo from './Ylogo1280px.png';

let links = [
  {ID: 'Animals', iconName: faCat},
  {ID: 'Art', iconName: faPaintBrush},
  {ID: 'Ai', iconName: faRobot},
  {ID: 'Fitness', iconName: faPersonWalking},
  {ID: 'Gastronomy', iconName: faUtensils},
  {ID: 'History', iconName: faBookAtlas},
  {ID: 'Nature', iconName: faLeaf},
  {ID: 'Technology', iconName: faMicrochip},
  {ID: 'Vehicles', iconName: faCarSide},
]


function App() {
  const [isCollapsed, setCollapsed] = useState(false);
  const [isOverSized, setOverSized] = useState(false);
  
  const categories = useContext(DataProvider);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setCollapsed(true);
      } else if (window.innerWidth > 1500) {
        setOverSized(true);
      } else {
        setCollapsed(false);
        setOverSized(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isCollapsed]);

  return (
    <DataProvider>
      <div className="app">
        <Router>
          <div className={`navbuttons ${isCollapsed ? 'collapsed' : ''} ${isOverSized ? 'oversized' : ''}`}>
            {/* Navigation bar */}
            <nav className="preventSelect">
              <ul className={`navbar-nav px-10 sidebarList ${isCollapsed ? 'collapsed' : ''}`}>
                <li className="nav-item active">
                  <Link to={`/`} className="nav-link">
                    <img src={logo} alt="logo" className={`logo${isCollapsed ? 'collapsed' : ''}`} />
                  </Link>
                </li>

                {links.map((link) => (
                  <li className="nav-item" key={link.ID}>
                    <Link to={`/Category/${link.ID}`} className="nav-link">
                      <FontAwesomeIcon className="smallicon" icon={link.iconName} />
                      {isCollapsed ? null : link.ID}
                    </Link>
                  </li>
                ))}

                <li className="text-center">
                  <PostButton coll={isCollapsed} />
                </li>
              </ul>
            </nav>
          </div>
          <div className="content">
            {/* Shown pages */}
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route exact path="/Category/:category" element={<CategorizedPost />} />
            </Routes>
          </div>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;