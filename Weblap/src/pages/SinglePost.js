import '../Style/Main.css';
import '../Style/Posts.css';
import '../Style/Main.css';
import defaultImage from '../defaultimage.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faPaintBrush, faRobot, faPersonWalking, faUtensils, faBookAtlas, faLeaf, faMicrochip, faCarSide } from '@fortawesome/free-solid-svg-icons';


function App({postData}) {

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

  const icon = links.find(link => link.ID === postData.category).iconName

  return (
    <div className="post-container">
    <div className='image-icon-container  preventSelect'>
      <FontAwesomeIcon icon={icon} className='post-icon' /> 
      <img src={postData.image != null ? postData.image : defaultImage} className="post-image" alt="Uploaded_image" />
    </div>

    <h1 className="post-title">{postData.title}</h1>
    <p className="post-content">{postData.content}</p>
  </div>
  );
}

export default App;
