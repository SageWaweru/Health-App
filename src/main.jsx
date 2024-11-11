import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  
import App from './App';
import { ThemeProvider } from './Context/ThemeContext';  
import ThemeWrapper from './Context/ThemeWrapper';   

createRoot(document.getElementById('root')).render(
  <div >
    <StrictMode >
      <ThemeProvider >
        <ThemeWrapper>  
          <App />
        </ThemeWrapper>
      </ThemeProvider>
    </StrictMode>
  </div>
);

