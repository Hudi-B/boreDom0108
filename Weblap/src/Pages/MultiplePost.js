import React, { useState, useEffect, Suspense, lazy } from 'react';
import '../Style/Main.css';
import defaultImage from '../defaultimage.jpg';
import axios from 'axios';


const OnePost = lazy(() => import('../Components/OnePost'));

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(`http://localhost:7272/APi/posts?pageNum=${page}`);
    const data = await response.data;
    setItems(prevItems => [...prevItems, ...data]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      {items.map(item => (
        <Suspense fallback={<div>Loading...</div>}>
          <OnePost postData={item} />
        </Suspense>
      ))}
      {isLoading && <div>Loading more items...</div>}
    </div>
  );
};

export default App;
