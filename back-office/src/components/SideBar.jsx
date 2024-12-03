import {useContext} from "react";
import {AdminContext} from "../context/AdminContext.jsx";
import {NavLink} from "react-router-dom";
import {assets} from "../assets/assets.js";

const SideBar =()=>{
    const {adminToken}=useContext(AdminContext);

    return (
        <div className="min-h-screen bg-white border-r shadow-custom-light ">
            {
            adminToken && <ul className="text-[#515151] mt-2">
                <NavLink to={'/Dashboard'}
                         className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 
                         md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':'' }`}>
                    <img src={assets.home_icon} alt="Home Icon"/>
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to={'/Appointments'}
                         className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 
                         md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':'' }`}
                >
                    <img src={assets.appointment_icon} alt="Appointment"/>
                    <p>Appointment</p>
                </NavLink>
                <NavLink to={'/AddDoctors'}
                         className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 
                         md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':'' }`}
                >
                    <img src={assets.add_icon} alt="Add New Doctor"/>
                    <p>Add New Doctor</p>
                </NavLink>
                <NavLink to={'/DoctorsList'}
                         className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 
                         md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':'' }`}
                >
                    <img src={assets.people_icon} alt="Doctors List"/>
                    <p>Doctors List</p>
                </NavLink>
            </ul>
            }
        </div>
    )
}
export default  SideBar;