import {useContext, useEffect} from "react";
import {DoctorContext} from "../../context/DoctorContext.jsx";
import {AppContext} from "../../context/AppContext.jsx";
import Spinner from "../../components/Spinner.jsx";
import {BiBadgeCheck} from "@react-icons/all-files/bi/BiBadgeCheck.js";
import {assets} from "../../assets/assets.js";
const DoctorAppointments=()=>{
    const {doctorToken,getAllDoctorAppointments,appointments,cancelAppointment,loading,completeAppointment}=useContext(DoctorContext);
    const {calcAge,slotDateFormat ,currency}=useContext(AppContext);
    useEffect(() => {
        if(doctorToken) getAllDoctorAppointments()
    }, [doctorToken]);
    return appointments && (
            <div className="w-full max-w-6xl m-5 items-center">
                <Spinner
                loading={loading}
                />
           <p className="uppercase text-primary font-semibold my-4 text-center">Doctor Appointments</p>
                <div className="bg-white border rounded text-sm max-h-[80vh]  overflow-y-scroll shadow-custom-light">
                    <div className="hidden font-medium bg-primary text-white sm:grid sm:grid-cols-[0.5fr_1fr_1fr_1fr_2fr_2fr_1fr_1fr] grid-flow-col py-3 px-6 ">
                        <p>#</p>
                        <p>Patient</p>
                        <p>Payment</p>
                        <p>Age</p>
                        <p>Date & Time</p>
                        <p>Doctors</p>
                        <p>Fees</p>
                        <p>Actions</p>
                        <p></p>
                    </div>
                    {appointments.map((appointment, index) => (
                        <div key={index}
                             className="
                              flex flex-wrap justify-between max-sm:gap-2 sm:grid
                                sm:grid-cols-[0.5fr_1fr_1fr_1fr_2fr_2fr_1fr_1fr] items-center
                                text-gray-500 py-3 px-6 border-b hover:bg-zinc-200 transition-all duration-500">
                            <p className="max-sm:hidden">{index+1}</p>
                            <div className="flex items-center gap-2">
                                <img className="rounded-full w-10"  src={appointment.userData.image} alt="Profile Image"/>
                            </div>
                            <div>
                                {appointment.payment
                                    ? <span
                                        className="bg-green-500 rounded-full text-white px-3 py-1 text-xs uppercase font-medium">online</span>
                                    : <span className="bg-indigo-500 rounded-full text-white px-3 py-1 text-xs uppercase font-medium"> cash </span>
                                }
                            </div>
                            <p className="max-sm:hidden ">{calcAge(appointment.userData.dob)}</p>
                            <p>{slotDateFormat(appointment.slotDate)}, {appointment.slotTime} PM</p>
                            <div className="flex items-center gap-2">
                                <img className="w-8 rounded-full bg-primary" src={appointment.docData.image} alt="Doctor Image"/>
                               <p className="flex align-center flex-row gap-1.5 text-zinc-600" > {appointment.docData.name}
                               <span><BiBadgeCheck size="20" color="#5f6FFF" title="Complited Icon" /></span></p>
                            </div>
                            <p >{currency} {appointment.amount}</p>
                            <div className="flex flex-nowrap items-center gap-1.5 ">
                                {/* if an appointment is cancelled we Dont can to complete this appointment if the
                                 appointment is conceder as canceled we don't can to compliant' it but we can deleted  */}
                                {
                                    appointment.cancelled
                                        ? <p className="text-red-400 text-xs font-medium"> Cancelled</p>
                                        : appointment.isCompleted
                                        ? <p className="text-green-500 text-xs font-medium">Completed</p>
                                        :<div className="flex"><img onClick={()=>cancelAppointment(appointment._id)} src={assets.cancel_icon} className="w-10 rounded-full cursor-pointer"/>
                                                <img onClick={()=>completeAppointment(appointment._id)} src={assets.tick_icon} className="w-10 rounded-full cursor-pointer "/></div>

                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

    )
}
export default DoctorAppointments