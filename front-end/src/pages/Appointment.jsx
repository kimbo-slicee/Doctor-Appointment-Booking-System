import React, {useContext, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {AppContext} from "../context/AppContext.jsx";
import {assets} from "../assets/assets.js";
import RelatedDoctors from "../components/RelatedDoctors.jsx";
import {toast} from "react-toastify";
import axios from "axios";

function Appointment() {
  const {doctors,currencySymbol,getAllDoctors,token,backEndUrl,userData}=useContext(AppContext);
  const {docId}=useParams()
  const [docInfo,setDocInfo]=useState(null);
  const [docSlots,setDocSlots]=useState([]);
  const [slotIndex,setSlotIndex]=useState(0);
  const [slotTime,setSlotTime]=useState('')
  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const navigate=useNavigate();
  const fetchInfo=async ()=>{
    const docInfo=await doctors.find(doc=>doc._id===docId);
    setDocInfo(docInfo);
  }
    const getAvailableSlots= async ()=> {
      setDocSlots([])// Doctor Slots, One Slots Had Daya and Time
      let today=new Date();// this is the Current daya and I us it as Reference
      for (let i=0 ; i <7 ; i++){
          let currentDate=new Date(today);
          // getting the next seven days using index
           currentDate.setDate(today.getDate()+i);// 7 days
          // settings end time of the date with index
          let endTime =new Date();
          endTime.setDate(today.getDate()+i);
          endTime.setHours(16,0,0 ,0 )// get The time of the Day in 24h format
          // setting hours
          if(today.getDate()===currentDate.getDate()){
              // check day is today
                currentDate.setHours(currentDate.getHours()>=9?currentDate.getHours() : 9);
                currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
          }else {
              currentDate.setHours(9);
              currentDate.setMinutes(0)
          }
         let timeSlots=[];
         while (currentDate < endTime){
         let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
         let day=currentDate.getDate();
         let month=currentDate.getMonth() + 1;
         let year=currentDate.getFullYear()
         let slotDate=`${day}_${month}_${year}`;
         const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime)?false:true
         if(isSlotAvailable){
             // add slots to array
             timeSlots.push({
                 dateTime:new Date(currentDate),
                 time:formattedTime,
             })
         }
         // Increment time by 30 min
             currentDate.setMinutes(currentDate.getMinutes()+30 );
         }
         setDocSlots((prev)=>([...prev,timeSlots]))

  }

  }
    const bookNewAppointment=async ()=>{
        if(!token){
            toast("Login To Book Appointment",{
                type:"info",
                position:"top-center",
                delay:8000
            })
            return navigate('/login');
        }
        try{
            const date  =docSlots[slotIndex][0].dateTime;
            let day =date.getDay();
            let month=date.getMonth();
            let year=date.getFullYear();
            const slotDate=`${day}_${month}_${year}`;
            const {data}=await axios.post(`${backEndUrl}/api/v1/user/appointment`,{docId,slotDate,slotTime,userData},{headers: {Authorization: `Bearer ${token}`}});
            console.log(data);
            if(data.success){
                getAllDoctors();
                navigate('/myAppointments');
                toast(data.message,{type:"success"});
            }else{
                console.log(data.message);
                toast(data.message,{type:"info"});
            }
        }catch (error){
                toast(error.message,{type:"error"});
                console.log(error.message);
        }
    }
    useEffect(() => {
        fetchInfo();
        console.log(doctors);
    }, [doctors,docId]);

     useEffect(() => {
         getAvailableSlots();
     }, [docInfo]);

     useEffect(() => {
         }, [docSlots]);


  return docInfo &&  (
      <div>
        {/*-----------Doctor Details----------*/}
        <div className="flex flex-col sm:flex-row gap-4 ">
        <div >
          <img className="bg-primary w-full sm:max-w-72 rounded-lg"  src={docInfo.image} alt="doctor Image "/>
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0">
        {/*----------------Doc info: name,degree , experience...   */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{docInfo.name}
          <img src={assets.verified_icon}
          alt=""/></p>
          <div className="flex items-center gap-2 text-sm-mt-1 text-gray-600">
             <p>{docInfo.degree}-{docInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>
          {/*-----------Doctor about ------------*/}
          <div >
           <p className="flex items-center gap-2 text-sm font-medium text-gray-900 mt-3">About <img src={assets.info_icon}  alt=""/></p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>
            <p className="text-gray-500 font-medium mt-4 ">Appointment fee : <span className="text-gray-600">{currencySymbol}{docInfo.fess}</span></p>
        </div>
      </div>
          {/*----------------Booking Slots--------------*/}
          <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 ">
            <p>Booking Slots</p>
              <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                  {docSlots.length && docSlots.map((docSlot,index) => (
                      <div
                      onClick={()=>setSlotIndex(index)}
                      key={index}
                      className={`text-center py-6 min-w-16 rounded-full cursor-pointer 
                      ${slotIndex===index ? 'bg-primary text-white':'border border-gray-400'}`}>
                        <p>{docSlot[0] && daysOfWeek[docSlot[0].dateTime.getDay()]}</p>
                          <p>{docSlot[0] && docSlot[0].dateTime.getDate()}</p>
                      </div>
                  ))}
              </div>
              <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 ">
                  {docSlots.length && docSlots[slotIndex].map((items,index)=>(
                    <p key={index}
                       onClick={()=> {
                           setSlotTime(items.time)
                           console.log(slotTime);
                       }}
                       className={`text-sm font-light flex-shrink-0 px-5 py-0 
                       rounded-full cursor-pointer ${items.time===slotTime ? 'bg-primary text-white':'text-gray-400 ' +
                           ' border' +
                           ' border-gray-400'}`}>
                        {items.time.toLowerCase()}
                    </p>
                  ))}
              </div>
              <button onClick={bookNewAppointment} className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
          </div>
            {/*----------------Listing Related Doctors ----------------*/}
          <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )


}

export default Appointment