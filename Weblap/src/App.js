import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/Main.css';
import './Style/Popup.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCat, faPaintBrush, faRobot, faPersonWalking, faUtensils, faBookAtlas, faLeaf, faMicrochip, faCarSide } from '@fortawesome/free-solid-svg-icons';

import PostButton from './Components/PostButton';

import Home from './Pages/MultiplePost';
import SinglePost from './Pages/SinglePost';
import CategorizedPost from './Pages/CategorizedPost';

let linkek = [
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
  return (
    <div class="d-flex container">
      <Router>
        <div className="p-2 navbuttons">
          <nav className="navbar preventSelect">
              <ul className="navbar-nav px-10">
                <li className="nav-item active">
                  <Link to={`/`} className="nav-link"> {/*bored bets text takes user home*/}
                    <h1>Y</h1>{/*Icon goes here*/}
                  </Link>
                </li>

                {linkek.map((link)=>(
                  <li className="nav-item nav-collapse">
                  <Link to={`/Category/${link.ID}`} className="nav-link my-1">
                    <FontAwesomeIcon className='smallicon' icon={link.iconName} />{link.ID}
                  </Link>
                </li>
                ))}

                <li className='text-center'>
                  <PostButton />
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