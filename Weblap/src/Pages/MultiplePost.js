import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OnePost from '../Components/OnePost';
import { useParams } from "react-router-dom";


const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams();


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setItems([]);
  
      const url = param.category
        ? `https://localhost:7272/APi/posts/category/${param.category}`
        : 'https://localhost:7272/APi/posts';
  
      try {
        const response = await axios.get(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
        setItems(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [param.category]);
  
  

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : items.length > 0 ? (
        items.map(item => <OnePost key={item.id} postData={item} singular={false} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default App;
