import {useContext, useEffect} from "react";
import {AdminContext} from "../../context/AdminContext.jsx";

const DocLists=()=>{
    const {doctors,adminToken,fetchAllDoctors,changeAvailability}=useContext(AdminContext);
    useEffect(() => {
        if(adminToken){
            fetchAllDoctors();
        }
    }, [adminToken]);
    return (
        <div className="m-5 max-h-[90vh] overflow-scroll">
            <p className="text-lg font-medium text-primary text-center">All Doctors</p>
            <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6 ">
                {
                    doctors.map((doctor,index)=>(
                        <div key={index}
                             className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer
                         hover:translate-y-[-10px] transition-all
                         duration-500">
                            <img src={doctor.image} alt="Doctor image" className="bg-indigo-50 hover:bg-primary transition-all duration-500 "/>
                            <div className="p-4">
                                <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
                                <p className="text-zinc-600 text-sm font-semibold">{doctor.speciality}
                                </p>
                                <div className="mt-2 flex items-center gap-1 text-sm ">
                                    <label className="flex items-center cursor-pointer relative">
                                        <input value="true"
                                               onClick={()=>changeAvailability(doctor._id)}
                                            type="checkbox" defaultChecked={doctor.available}
                                               className="peer h-5 w-5 cursor-pointer
                                                transition-all
                                                 appearance-none
                                                 rounded shadow hover:shadow-md
                                                  border border-slate-300
                                                  checked:bg-green-500 checked:border-green-500
                                                  " id="check1"/>
                                        <span
                                            className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                             stroke="currentColor" strokeWidth="1">
                                             <path fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"></path>
                                        </svg>
                                        </span>
                                    </label>
                                    <p className="text-zinc-600 text-sm font-semibold">Availability</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default DocLists;