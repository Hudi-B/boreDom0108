import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './Style/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCat, faPaintBrush, faRobot, faPersonWalking, faUtensils, faBookAtlas, faLeaf, faMicrochip, faCarSide } from '@fortawesome/free-solid-svg-icons';


import Home from './Pages/MultiplePost';
import SinglePost from './Pages/SinglePost';
import CategorizedPost from './Pages/CategorizedPost';

function App() {
  return (
    <div class="d-flex container">
      <Router>
        <div class="p-2 navbuttons">
          <nav className="navbar">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to={`/`} className="nav-link"> {/*bored bets text takes user home*/}
                    <h1>Y</h1>{/*Icon goes here*/}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/Category/Animals`} className="nav-link">
                    <FontAwesomeIcon className='smallicon' icon={faCat} />Animals
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/Category/Art`} className="nav-link">
                  <FontAwesomeIcon className='smallicon' icon={faPaintBrush} />Art
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/Category/Ai`} className="nav-link">
                    <FontAwesomeIcon className='smallicon' icon={faRobot} />Ai
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/Category/Fitness`} className="nav-link">
                    <FontAwesomeIcon  className='smallicon'icon={faPersonWalking} />Fitness
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/Category/Gastronomy`} className="nav-link">
                    <FontAwesomeIcon  className='smallicon'icon={faUtensils} />Gastronomy
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/Category/History`} className="nav-link">
                    <FontAwesomeIcon  className='smallicon'icon={faBookAtlas} />History
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/Category/Nature`} className="nav-link">
                    <FontAwesomeIcon  className='smallicon'icon={faLeaf} />Nature
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/Category/Technology`} className="nav-link">
                    <FontAwesomeIcon  className='smallicon'icon={faMicrochip} />Technology
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/Category/Vehicles`} className="nav-link">
                    <FontAwesomeIcon className='smallicon' icon={faCarSide} />Vehicles  
                  </Link>
                </li>
                <li>
                  {/*BUTTON, dont wanna do yet*/}
                </li>
              </ul>
          </nav>
        </div>
        <div class="p-2 flex-fill content">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="*" element={<Home/>} />
            <Route exact path="/posts/:postID" element={<SinglePost/>} />
            <Route exact path="/Category/:category" element={<CategorizedPost/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;