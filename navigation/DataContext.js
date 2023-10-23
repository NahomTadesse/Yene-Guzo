import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [ condata, setData] = useState([]);

  const addData = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{  condata, addData }}>
      {children}
    </DataContext.Provider>
  );
};