import {createContext, useState} from "react";
export const AdminContext=createContext(null);

const AdminContextProvider=(props)=>{
    const [adminToken,setAdminToken]=useState(localStorage.getItem('adminToken')?localStorage.getItem('adminToken'):'');
    const backEndUrl=import.meta.env.VITE_BACKEND_URL;
    const value={
            adminToken,setAdminToken,backEndUrl
    }
 return(
     <AdminContext.Provider value={value}>
         {props.children}
     </AdminContext.Provider>

 )
}
export default AdminContextProvider;
