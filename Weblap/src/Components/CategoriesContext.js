import React, { useState, useEffect } from 'react';

import axios from 'axios';

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:7272/api/Categories', {
          headers: {
            'Content-Type': 'application/json',
          },
          
          withCredentials: true
        });
        if (!response.data || response.data.length === 0) {
          throw new Error('No data');
        }
        setCategories(response.data);
      } catch (error) {
        console.error("Error while fetching categories!", error);
      }
    })();
    
  }, []);
  

  return (
    <DataContext.Provider value={categories}>
      {children}
    </DataContext.Provider>
  );
};
