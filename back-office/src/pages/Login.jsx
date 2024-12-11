import {useContext, useState} from "react";
import {AdminContext} from "../context/AdminContext.jsx";
import axios from "axios";
import {Bounce, toast} from "react-toastify";
const Login=()=>{
    const [state,setState]=useState("Admin");
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {setAdminToken,backEndUrl}=useContext(AdminContext)
    const submitHandler=async (e)=>{
        e.preventDefault();
        try{
            if(state==="Admin"){
                const {data}=await axios.post(`${backEndUrl}/api/v1/admin/login`,{email,password})
                if(data.success) {
                    localStorage.setItem('adminToken',`Bearer ${data.token}`);
                    setAdminToken(`Bearer ${data.token}`);
                }
            }
        }catch (error){
            toast.error(`${error.message}`, {
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
    return(
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