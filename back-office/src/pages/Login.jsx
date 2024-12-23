import {useContext, useState} from "react";
import {AdminContext} from "../context/AdminContext.jsx";
import axios from "axios";
import {Bounce, toast} from "react-toastify";
import Spinner from "../components/Spinner.jsx";
import {DoctorContext} from "../context/DoctorContext.jsx";
import {useNavigate} from "react-router-dom";
const Login=()=>{
    const [state,setState]=useState("Admin");
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {setAdminToken,backEndUrl}=useContext(AdminContext)
    const {setDoctorToken}=useContext(DoctorContext)
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();
    const submitHandler=async (e)=>{
        e.preventDefault();
        setLoading(true)
        try{
            if(state==="Admin"){
                const {data}=await axios.post(`${backEndUrl}/admin/login`,{email,password})
                if(data.success) {
                    navigate('/DashBoard')
                    localStorage.setItem('adminToken',`Bearer ${data.token}`);
                    setAdminToken(`Bearer ${data.token}`);
                    setLoading(false);

                }else {
                    toast(data.message,{type:"error"})
                    setLoading(false);
                }
            }else{
                const {data}=await axios.post(`${backEndUrl}/doctor/login`,{email,password})
                if(data.success){
                    navigate('/Doctor_DashBord')
                    toast("Login Successful",{type:"success"});
                    setDoctorToken(`Bearer ${data.token}`);
                    localStorage.setItem("doctorToken",`Bearer ${data.token}`);
                    setLoading(false);
                }else {
                    toast(data.message ,{type:"error"})
                    console.log(data)
                setLoading(false)
                }
            }
        }catch (error){
            setLoading(false)
            toast.error(`${error.response.data.message}`, {
                position: "top-center",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }
    return loading? (<Spinner loading={loading}/>):(
        <form onSubmit={submitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px]
             sm:min-w-96 border rounded-xl text-[#5ESESE] text-sm shadow-custom-light">
                <p className="text-2xl font-semibold m-auto text-primary uppercase"><span className="mx-1">{state}</span>Login</p>
                <div className="w-full">
                    <p className="text-zinc-700 text-sm">Email</p>
                    <input onChange={(e)=>setEmail(e.target.value)}
                           type="text" required className="border border-[#DADADA] rounded w-full p-2 mt-1"
                           value={email}
                    />
                </div>
                <div className="w-full">
                    <p className="text-zinc-700 text-sm">Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)}
                        type="password" required className="border border-[#DADADA] rounded w-full p-2 mt-1"/>
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md text-base ">Login</button>
                {
                    state === "Admin"
                        ?<p>Doctor Login ?<span className="cursor-pointer text-sm text-primary underline " onClick={()=>setState('Doctor')}>Click here</span></p>
                        :<p>Admin Login ?<span className="cursor-pointer text-sm text-primary underline " onClick={()=>setState('Admin')} >Click here</span></p>
                }
            </div>
        </form>
    )
}
export default Login