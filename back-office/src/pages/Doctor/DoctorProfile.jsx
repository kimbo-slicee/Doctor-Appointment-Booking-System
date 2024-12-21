import React, {useContext, useEffect} from 'react';
import {DoctorContext} from "../../context/DoctorContext.jsx";
import {AppContext} from "../../context/AppContext.jsx";
import {assets} from "../../assets/assets.js";

const DoctorProfile = () =>{
const{getDoctorData,doctorToken,doctorData,loading}=useContext(DoctorContext);
const {currency}=useContext(AppContext)
    useEffect(() => {
        if(doctorToken) {
            getDoctorData()
            // toast("You Can UPDATE or DELETE YOUR PROFILE here 👇",{type:"info",autoClose:8000})
        }
    }, [doctorToken]);
return doctorData && (
    <div>
        <div className="flex flex-col gap-4 m-5 border border-stone-100 rounded-lg p-8 py-7 bg-white shadow-custom-light">
                    <div>
                    <img className="bg-primary/80 w-full sm:max-w-64 rounded-lg " src={doctorData.image} alt="doctor Data "/>
                    </div>
            <div className="flex-1 ">
                {/*    ------------ Doc Info : name , degree , experience-----------------------------*/}
                <p className="flex items-center gap-2 text-3xl font-medium text-gray-700  ">Dr. {doctorData.name}</p>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                    <p>{doctorData.degree}-{doctorData.speciality}</p>
                    <button className="py-0.5 px-2 border text-xs rounded-full">{doctorData.experience}</button>
                </div>
                {/*------------------------Doctor About Dev----------------------*/}
                <div>
                    <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3 ">About:</p>
                    <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                        {doctorData.about}
                    </p>
                </div>
                <p className="text-gray-600 font-medium mt-4 ">
                    Appointment Fee :<span className="text-gray-800">{currency} {doctorData.fess}</span>
                </p>
                <div className="flex flex-col gap-2 py-2 ">
                    <p className="">Address:</p>
                    <p className="text-sm ">
                        {JSON.parse(doctorData.address).line1}
                        <br/>
                        {JSON.parse(doctorData.address).line2}
                    </p>
                </div>
                <div className="flex gap-1.5 pt-2 ">
                    <input type="checkbox" name="" id="avilibality" checked={doctorData.available}/>
                    <label htmlFor="avilibality">Available</label>
                </div>
                <button class="text-xl mt-3 w-32 h-10 rounded-full border border-zinc-600 bg-white text-zinc-600 relative overflow-hidden group z-10 hover:border-white hover:text-white duration-1000">
                    <span class="absolute bg-primary w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                    <span class="absolute bg-primary w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                    Edite Profile
                </button>

            </div>
        </div>

    </div>
)

}

export default DoctorProfile;