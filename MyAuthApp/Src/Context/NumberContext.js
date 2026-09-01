import React, { createContext, useState } from 'react';

export const NumberContext = createContext();

export const NumberProviders = ({ children }) => {
  const [count, setcount] = useState(0);
  const [Anser,setAnser] = useState('')

  return (

    
    <NumberContext.Provider value={{count , setcount,Anser,setAnser}}>
      {children}
    </NumberContext.Provider>
  );
};