import React, { useContext, useEffect, useState} from 'react';
import { ThemeContext } from '../App';
import {useDebounce} from '../hooks/useProductSearch';
import { LanguageContext } from '../contexts/LanguageContext';
const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const {language} = useContext(LanguageContext);
  const placeholderText = {
    fr:"Rechercher un produit...",
    en:"Search for a product...",
    de:"Suchen Sie nach einem Produkt",
  };
  const [inpVal, setInpVal] = useState(searchTerm);
  const debouncedValue = useDebounce(inpVal, 2000);

  useEffect(()=>{
    setSearchTerm(debouncedValue);
  }, [debouncedValue,setSearchTerm]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={inpVal}
        onChange={(e) => setInpVal(e.target.value)}
        placeholder={placeholderText[language]}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;