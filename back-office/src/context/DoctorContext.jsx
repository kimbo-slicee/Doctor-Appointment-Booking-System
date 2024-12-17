import {createContext, useState} from "react";
// Create Context
export const DoctorContext=createContext(null);
const DoctorContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [doctorToken,setDoctorToken]=useState(localStorage.getItem('doctorToken')?localStorage.getItem('doctorToken'):'');

    const value={
        doctorToken,setDoctorToken,backendUrl
    }
    return(
        <DoctorContext.Provider value={value}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider;