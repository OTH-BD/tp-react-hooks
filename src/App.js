import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';


export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");




  return (
    <LanguageProvider>
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      
      <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
        <header className="my-4">
          <h1 className="text-center">Catalogue de Produits</h1>
          <div className="d-flex justify-content-end gap-2">
            <ThemeToggle />
            <LanguageSelector/>
          </div>
        </header>
        <main>
          <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <ProductList searchTerm={searchTerm}/>
        </main>
      </div>
    </ThemeContext.Provider>
    </LanguageProvider>

  );
};

export default App