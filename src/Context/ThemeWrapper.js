import { useEffect } from 'react';
import { useTheme } from './ThemeContext'; 

const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("Current theme:", theme);
    const root = document.documentElement;  
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return children;
};

export default ThemeWrapper;
