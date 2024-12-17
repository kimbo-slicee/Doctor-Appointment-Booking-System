import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import AppContextProvider from "../src/context/AppContext.jsx"
import AdminContext from "./context/AdminContext.jsx";
import DoctorContextProvider, {DoctorContext} from "./context/DoctorContext.jsx";

createRoot(document.getElementById('root')).render(
     <BrowserRouter>
     <StrictMode>
         <AdminContext>
             <DoctorContextProvider>
                 <AppContextProvider>
                      <App/>
                 </AppContextProvider>
             </DoctorContextProvider>
         </AdminContext>
     </StrictMode>
    </BrowserRouter>
)
