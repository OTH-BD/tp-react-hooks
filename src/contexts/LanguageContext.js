import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useProductSearch";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage("language","en"); 


  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };


  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;