import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import AppContextProvider from "../src/context/AppContext.jsx"
import DoctorContext from "./context/DoctorContext.jsx";
import AdminContext from "./context/AdminContext.jsx";

createRoot(document.getElementById('root')).render(
     <BrowserRouter>
     <StrictMode>
         <AdminContext>
             <DoctorContext>
                 <AppContextProvider>
                      <App/>
                 </AppContextProvider>
             </DoctorContext>
         </AdminContext>
     </StrictMode>
    </BrowserRouter>
)
