import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppContext from "./context/AppContext.jsx";



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AppContext>
        <App />
      </AppContext>
  </BrowserRouter>
)
