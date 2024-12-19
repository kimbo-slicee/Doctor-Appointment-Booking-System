import {assets} from "../../assets/assets.js";
import {useContext, useEffect} from "react";
import {DoctorContext} from "../../context/DoctorContext.jsx";
import {AppContext} from "../../context/AppContext.jsx";

const DoctorAppointments=()=>{
    const {doctorToken,getAllDoctorAppointments,appointments,setAppointments}=useContext(DoctorContext);
    const {calcAge,slotDateFormat ,currency}=useContext(AppContext);
    useEffect(() => {
        if(doctorToken) getAllDoctorAppointments()
    }, [doctorToken]);
    return appointments && (
            <div className="w-full max-w-6xl m-5 items-center">
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
                             className="cursor-grab hover:scale-110  flex flex-wrap justify-between max-sm:gap-2 sm:grid  sm:grid-cols-[0.5fr_1fr_1fr_1fr_2fr_2fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-zinc-200 transition-all duration-500">
                            <p className="max-sm:hidden">{index+1}</p>
                            <div className="flex items-center gap-2">
                                <img className="rounded-full w-10"  src={appointment.userData.image} alt="Profile Image"/>
                            </div>
                            <p className={!appointment.payment?"text-md font-semibold text-white bg-primary inline" +
                                " border border-primary rounded-full" +
                                " w-fit px-4":"w-fit px-4 text-md font-semibold rounded-full text-white border" +
                                " bg-green-500" +
                                " border-green-500" +
                                " inline"}>
                                {appointment.payment?"Online":"Cash"}
                            </p>
                            <p className="max-sm:hidden ">{calcAge( appointment.userData.dob)}</p>
                            <p>{(appointment.slotDate)}, {appointment.slotTime} PM</p>
                            <div className="flex items-center gap-2">
                                <img className="w-8 rounded-full bg-primary" src={appointment.docData.image} alt="Doctor Image"/>{appointment.docData.name}
                            </div>
                            <p >{currency} {appointment.amount}</p>
                            <div className="flex flex-row ">
                                <img  src={assets.cancel_icon} className="w-10 cursor-pointer" />
                                <img  src={assets.tick_icon} className="w-10 cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

    )
}
export default DoctorAppointments