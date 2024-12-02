import React, {useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {AppContext} from "../context/AppContextProvider.jsx";
import {assets} from "../assets/assets.js";
import RelatedDoctors from "../components/RelatedDoctors.jsx";

function Appointment() {
  const {doctors,currencySymbol}=useContext(AppContext);
  const {docId}=useParams()
  const [docInfo,setDocInfo]=useState(null);
  const [docSlots,setDocSlots]=useState([]);
  const [slotIndex,setSlotIndex]=useState(0);
  const [slotTime,setSlotTime]=useState('')
  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
  const fetchInfo=async ()=>{
    const docInfo=doctors.find(doc=>doc._id===docId);
    setDocInfo(docInfo);
  }
  const getAvailableSlots= async ()=>{
      setDocSlots([])
      // getting current Date
      let today=new Date();
      for (let i=0 ; i <7 ; i++){
          // getting the next seven days using index
          let currentDate=new Date(today);
           currentDate.setDate(today.getDate()+i);// 7 days
          // settings end time of the date with index
          let endTime =new Date();
          endTime.setDate(today.getDate()+i);
          endTime.setHours(24,0,0 ,0 )
          // setting hours
          if(today.getDate()===currentDate.getDate()){
                currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1 : 10);
                currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
          }else {
              currentDate.setHours(10);
              currentDate.setMinutes(0)
          }
          let timeSlots=[];
         while (currentDate < endTime){
         let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
             // add slots to array
             timeSlots.push({
                 dateTime:new Date(currentDate),
                 time:formattedTime,
             })
             // Increment time by 30 min
             currentDate.setMinutes(currentDate.getMinutes()+30 );
         }
         setDocSlots((prev)=>([...prev,timeSlots]))

  }
  }
    useEffect(() => {
        fetchInfo();
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
            <p className="text-gray-500 font-medium mt-4 ">Appointment fee : <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span></p>
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
                       onClick={()=>setSlotTime(items.time)}
                       className={`text-sm font-light flex-shrink-0 px-5 py-0 
                       rounded-full cursor-pointer ${items.time===slotTime ? 'bg-primary     text-white':'text-gray-400 ' +
                           ' border' +
                           ' border-gray-400'}`}>
                        {items.time.toLowerCase()}
                    </p>
                  ))}
              </div>
              <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
          </div>
            {/*----------------Listing Related Doctors ----------------*/}
          <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )


}

export default Appointment