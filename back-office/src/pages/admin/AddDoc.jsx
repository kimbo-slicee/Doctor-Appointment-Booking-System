import {assets} from "../../assets/assets.js";
import {useContext, useState} from "react";
import {AdminContext} from "../../context/AdminContext.jsx";
import {toast} from "react-toastify";

const AddDoc=()=>{
    const [docImage,setDocImage]=useState('');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [password,setPassword]=useState('');
    const [experience,setExperience]=useState('1 Year');
    const [fess,setFess]=useState('');
    const [about,setAbout]=useState();
    const [speciality,setSpeciality]=useState('General Physician');
    const [degree,setDegree]=useState('')
    const [address1,setAddress1]=useState('');
    const [address2,setAddress2]=useState('');
    const  {backendUrl,adminToken}=useContext(AdminContext);
    const handelSubmit = async (e)=>{
        e.preventDefault();
        try{
            if(!docImage)return toast.error('Image Not Selected ')
        }catch (error){
            console.log(error);
        }

    }

 return(
     <form className="mb-3 w-full" onSubmit={handelSubmit}>
         <div className="bg-white px-8 py-8 border rounded w-full max-w-full max-h-[80vh] overflow-scroll">
         <p className=" mb-3 text-center text-primary font-medium text-xl ">ADD NEW DOCTOR</p>
             <div className="flex items-center gap-4 mb-8 text-gray-500 ">
                 <label htmlFor="profile_pic">
                     <img className="w-20 bg-gray-50 rounded-full cursor-pointer" src={docImage?URL.createObjectURL(docImage):assets.upload_area}
                          alt="apload images"/>
                 </label>
                 <input onChange={e=>setDocImage(e.target.files[0])}  type="file" name="profile_pic" id="profile_pic" hidden/>
             </div>
             <div className="flex flex-col lg:flex-row items-start gap-5 text-gray-600">
                 <div className="w-full flex flex-col gap-4">
                     <div className="flex-1 flex flex-col gap-1">
                         <p>Doctor Name</p>
                         <input onChange={e=>setName(e.target.value)} type="text" value={name} placeholder="name" required className="border rounded px-3 py-3"/>
                     </div>
                     <div className="flex-1 flex flex-col gap-1">
                         <p>Doctor Email</p>
                         <input onChange={e=>setEmail(e.target.value)} type="text" value={email} placeholder="Your email" required className="border rounded px-3 py-3"/>
                     </div>
                     <div className="flex-1 flex flex-col gap-1">
                         <p>Doctor Phone Number</p>
                         <input onChange={e=>setPhone(e.target.value)} type="text" value={phone} placeholder="Phone Number" required className="border rounded px-3 py-3"/>
                     </div>
                     <div className="flex-1 flex flex-col gap-1">
                         <p>Doctor Password</p>
                         <input onChange={e=>setPassword(e.target.value)} type="text" value={password} placeholder="Password" required className="border rounded px-3 py-3"/>
                     </div>
                     <div className="flex-1 flex flex-col gap-1">
                         <p>Experience</p>
                         <select onChange={e=>setExperience(e.target.value)}  value={experience}   name="Experience" required className="border rounded px-3 py-3">
                             <option value="1 Year">1 Year</option>
                             <option value="2 Year">2 Year</option>
                             <option value="3 Year">3 Year</option>
                         </select>
                     </div>
                     <div className="flex-1 flex flex-col gap-1">
                         <p>Fees</p>
                         <input onChange={e=>setFess(e.target.value)} value={fess} type="number" placeholder="fees" required className="flex-1 flex flex-col gap-1"/>
                     </div>
                 </div>
                 <div className="w-full flex flex-col gap-4">
                     <div className="flex-1 flex flex-col gap-1">
                         <p>Speciality</p>
                         <select onChange={e=>setSpeciality(e.target.value)} name="Speciality" value={speciality} className="border rounded px-3 py-3">
                             <option value='General Physician'>General Physician</option>
                             <option value='Gynecologist'>Gynecologist</option>
                             <option value='Dermatologist'>Dermatologist</option>
                             <option value='Pediatricians'>Pediatricians</option>
                             <option value='Neurologist'>Neurologist</option>
                             <option value='Gastroenterologist'>Gastroenterologist</option>
                         </select>
                     </div>
                     <div className="flex-1 flex flex-col gap-1">
                         <p>Eduction</p>
                         <input onChange={e=>setDegree(e.target.value)} value={degree} type="text" placeholder="Eduction" required className="border rounded px-3 py-3"/>
                     </div>
                     <div className="flex-1 flex flex-col gap-1">
                         <p>Address</p>
                         <input onChange={e=>setAddress1(e.target.value)} value={address1} type="text" placeholder="Addesss 1" required className="border rounded px-3 py-3"/>
                         <input onChange={e=>setAddress2(e.target.value)} value={address2} type="text" placeholder="Addesss 2" required className="border rounded px-3 py-3 mt-1"/>
                     </div>
                 </div>
             </div>
             <div>
                 <p className="mt-4 mb-2 ">About</p>
                 <textarea onChange={e=>setAbout(e.target.value)} value={about} className="w-full px-2 pt-3 border rounded" rows={5} placeholder="write about yourself..."/>
             </div>
             <button className="bg-primary text-white rounded-full px-10 py-3 mt-3 ">Add Doctor</button>
         </div>
     </form>
 )
}
export default AddDoc;