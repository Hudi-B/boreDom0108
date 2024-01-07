import React, { useState, useEffect } from 'react';

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://localhost:7272/api/Categories', {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) { 
          const message = await response.text();
          throw new Error(message);
        }
        const categories = await response.json();
        setCategories(categories);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
  
    fetchCategories();
  }, []);
  

  return (
    <DataContext.Provider value={categories}>
      {children}
    </DataContext.Provider>
  );
};
