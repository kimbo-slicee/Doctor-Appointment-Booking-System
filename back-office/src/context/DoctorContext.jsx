import {createContext, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
// Create Context
export const DoctorContext=createContext(null);
const DoctorContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [doctorToken,setDoctorToken]=useState(localStorage.getItem('doctorToken')?localStorage.getItem('doctorToken'):'');
    const [appointments,setAppointments]=useState([]);
    const [loading,setLoading]=useState(false);
    const [docDashData,setDocDashData]=useState(false);
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
                setAppointments(data.doctorAppointments.reverse());
            }
        }catch (error){
            console.log(error)
            setLoading(false);
        }
    }
    //Doctor Complete Appointment Function
    const completeAppointment=async (appointmentId)=>{
        setLoading(true);
        try{
            const {data}=await axios({
                url:`${backendUrl}/doctor/dashboard`,
                method:"patch",
                headers:{Authorization:doctorToken},
                data:{appointmentId}
            });
            if(data.success){
                setLoading(false);
                console.log(data);
                getAllDoctorAppointments();
                toast(data.message,{type:"success"});
            }
        }catch (error){
            console.log(error)
            toast(error.response?.data.message,{type:"error"})
        }

    }
    const cancelAppointment=async (appointmentId)=>{
        setLoading(true);
        try{
            const {data}=await axios({
                url:`${backendUrl}/doctor/dashboard`,
                method:"put",
                headers:{Authorization:doctorToken},
                data:{appointmentId}
            });
            if(data.success){
                setLoading(false);
                getAllDoctorAppointments();
                toast(data.message,{type:"success"});
            }
        }catch (error){
            setLoading(false)
            toast(error.response?.data.message,{type:"error"})
        }

    }

    const getDashBoardData=async ()=>{
    setLoading(true)
        try{
            const {data} = await axios({
                url: `${backendUrl}/doctor/dashboard/details`,
                method: "get",
                headers: {Authorization: doctorToken}
            })
            if (data.success) {
                setLoading(false)
                setDocDashData(data);
                console.log(data)
            }
        }catch(error){
        setLoading(false)
        toast(error.response?.data.message,{type:"error"})
        console.log(error)
        }
    }

    const value={
        doctorToken,setDoctorToken,backendUrl,
        getAllDoctorAppointments,appointments,setAppointments,loading,
        completeAppointment,cancelAppointment, getDashBoardData,docDashData
    }
    return(
        <DoctorContext.Provider value={value}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider;