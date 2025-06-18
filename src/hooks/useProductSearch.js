import { useState, useEffect, useCallback } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebouncedValue(value)
    },delay);

    return()=>{
      clearTimeout(handler);
    };
  },[value,delay]);
  return debouncedValue;
};
export const useLocalStorage = (key,initialValue) => {
  const[storedVal, setStoredVal] = useState(()=>{
    try{
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }catch(error){

      console.warn('Error reading from local storage',error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try{
      const valueToStore = value instanceof Function ? value(storedVal) : value;
      setStoredVal(valueToStore);
      window.localStorage.setItem(key,JSON.stringify(valueToStore));
    }catch(error){
      console.warn('Error writing to local storage',error);
    }
  };
  return [storedVal,setValue];
};

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; 
  
const fetchProducts = useCallback(async () => {
  const skip = (currentPage - 1) * itemsPerPage;
  const url = `https://api.daaif.net/products?skip=${skip}&limit=${itemsPerPage}&delay=1000`;

  setLoading(true);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur réseau');
    const data = await response.json();
    setProducts(data.products);
    setTotalPages(Math.ceil(data.total / itemsPerPage));
  } catch (err) {
    setError(err.message);
    setLoading(false);
  } finally {
    setLoading(false);
  }
},[currentPage,itemsPerPage]);

const nextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
};

const previousPage = () => {
  if (currentPage > 1) {
    setCurrentPage((prevPage) => prevPage - 1);
  }
};

useEffect(() => {
  fetchProducts();
}, [fetchProducts]);

const reload = () =>{
  fetchProducts();
};

  return { 
    products, 
    loading, 
    error,
    reload,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
  };
};

export default useProductSearch;