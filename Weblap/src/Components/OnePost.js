import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import '../Style/Main.css';
import '../Style/Posts.css';
import defaultImage from '../pictures/defaultimage.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faPen, faExpand, faPaintBrush, faRobot, faPersonWalking, faUtensils, faBookAtlas, faLeaf, faMicrochip, faCarSide,faTrash } from '@fortawesome/free-solid-svg-icons';
import {faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export default function OnePost({postData,singular}) {
    const [seeText, setSeeText] = useState(false);
    const [currentPicture, setCurrentPicture] = useState(postData.imageId===null?defaultImage:postData.imageId);

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
    const deleteThisPost = async (e) => {
      e.preventDefault();
      
      try {
        console.log(postData.id)
        // Upload the image to the server
        await axios.delete(`https://localhost:7272/api/Posts?Id=${postData.id}`,{
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
            console.log(response)
        });
        window.location.reload();
        } catch (error) {
          console.error(error);
        } 
  };
  
  const editThisPost = async (e) => {
    e.preventDefault();
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

        {singular? null : 
          <Link to={`/Posts/${postData.id}`} >
            <FontAwesomeIcon icon={faExpand} className='post-icon expand'/>
          </Link>
        }

        <img src={currentPicture} className="post-image" alt="Uploaded_image" />
      </div>

      <h1 className="post-title" onClick={singular? null : toggleText}>{postData.title}{singular ? null : (seeText ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />)}</h1>
      { singular ? 
          <p className="post-content">
          {postData.content} 
          <br/> 
            <button className="postButton belowPost deleteButton" onClick={deleteThisPost}>
              <FontAwesomeIcon icon={faTrash} />
            </button>

            <button className="postButton belowPost editButton" onClick={editThisPost}>
              <FontAwesomeIcon icon={faPen} />
            </button>
        </p> 
      :
    (seeText ? 
      <p className="post-content">
        {postData.content} 
        <br/> 
      </p> 
      : null)
    }
    </div>
  );
}
