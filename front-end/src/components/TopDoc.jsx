 import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";

function TopDoc() {
    const navigateFunction=useNavigate();
    const {doctors} =useContext(AppContext)
    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text text-3xl font-medium text-primary">Top Doctors to Book </h1>
            <p className="sm:w1/3 text-center text-sm ">Simply browse through our extensive list of trusted doctors. </p>
                <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 ">
                    {doctors.slice(0,12).map((doc,index)=>(
                            <div
                             onClick={()=> navigateFunction(`/appointment/${doc._id}`)}
                             key={index}
                             className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer
                             hover:translate-y-[-10px] transition-all
                             duration-500">
                                 <img className="bg-blue-200" src={doc.image} alt=" Doctore image"/>
                                <div className="p-4">
                                        {doc.available?
                                            <div className="flex items-center gap-2">
                                            <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                                            <p className="text-green-500">Available</p>
                                            </div>
                                            :
                                            <div className="flex items-center gap-2">
                                                <p className="w-2 h-2 bg-red-500 rounded-full"></p>
                                                <p className="text-red-500">Not Available</p>
                                            </div>
                                        }
                                    <p className="text-gray-900 text-lg font-medium">{doc.name}</p>
                                    <p className="text-gray-600 text-sm">{doc.speciality}</p>
                                </div>
                            </div>
                    ))}
                </div>
            <button onClick={()=>{navigateFunction('/doctors');scroll(0,0)}}
                    className="bg-blue-100 text-gray-900 px-12 py-3 rounded-full mt-10">more</button>
        </div>
    );
}

export default TopDoc;