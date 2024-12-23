import {useContext} from "react";
import {AdminContext} from "../context/AdminContext.jsx";
import {assets} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";
import {DoctorContext} from "../context/DoctorContext.jsx";

export const NavBar = () => {
    const {adminToken,setAdminToken}=useContext(AdminContext);
    const {doctorToken,setDoctorToken}=useContext(DoctorContext)
    const logout=()=>{
        adminToken && setAdminToken('');
        adminToken && localStorage.removeItem('adminToken')
        doctorToken && setDoctorToken('');
        doctorToken && localStorage.removeItem('doctorToken')

    }
    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
            <div className="flex items-center gap-2 text-sx">
                <img className="w-36 sm:w-40 cursor-pointer" src={assets.admin_logo} alt=""/>
                <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">{adminToken ? "Admin" : "Doctor"}</p>
            </div>
            <button onClick={logout} className="bg-primary text-white text-sm px-10 py-2 rounded-full">{adminToken || doctorToken ?'Logout':'Login'}</button>
        </div>
    )
}