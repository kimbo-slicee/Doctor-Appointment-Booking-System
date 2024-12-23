import {assets} from "../../assets/assets.js";
import {useContext, useState} from "react";
import {AdminContext} from "../../context/AdminContext.jsx";
import {toast} from "react-toastify";
import axios from "axios";
import Spinner from "../../components/Spinner.jsx";
import {useNavigate} from "react-router-dom";
import {TextEditor} from "../../components/TextEditor.jsx";
const AddDoc=()=>{
    const {backEndUrl,adminToken}=useContext(AdminContext);
    const navigate=useNavigate();
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
    const [availability,setAvailability]=useState(true);
    const [loading, setLoading] = useState(false);

    const handelSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const formData=new FormData();
        formData.append('image',docImage);
        formData.append('name',name);
        formData.append('email',email);
        formData.append('phone',phone);
        formData.append('password',password);
        formData.append('experience',experience);
        formData.append('degree',degree)
        formData.append('fess',Number(fess));
        formData.append('about',about);
        formData.append('speciality',speciality);
        formData.append('available',availability);
        formData.append('address',JSON.stringify({line1:address1,line2:address2}));
        formData.forEach((value,key)=>{
            console.log(`${key}:${value}`)
        })
        try{
            if(!docImage)return toast.error('Doctor Image Require');
            const {data}=await axios.post(`${backEndUrl}/api/v1/admin`,formData,{headers: {Authorization: adminToken}});
            if(data.success) {
                toast.success("Doctor Added Successfully");
                setLoading(false);
                navigate('/Dashboard');
            }
            toast(data.message,{type:"error"})
        }catch (error){
            toast.error(error.response.data.message)
            setLoading(false);
        }

    }

   return loading?(<Spinner loading={loading}/>): (
     <form className="mb-3 w-full" onSubmit={handelSubmit}>
                 <div className="bg-white px-8 py-8 border rounded w-full max-w-full max-h-[100vh] overflow-scroll">
                     <p className=" mb-3 text-center text-primary font-medium text-xl ">ADD NEW DOCTOR</p>
                     <div className="flex items-center gap-4 mb-8 text-gray-500 ">
                         <label htmlFor="profile_pic">
                             <img className="w-20 bg-gray-50 rounded-full cursor-pointer"
                                  src={docImage ? URL.createObjectURL(docImage) : assets.upload_area}
                                  alt="apload images"/>
                         </label>
                         <input onChange={e => setDocImage(e.target.files[0])} type="file" name="profile_pic"
                                id="profile_pic"
                                hidden/>
                     </div>
                     <div className="flex flex-col lg:flex-row items-start gap-5 text-gray-600">
                         <div className="w-full flex flex-col gap-4">
                             <div className="flex-1 flex flex-col gap-1">
                                 <p>Doctor Name</p>
                                 <input onChange={e => setName(e.target.value)} type="text" value={name}
                                        placeholder="name"
                                        required className="border rounded px-3 py-3"/>
                             </div>
                             <div className="flex-1 flex flex-col gap-1">
                                 <p>Doctor Email</p>
                                 <input onChange={e => setEmail(e.target.value.toLocaleLowerCase())} type="text"
                                        value={email}
                                        placeholder="Your email" required className="border rounded px-3 py-3"/>
                             </div>
                             <div className="flex-1 flex flex-col gap-1">
                                 <p>Doctor Phone Number</p>
                                 <input onChange={e => setPhone(e.target.value)} type="text" value={phone}
                                        placeholder="Phone Number" required className="border rounded px-3 py-3"/>
                             </div>
                             <div className="flex-1 flex flex-col gap-1">
                                 <p>Doctor Password</p>
                                 <input onChange={e => setPassword(e.target.value)} type="password" value={password}
                                        placeholder="Password" required className="border rounded px-3 py-3"/>
                             </div>
                             <div className="flex-1 flex flex-col gap-1">
                                 <p>Experience</p>
                                 <select onChange={e => setExperience(e.target.value)} value={experience}
                                         name="Experience" required className="border rounded px-3 py-3">
                                     <option value="1 Year">1 Year</option>
                                     <option value="2 Year">2 Year</option>
                                     <option value="3 Year">3 Year</option>
                                     <option value="3 Year">4 Year</option>
                                     <option value="3 Year">5 Year</option>
                                     <option value="3 Year">6 Year</option>
                                     <option value="3 Year">7 Year</option>
                                     <option value="3 Year">8 Year</option>
                                     <option value="3 Year">9 Year</option>
                                     <option value="3 Year">10 Year</option>
                                 </select>
                             </div>
                             <div className="flex-1 flex flex-col gap-1">
                                 <p>Fees</p>
                                 <input className="border rounded px-3 py-3"
                                        onChange={e => setFess(e.target.value)} value={fess}
                                        type="number" placeholder="fees" required/>
                             </div>
                         </div>
                         <div className="w-full flex flex-col gap-4">
                             <div className="flex-1 flex flex-col gap-1">
                                 <p>Speciality</p>
                                 <select onChange={e => setSpeciality(e.target.value)} name="Speciality"
                                         value={speciality}
                                         className="border rounded px-3 py-3">
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
                                 <input onChange={e => setDegree(e.target.value)} value={degree} type="text"
                                        placeholder="Eduction" required className="border rounded px-3 py-3"/>
                             </div>
                             <div className="flex-1 flex flex-col gap-1">
                                 <p>Address</p>
                                 <input onChange={e => setAddress1(e.target.value)}
                                        value={address1} type="text" placeholder="Addesss 1" required
                                        className="border rounded px-3 py-3"/>
                                 <input onChange={e => setAddress2(e.target.value)}
                                        value={address2} type="text" placeholder="Addesss 2"
                                        className="border rounded px-3 py-3 mt-1"/>
                             </div>
                             <div className="flex-1 flex flex-col gap-1">
                                 <p>Availability</p>
                                 <div className="flex flex-row gap-5">
                                     <div className="inline-flex items-center">
                                         <label className="relative flex items-center cursor-pointer"
                                                htmlFor="avliable">
                                             <input name="Availability" type="radio"
                                                    onClick={() => setAvailability(true)}
                                                    className="peer h-5 w-5 cursor-pointer
                                                     appearance-none rounded-full border
                                                     border-primary checked:border-primary transition-all"
                                                    id="avliable" defaultChecked={true}/>
                                             <span
                                                 className="absolute bg-primary w-3 h-3
                                         rounded-full opacity-0 peer-checked:opacity-100
                                         transition-opacity duration-200
                                         top-1/2 left-1/2 transform
                                         -translate-x-1/2 -translate-y-1/2 hover:bg-primary hover:opacity-100">
                                   </span>
                                         </label>
                                         <label className="ml-2 text-slate-600 cursor-pointer text-sm"
                                                htmlFor="html">available</label>
                                     </div>
                                     <div className="inline-flex items-center">
                                         <label className="relative flex items-center cursor-pointer"
                                                htmlFor="Not Available">
                                             <input name="Availability" type="radio"
                                                    onClick={() => setAvailability(false)}
                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border
                                            border-primary checked:border-primary transition-all"
                                                    id="Not Available"/>
                                             <span
                                                 className="absolute bg-primary w-3 h-3
                                         rounded-full opacity-0 peer-checked:opacity-100
                                         transition-opacity duration-200
                                         top-1/2 left-1/2 transform
                                         -translate-x-1/2 -translate-y-1/2 hover:bg-primary hover:opacity-100">
                                   </span>
                                         </label>
                                         <label className="ml-2 text-slate-600 cursor-pointer text-sm"
                                                htmlFor="react">Not Available</label>
                                     </div>
                                 </div>

                             </div>
                         </div>
                     </div>
                     <div>
                         <p className="mt-4 mb-2 ">About</p>
                         <TextEditor
                         value={about} onChange={(e)=>setAbout(e.target.value)}
                         />
                     </div>
                     <button className="bg-primary text-white rounded-full px-10 py-3 mt-3 ">Add Doctor</button>
                 </div>
             </form>
 )
}
export default AddDoc;