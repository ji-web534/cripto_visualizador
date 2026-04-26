import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './main.css'
import App from './App.jsx'
import { CryptoProvider } from './components/CryptoProvider.jsx';

createRoot(document.getElementById('root')).render(
  <CryptoProvider>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </CryptoProvider>

)
