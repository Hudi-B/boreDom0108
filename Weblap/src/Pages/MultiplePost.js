import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OnePost from '../Components/OnePost';
import { useParams } from "react-router-dom";


const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();


  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    setItems([]); // Clear the items state
  
  
    const url = param.category ? 
    `https://localhost:7272/APi/posts/category/${param.category}` : 
    'https://localhost:7272/APi/posts';

    try {
      const response = await axios.get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
      setItems(response.data); // Assuming the data is an array of items
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  
  };

  useEffect(() => {
    fetchData();
  }, [param.category]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : items.length > 0 ? (
        items.map(item => <OnePost postData={item} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default App;
