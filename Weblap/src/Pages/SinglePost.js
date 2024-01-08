import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OnePost from '../Components/OnePost';
import { useParams } from "react-router-dom";


const App = () => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = useParams();
console.log(param);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    setItem([]); // Clear the items state
  
  console.log()

    try {
      const response = await axios.get(`https://localhost:7272/api/Posts/${param.id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
      setItem(response.data); // Assuming the data is an array of items
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
      ) : item !== null ? (
        <OnePost postData={item} singular={true}/>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default App;
