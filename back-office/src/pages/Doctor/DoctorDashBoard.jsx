import {useContext, useEffect} from "react";
import {DoctorContext} from "../../context/DoctorContext.jsx";
import {assets} from "../../assets/assets.js";
import {AppContext} from "../../context/AppContext.jsx";
import Spinner from "../../components/Spinner.jsx";

const DoctorDashBoard=()=>{
    const {currency,calcAge,slotDateFormat}=useContext(AppContext);
    const {doctorToken,getDashBoardData,loading,docDashData,cancelAppointment,completeAppointment}=useContext(DoctorContext);
    useEffect(()=>{
        if(doctorToken) getDashBoardData()
    },[doctorToken])
    return docDashData ?(
        <div className="m-5">

            <div className="flex flex-warp gap-4">
                <div className="flex items-center gap-2 bg-white p-3 min-w-52 rounded border-2 shadow-custom-light
                    cursor-pointer hover:scale-105 transition-all duration-500">
                    <img className="w-14" src={assets.earning_icon} alt="Doctor Icon"/>
                    <div>
                        <p className="text-xl font-semibold text-gray-600 my-1">{currency}{docDashData.data.docWallet}</p>
                        <p className="text-gray-400">Earnings</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 min-w-52 rounded border-2 shadow-custom-light
                    cursor-pointer hover:scale-105 transition-all duration-500">
                    <img className="w-14" src={assets.appointments_icon} alt="Doctor Icon"/>
                    <div>
                        <p className="text-xl font-semibold text-gray-600 my-1">{docDashData.data.appointmentsList}</p>
                        <p className="text-gray-400">Appointments</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 min-w-52 rounded border-2 shadow-custom-light
                    cursor-pointer hover:scale-105 transition-all duration-500">
                    <img src={assets.patients_icon} alt="Doctor Icon"/>
                    <div>
                        <p className="text-xl font-semibold text-gray-600 my-1">{docDashData.data.patientsList}</p>
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
                    {docDashData.data.lastAppointments.map((appointments, index) => (
                        <div key={index}
                             className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 hover:scale-110 transition-all duration-500 ">
                            <img className="rounded-full w-10 bg-primary" src={appointments.userData.image} alt=""/>
                            <div className="flex-1 text-sm hover:text-white ">
                                <p className="text-gray-800 font-medium">{appointments.userData.name}</p>
                                <p className="text-gray-800 font-medium">{calcAge(appointments.userData.dob)}</p>
                                <p className="text-gray-800 font-medium">{appointments.userData.phone}</p>
                                <p className="text-gray-800">{slotDateFormat(appointments.slotDate)} {appointments.slotTime}</p>
                            </div>
                            <div>
                                {
                                    appointments.cancelled
                                        ? <p className="text-red-400 text-xs font-medium"> Cancelled</p>
                                        : appointments.isCompleted
                                            ? <p className="text-green-500 text-xs font-medium">Completed</p>
                                            :<div className="flex"><img onClick={()=>cancelAppointment(appointments._id)} src={assets.cancel_icon} className="w-10 rounded-full cursor-pointer"/>
                                                <img onClick={()=>completeAppointment(appointments._id)} src={assets.tick_icon} className="w-10 rounded-full cursor-pointer "/></div>

                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    ):<Spinner loading={loading}/>
}
export default DoctorDashBoard