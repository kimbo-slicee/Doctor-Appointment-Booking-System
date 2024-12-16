import {useContext, useEffect} from "react";
import {AdminContext} from "../../context/AdminContext.jsx";

const Appointments =()=>{
    const{adminToken,appointmentList,appointments,setAppointments}=useContext(AdminContext);
    useEffect(() => {
        if(adminToken) appointmentList();
    }, [adminToken]);
    return appointments && (
        <div className="w-full max-w-6xl m-5 ">
            <p className="mb-3 text-lg font-light text-center uppercase text-zinc-950 ">All Appointments</p>
            <div className="bg-white border rounded text-sm max-h-[80vh]  overflow-y-scroll shadow-custom-light">
                <div className="hidden font-medium bg-primary text-white sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 ">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Actions</p>
                    <p></p>
                </div>
            {appointments.map((appointment, index) => (
                <div key={index}
                     className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-zinc-200 transition-all duration-500">
                    <p className="max-sm:hidden">{index+1}</p>
                    <div className="flex items-center gap-2">
                        <img className="rounded-full w-8"  src={appointment.userData.image} alt="Profile Image"/>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
export default Appointments