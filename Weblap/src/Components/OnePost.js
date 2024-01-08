import React, { useState, useEffect } from 'react';
import '../Style/Posts.css';
import '../Style/Main.css';
import defaultImage from '../pictures/defaultimage.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faPaintBrush, faRobot, faPersonWalking, faUtensils, faBookAtlas, faLeaf, faMicrochip, faCarSide } from '@fortawesome/free-solid-svg-icons';
import {faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function OnePost({postData}) {
    const [seeText, setSeeText] = useState(false);
    const [currentPicture, setCurrentPicture] = useState(defaultImage);
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
    const icon = links.find(link => link.ID === postData.category.categoryName).iconName;

    const toggleText = () => {
      setSeeText(!seeText);
    }

    useEffect(() => {
        import(`../uploads/${postData.imageId}`)
            .then(image => {
                setCurrentPicture(image.default);
            })
            .catch(err => {
                console.log(err);
                setCurrentPicture(defaultImage);
            });
    }, [postData.imageId]);

  return (
    <div className="post-container">
      <div className='image-icon-container  preventSelect'>
        <FontAwesomeIcon icon={icon} className='post-icon' /> 
        <img src={currentPicture} className="post-image" alt="Uploaded_image" />
      </div>

      <h1 className="post-title" onClick={toggleText}>{postData.title} {seeText ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</h1>
      {seeText ? <p className="post-content">{postData.content}</p> : null}
    </div>
  );
}
