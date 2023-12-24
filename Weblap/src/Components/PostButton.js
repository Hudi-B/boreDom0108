import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFeather, faTimes, faList, faCat, faPaintBrush, faRobot, faPersonWalking, faUtensils, faBookAtlas, faLeaf, faMicrochip, faCarSide, faQuestion } from '@fortawesome/free-solid-svg-icons';

export default function PostButton( {coll} ) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [icon, setIcon] = useState(faQuestion);

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
  if(title.trim() === "" || content.trim() === "" || category === "" || image === "") {
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
};



}
  return (
    <Popup trigger={<button className={`postButton ${coll ? 'collapsed' : ''}`}>{coll ? <FontAwesomeIcon icon={faFeather}/> : <div className='buttontext'>Post</div>}</button>} modal nested>
      {(close) => (
        <div className='bigBox' onClick={close}>
          <div className='inputBox' onClick={(event) => event.stopPropagation()} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <FontAwesomeIcon onClick={close} className='closeIcon' icon={faTimes} />
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input type="text" name='Title' onChange={(e) => setTitle(e.target.value)} />
              <label>Content:</label>
              <input type="text" name='Content' onChange={(e) => setContent(e.target.value)} />
              <label>Image:</label>
              <input type="text" name='Image' onChange={(e) => setImage(e.target.value)} />
              <div className="menu">
                <Popup
                  trigger={<div className='preventSelect'> <FontAwesomeIcon icon={faList}/> Category:  <FontAwesomeIcon id='categoryIcon' icon={icon} /></div>}
                  position="right top"
                  on="click"
                  closeOnDocumentClick
                  arrow={false}
                >
                   {(close) => (
                  <div className="menu">
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