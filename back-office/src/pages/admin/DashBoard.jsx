import {useContext, useEffect} from "react";
import {AdminContext} from "../../context/AdminContext.jsx";
import {assets} from "../../assets/assets.js";
import {AppContext} from "../../context/AppContext.jsx";
const DashBoard=()=>{
    const{adminToken,dashData,getDashBoardData,cancelAppointment}=useContext(AdminContext);
    const {slotDateFormat}=useContext(AppContext);
    useEffect(() => {
        if (adminToken)getDashBoardData()
    }, [adminToken]);
 return dashData && (
     <div className="m-5">
         <div className="flex flex-warp gap-4">
             <div className="flex items-center gap-2 bg-white p-3 min-w-52 rounded border-2 shadow-custom-light
                    cursor-pointer hover:scale-105 transition-all duration-500">
                 <img className="w-14" src={assets.doctor_icon} alt="Doctor Icon"/>
                 <div>
                     <p className="text-xl font-semibold text-gray-600 my-1">{dashData.data.doctors}</p>
                     <p className="text-gray-400">Doctors</p>
                 </div>
             </div>
             <div className="flex items-center gap-2 bg-white p-3 min-w-52 rounded border-2 shadow-custom-light
                    cursor-pointer hover:scale-105 transition-all duration-500">
                 <img className="w-14" src={assets.appointments_icon} alt="Doctor Icon"/>
                 <div>
                     <p className="text-xl font-semibold text-gray-600 my-1">{dashData.data.appointments}</p>
                     <p className="text-gray-400">Appointments</p>
                 </div>
             </div>
             <div className="flex items-center gap-2 bg-white p-3 min-w-52 rounded border-2 shadow-custom-light
                    cursor-pointer hover:scale-105 transition-all duration-500">
                 <img src={assets.patients_icon} alt="Doctor Icon"/>
                 <div>
                     <p className="text-xl font-semibold text-gray-600 my-1">{dashData.data.patients}</p>
                     <p className="text-gray-400">Patients</p>
                 </div>
             </div>
         </div>

         <div className="bg-white shadow-custom-light">
             <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
                <img src={assets.list_icon} alt="List_Icos"/>
                 <p className="font-semibold">Latest Booking Appointments</p>
             </div>
             <div className="pt-4 border border-t-0 cursor-pointer ">
                 {dashData.data.appointmentsList.map((appointments,index)=>(
                     <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 hover:scale-110 transition-all duration-500 ">
                         <img className="rounded-full w-10 bg-primary" src={appointments.docData.image} alt=""/>
                         <div className="flex-1 text-sm hover:text-white ">
                             <p className="text-gray-800 font-medium">{appointments.docData.name}</p>
                             <p className="text-gray-800">{slotDateFormat(appointments.slotDate)}  {appointments.slotTime}</p>
                         </div>
                         {appointments.cancelled?<p className="text-red-400 text-xs font-medium uppercase">Cancelled</p>:
                             <img src={assets.cancel_icon}
                                  className="w-10 cursor-pointer
                              transition-all
                             duration-500" alt="Canell button" onClick={()=>cancelAppointment(appointments._id)}/>}
                     </div>
                 ))}
             </div>
         </div>

     </div>
 )
}
export default DashBoard