import {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {useNavigate} from "react-router-dom";
const RelatedDoctors =({docId,speciality})=>{
    const {doctors}=useContext(AppContext);
    const [relDoc,setRelDocs]=useState([]);
    const navigateFunction=useNavigate()
    useEffect(() => {
        if (doctors.length >0 && speciality){
            console.log(speciality)
        const doctorsData=doctors.filter(doc=>doc.speciality===speciality );
        setRelDocs(doctorsData);
        }
    }, [doctors,speciality,docId]);
    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text text-3xl font-medium text-primary uppercase">Top Doctors to Book </h1>
            <p className="sm:w1/3 text-center text-sm ">Simply browse through our extensive list of trusted
                doctors. </p>
            <div className="w-full grid grid-cols-auto  gap-4 pt-5 gap-y-6 px-3 sm:px-0 ">
                {relDoc.map((doc, index) => (

                        <div
                            onClick={()=>{navigateFunction(`/appointment/${doc._id}`);scroll(0,0)}}
                            key={index}
                            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer
                         hover:translate-y-[-10px] transition-all
                         duration-500">
                            <img className="bg-blue-200" src={doc.image} alt=" Doctore image"/>
                            <div className="p-4">
                                <div className="flex items-center gap2 text-sm text-center text-green-500">
                                    <p className="w-2 h-2 bg-green-500 rounded-full"></p><p>Available</p>
                                </div>
                                <p className="text-gray-900 text-lg font-medium">{doc.name}</p>
                                <p className="text-gray-600 text-sm">{doc.speciality}</p>
                            </div>
                        </div>
                    )
                )}
            </div>

        </div>


    )
}
export default RelatedDoctors