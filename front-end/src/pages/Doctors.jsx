import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/AppContextProvider.jsx";

function Doctors() {
  const {speciality}=useParams();
  const [filterDocs,setFilterDocS]=useState([]);
  const {doctors} =useContext(AppContext);
  const navigateFunction=useNavigate();
  const applyFilter=()=>speciality?setFilterDocS(doctors.filter(doc=>doc.speciality===speciality)):setFilterDocS(doctors);
  useEffect(() => {
  applyFilter();
  }, [ doctors, speciality]);
  console.log(speciality);
  return (
    <div>
       <p className="text-gray-900">Browse through the doctors specialist.</p>
        {/*-----left Menu---*/}
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm text-gray-600" >
          <p onClick={()=>speciality==="General physician"?navigateFunction('/doctors'):navigateFunction(`/doctors/General physician`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="General physician" ?"bg-indigo-100 text-black":""}`}>General physician</p>
          <p onClick={()=>speciality==="Gynecologist"?navigateFunction('/doctors'):navigateFunction(`/doctors/Gynecologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynecologist" ?"bg-indigo-100 text-black":""}`}>Gynecologist</p>
          <p onClick={()=>speciality==="Pediatricians"?navigateFunction('/doctors'):navigateFunction(`/doctors/Dermatologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist" ?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
          <p onClick={()=>speciality==="Pediatricians"?navigateFunction('/doctors'):navigateFunction(`/doctors/Pediatricians`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Pediatricians" ?"bg-indigo-100 text-black":""}`}>Pediatricians</p>
          <p onClick={()=>speciality==="Neurologist"?navigateFunction('/doctors'):navigateFunction(`/doctors/Neurologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Neurologist" ?"bg-indigo-100 text-black":""}`}>Neurologist</p>
          <p onClick={()=>speciality==="Gastroenterologist"?navigateFunction('/doctors'):navigateFunction(`/doctors/Gastroenterologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist" ?"bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
        </div>
        {/*------------Right Menu------------*/}
          <div className="w-full grid grid-cols-auto gap-4 gap-y-6 ">
            {filterDocs.map((doc, index) => (
                <div
                    onClick={() => navigateFunction(`/appointment/${doc._id}`)}
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
            ))}
          </div>
        </div>
      </div>
  )
}

export default Doctors