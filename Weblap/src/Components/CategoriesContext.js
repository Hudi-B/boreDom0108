import React, { useState, useEffect } from 'react';

import axios from 'axios';

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {

    axios.get('https://localhost:7272/api/Categories', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
    .then(response => {
      console.log(response.data);
      setCategories(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <DataContext.Provider value={categories}>
      {children}
    </DataContext.Provider>
  );
};
