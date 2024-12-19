import {createContext, useState} from "react";
import axios from "axios";
// Create Context
export const DoctorContext=createContext(null);
const DoctorContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [doctorToken,setDoctorToken]=useState(localStorage.getItem('doctorToken')?localStorage.getItem('doctorToken'):'');
    const [appointments,setAppointments]=useState([]);
    const [loading,setLoading]=useState(true);
    // Get All Doctor Appointments Using Doctor API
    const getAllDoctorAppointments=async ()=>{
        setLoading(true);
        try {
            const {data}=await axios({
                url:`${backendUrl}/doctor/dashboard`,
                method:"get",
                headers:{Authorization:doctorToken}
            })
            if(data.success){
                setLoading(false);
                setAppointments(data.doctorAppointments)
                console.log(data.doctorAppointments)
            }
        }catch (error){
            console.log(error)
            setLoading(false);
        }
    }
    const value={
        doctorToken,setDoctorToken,backendUrl,
        getAllDoctorAppointments,appointments,setAppointments,loading
    }
    return(
        <DoctorContext.Provider value={value}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider;