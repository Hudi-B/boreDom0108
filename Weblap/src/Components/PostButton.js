import React, { useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFeather, faTimes, faList, faCat, faPaintBrush, faRobot, faPersonWalking, faUtensils, faBookAtlas, faLeaf, faMicrochip, faCarSide, faQuestion } from '@fortawesome/free-solid-svg-icons';
import defaultImage from '../defaultimage.jpg';

export default function PostButton( {coll} ) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(defaultImage); // Set the default image URL
  const [category, setCategory] = useState('');
  const [icon, setIcon] = useState(faQuestion);

  const fileInput = useRef(null);
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
  
      reader.onloadend = (e) => {
        setImageUrl(reader.result);
      };
  
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const valtoztat = (newIcon) => {
    setIcon(newIcon);
  }

  let categories = [
    {name: 'Animals', iconName: faCat},
    {name: 'Art', iconName: faPaintBrush},
    {name: 'Ai', iconName: faRobot},
    {name: 'Fitness', iconName: faPersonWalking},
    {name: 'Gastronomy', iconName: faUtensils},
    {name: 'History', iconName: faBookAtlas},
    {name: 'Nature', iconName: faLeaf},
    {name: 'Technology', iconName: faMicrochip},
    {name: 'Vehicles', iconName: faCarSide},
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postData = {
      title,
      content,
      image,
      category,
    };
  if(title.trim() === "" || content.trim() === "" || category === "" || image === null) {
    alert("Please fill in all the fields")
  } else {
                          console.log(postData) //testing
    try {
      await fetch("link", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(postData),
      });
    } catch (error) {
      console.error(error);
    } 
  }



};

  return (
    <Popup trigger={<button className={`postButton ${coll ? 'collapsed' : ''}`}>{coll ? <FontAwesomeIcon icon={faFeather}/> : <div className='buttontext'>Post</div>}</button>} modal nested>
      {(close) => (
        <div className='bigBox' onClick={close}>
          <div className='inputBox' onClick={(event) => event.stopPropagation()} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <FontAwesomeIcon onClick={close} className='closeIcon' icon={faTimes} />
            <form className='form' onSubmit={handleSubmit}>

            <div>
      <input
        type='file'
        accept='image/*'
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      {imageUrl && (
        <img
          src={imageUrl}
          alt='Selected'
          style={{ maxWidth: '50%', height: 'auto' }}
          onClick={() => fileInput.current.click()}
        />
      )}
    </div>
              <div className='szoveg'>
                <input 
                  type="text" 
                  placeholder='Name your post' 
                  onFocus={(e) => e.target.placeholder=''} 
                  onBlur={(e) => e.target.placeholder='Name your post'}
                  name='Title' 
                  id='Title' 
                  onChange={(e) => setTitle(e.target.value)} 
                  required
              />
                <textarea 
                  placeholder='Your content goes here...' 
                  onFocus={(e) => e.target.placeholder=''} 
                  onBlur={(e) => e.target.placeholder='Your content goes here...'}
                  name='Content' 
                  id='Content' 
                  onChange={(e) => setContent(e.target.value)} 
                  required
                />
              </div>

              <div className="menu">
                <Popup
                  trigger={<div className='preventSelect'> <FontAwesomeIcon icon={faList}/> Category:  <FontAwesomeIcon id='categoryIcon' icon={icon} /></div>}
                  position="right bottom"
                  on="click"
                  closeOnDocumentClick
                  arrow={false}
                >
                   {(close) => (
                  <div className="menu popup">
                    {categories.map((categ) => (
                      <div className="menu-item preventSelect" onClick={() => {
                        setCategory(categ.name);
                        valtoztat(categ.iconName);
                        close();
                      }}><FontAwesomeIcon className='smallicon' icon={categ.iconName}/>{categ.name}</div>
                    ))}
                  </div>
                   )}
                </Popup>
              </div>
              <input type="submit" value="Post" className='postButton' />
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
}
