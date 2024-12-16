import {createContext, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const AdminContext=createContext(null);

const AdminContextProvider=(props)=>{
    const [adminToken,setAdminToken]=useState(localStorage.getItem('adminToken')?localStorage.getItem('adminToken'):'');
    const backEndUrl=import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors]=useState([]);
    const [appointments,setAppointments]=useState([]);
    const [dashData,setDashData]=useState(false);
    const fetchAllDoctors=async ()=>{
        try{
            const {data}=await axios.get(`${backEndUrl}/api/v1/admin`,{headers: {Authorization: adminToken}});
            if(data.success){
                setDoctors(data['data'])
                console.log(data['data']);
            }else {
                toast.error(data.message)
            }

        }catch (error){
            toast.error(error)
        }
    }
    // get All Appointment function
    const appointmentList=async ()=>{
        try{
            const {data}=await axios({
                url:`${backEndUrl}/api/v1/admin/appointments`,
                method:"get",
                headers:{Authorization: adminToken}
            });
                if(data.success){
                console.log(data);
                setAppointments(data.data);

            }
        }catch (error){
            console.log(error.response.message);
            toast(error.response.message,{type:"error"})
        }
    }
    const changeAvailability=async (docId)=>{
        try{
            const {data}=await axios.patch(`${backEndUrl}/api/v1/admin/doctor/${docId}`,{},{headers: {Authorization: adminToken}});
            if(data.success){
                    await fetchAllDoctors();
                data.availability?toast.success("Doctor now available"):toast.warning("Doctor now not available");
            }
        }catch (error){
            console.log(error)
            toast.error(error.message);
        }
    }
    const cancelAppointment=async (appointmentId)=>{
        try{
            const {data}=await axios({
                url:`${backEndUrl}/api/v1/admin/appointments`,
                method:"patch",
                headers:{Authorization:adminToken},
                data:{appointmentId}
            })
            if(data.success){
                toast(data.message,{type:"success"});
                appointmentList();
            }
        }catch (error){
            toast(error.response.message,{type:"success"});
        }
    }

    // Get Admin DashBoard Data form Backend API
    const getDashBoardData=async ()=>{
        try{
            const {data}=await axios({
                url:`${backEndUrl}/api/v1/admin/dashboard`,
                method:"get",
                headers:{Authorization:adminToken}
            })
            if(data.success){
                setDashData(data);
                console.log(data);
            }else {
                toast(data.message,{type:"error"})
            }
        }catch (e) {
            console.log(e)
        }

    }
    const value={
        adminToken,setAdminToken,backEndUrl,
        fetchAllDoctors,doctors,
        changeAvailability,appointmentList,
        appointments,setAppointments,dashData,setDashData, getDashBoardData,cancelAppointment
    }
 return(
     <AdminContext.Provider value={value}>
         {/* eslint-disable-next-line react/prop-types */}
         {props.children}
     </AdminContext.Provider>

 )
}
export default AdminContextProvider;
