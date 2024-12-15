import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";
import {Bounce, toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
function MyAppointments() {
    const {token,backEndUrl}=useContext(AppContext);
    const [appointments,setAppointments]=useState([]);
    const months=[" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","sep","Oct","Nov","Dec"];
    const location = useLocation();
    const navigate=useNavigate();
    // Extract Order ID from query string
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("token");
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
    const cancelAppointment=async (appointmentId)=>{
        try{
            await axios.patch(`${backEndUrl}/api/v1/user/appointment`,{appointmentId},{headers:{Authorization:`Bearer ${token}`}});
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
    const handlePayment = async (appointmentId) => {
        // First we Need to Create PayPal Order (Payment)
        try{
        const {data}=await axios.post(`${backEndUrl}/api/v1/user/appointment/create-payment`
            ,{appointmentId},
            {headers:{Authorization:`Bearer ${token}`}})
            console.log(data)
            if (data.success) {
                window.location=data.approval_url; // redirect user to Paypal page to Pay
            } else{
                console.log(data.message)
                toast("Failed to initiate payment. Please try again.",{type:"error"});
            }
        }catch (error){
            console.log(error)
            toast(error,{type:"error"})
        }

    }
    // Capture Order Id to check if the order Completed or Canceled
  const capturePayment = async () => {
            try {
                const {data} = await axios.post(`${backEndUrl}/api/v1/user/appointment/capture-payment/${orderId}`,
                    {},{headers:{Authorization:`Bearer ${token}`}})
                    if(data.success){
                    toast("Payment Successes",{type:"success"});
                    navigate('/myAppointments');
                    getUserAppointment();
                }else {
                        toast("Payment Canceled",{type:"warning"})
                    }
            } catch (error) {
                toast( error.response.data,{type:"error"})
            }
        };

    useEffect(() => {
            if (orderId) {
                capturePayment();
            }
        }, [orderId]);


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
                <div className="flex flex-col gap-2 justify-end">
                    {!item.cancelled &&  <button onClick={()=>handlePayment(item._id)}
                                                 className={item.payment?"text-sm text-stone-500 text-center" +
                                                     " sm:min-w-48 py-2 border rounded bg-green-500 text-white":"text-sm" +
                                                     " text-stone-500 text-center sm:min-w-48 py-2 border rounded bg-primary text-white"}>
                        {item.payment? "Appointment Booked ":"Booked Online"}</button>}
                    {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500">Cancel Appointment </button>}
                    {item.cancelled && !item.payment && <button  className="text-sm text-white
                    bg-red-600 text-center sm:min-w-48 p-3 border rounded cursor-not-allowed">Appointment Canceled</button> }
                </div>
            </div>
        ))}
      </div>
    </div>

  )
}

export default MyAppointments