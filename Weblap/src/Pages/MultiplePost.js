import React, {useContext, useState, useEffect, Suspense, lazy } from 'react';
import '../Style/Main.css';
import axios from 'axios';


import { DataContext } from '../Components/CategoriesContext';


const OnePost = lazy(() => import('../Components/OnePost'));

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const categories = useContext(DataContext);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get(`https://localhost:7272/APi/posts?pageNum=${page}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
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
