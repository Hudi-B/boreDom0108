import React, { useEffect, useState, useRef, useContext } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../Components/CategoriesContext';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList, faCat, faPaintBrush, faRobot, faPersonWalking, faUtensils, faBookAtlas, faLeaf, faMicrochip, faCarSide, faQuestion, faArrowUp} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [icon, setIcon] = useState(faQuestion);
    const [currentPicture, setCurrentPicture] = useState('');
    const navigate = useNavigate();

  const param = useParams();
    
    const fileInput = useRef(null);

    const categ = useContext(DataContext);

    let links = [
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
    
    let imageName = '';
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            setImage(event.target.files[0]);
            reader.onloadend = (e) => {
            setImageUrl(reader.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleIconChange = (newIcon, categoryName) => {
        setIcon(newIcon);
        setCategory(categ.find(x => x.categoryName === categoryName));
        console.log(category);
    }

        const handleSubmit = async (e) => {
        e.preventDefault();
        
    
      if(title.trim() === "" || content.trim() === "" || category === "" || imageUrl === null) {
        alert("Please fill in all the fields")
      } else {
        try {
          const formData = new FormData();
          formData.append('file', image);
          await axios.delete(`http://localhost:3002/delete/${imageUrl}`, {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          });
          // Upload the image to the server
          await axios.post('http://localhost:3002/upload', formData, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((response) => {
            //using the response location to set the image url in postData
            imageName = response.data.file.filename;
          });
          const postData = {
            title: title, 
            content: content, 
            imageId: imageName, 
            categoryId: category
          };
          console.log(postData);
          // Send the post data to the server
          await axios.put(`https://localhost:7272/api/Posts?Id=${param.id}`, postData, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });
          alert("Post edited successfully!");
          navigate(-1);
        } catch (error) {
                console.error(error);
        } 
      }
    };

    useEffect(() => {
        (async () => {
          try {
            const response = await axios.get(`https://localhost:7272/api/Posts/${param.id}`, {
              headers: {
                'Access-Control-Allow-Origin': '*',
              }
            });
            setTitle(response.data.title);
            setContent(response.data.content);
            setImageUrl(response.data.imageId);
            handleIconChange(links.find(x => x.name === response.data.category.categoryName).iconName, response.data.categoryName);
            setCurrentPicture(`../uploads/${response.data.imageId}`);   
          } catch (error) {
            console.log(error)
          } finally {
          }
          
        })();
      }, [param.id]);

    return (
        <div className='inputBox'>
            <h1 className='title'>edit a new post</h1>
            <form className='form' onSubmit={handleSubmit}>
            <div className='imageInputDiv'>
                <input
                type='file'
                accept='image/*'
                ref={fileInput}
                style={{ display: 'none' }}
                defaultValue={imageUrl}
                onChange={handleImageChange}
                />
                {imageUrl && (
                <img
                    src={currentPicture}
                    alt='Selected'
                    className='inputImage'
                    onClick={() => fileInput.current.click()}
                />
                )}
                <p className='preventSelect'  style={{'color': 'gray'}} ><FontAwesomeIcon icon={faArrowUp}/> Click here to select your own picture</p>
            </div>
            <div className='szoveg'>
                <input 
                type="text" 
                placeholder='Name your post' 
                onFocus={(e) => e.target.placeholder=''} 
                onBlur={(e) => e.target.placeholder='Name your post'}
                name='Title'
                defaultValue={title} 
                id='Title' 
                onChange={(e) => setTitle(e.target.value)} 
                required
            />
                <textarea 
                placeholder='Your content goes here...' 
                onFocus={(e) => e.target.placeholder=''} 
                onBlur={(e) => e.target.placeholder='Your content goes here...'}
                name='Content'
                defaultValue={content} 
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
                    {links.map((categ) => (
                    <div className="menu-item preventSelect" key={categ.name} onClick={() => {
                        handleIconChange(categ.iconName, categ.name);
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
    );
}

export default EditPost;