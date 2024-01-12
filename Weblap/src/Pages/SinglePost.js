import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OnePost from '../Components/OnePost';
import { useParams } from "react-router-dom";

const App = () => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setItem([]);
      try {
        const response = await axios.get(`https://localhost:7272/api/Posts/${param.id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        });
        setItem(response.data);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    
    })();
  }, [param.id]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : item.length !== 0 ? (
        <OnePost postData={item} singular={true}/>
      ) : (
        <p>No posts found with this ID.</p>
      )}
    </div>
  );
}

export default App;