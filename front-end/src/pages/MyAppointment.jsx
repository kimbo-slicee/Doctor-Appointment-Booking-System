import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";
import {Bounce, toast} from "react-toastify";



function MyAppointments() {
    const {token,backEndUrl,getAllDoctors}=useContext(AppContext);
    const [appointments,setAppointments]=useState([]);
    const months=[" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","sep","Oct","Nov","Dec"];
    const slotDateFormat=(slotDate)=>{
        const dateArray=slotDate.split('_')
        return dateArray[0]+" "+months[Number(dateArray[1])]+" "+ dateArray[2];
    }
    const getUserAppointment=async ()=>{
        try{
        const {data}= await axios.get(`${backEndUrl}/api/v1/user/appointment`,{headers:{Authorization:`Bearer ${token}`}});
        if(data.success){
            setAppointments(data["data"].reverse());
        }
        }catch (error){
            console.error(error)
            toast(error.message, {type:"error"})
        }
    }
    // Cancel Appointment
    const cancelAppointment=async (appointmentId)=>{
        try{
            const {data}=await axios.patch(`${backEndUrl}/api/v1/user/appointment`,{appointmentId},{headers:{Authorization:`Bearer ${token}`}});
            getUserAppointment();
            toast('Appointment Has been canceled take Another Appointment', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type:"info",
                transition: Bounce,
            });

        }catch (error){
            console.error(error)
        }
    }
    // handle Paypal Payment
    const handlePayment = async () => {

    }
    useEffect(() => {
        if(token){
            getUserAppointment()
        }
    }, [token]);
  return (

    <div>
      <p className="pb-3 mt-12 font-medium text-primary uppercase">My Appointments </p>
      <div>
        {appointments.map((item, index)=>(
            <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
              <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} alt="doc image"/>
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item .docData.name}</p>
                <p>{item.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1 ">Address</p>
                <p className="text-xs">{JSON.parse(item.docData.address).line1}</p>
                <p className="text-xs">{JSON.parse(item.docData.address).line2}</p>
                <p className="text-xs mt-1.5"><span className="text-sm text-neutral-800 font-medium mx-1">Date & Time   :</span>  {slotDateFormat(item.slotDate)} |{item.slotTime}</p>
              </div>
                <div></div>
                <div className="flex flex-col gap-2 justify-end">
                    {!item.cancelled &&  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500" >Pay Online</button>}
                    {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500">Cancel Appointment </button>}
                    {item.cancelled && <button onClick={handlePayment} className="text-sm text-white bg-red-600 text-center sm:min-w-48 p-3 border rounded"> Appointment Has Ben Canceled</button> }
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments