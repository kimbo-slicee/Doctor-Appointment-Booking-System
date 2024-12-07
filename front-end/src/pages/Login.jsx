import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../context/AppContext.jsx";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {Bounce, toast} from "react-toastify";

function Login() {
  const {token,setToken ,backEndUrl}=useContext(AppContext);
  const [state,setState]=useState("Sign Up");
  const [email,setEmail]=useState('');
  const [password ,setPassword]=useState('');
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const navigate=useNavigate();
  const handelSubmit=async (event)=>{
    event.preventDefault();
    try{
      if(state==="Sign Up"){
      const {data}=await axios.post(`${backEndUrl}/api/v1/user/register`,{name,email,phone,password});
      if(data.success){
        localStorage.setItem('userToken',token);
        setToken(data.token)
        toast("Account Created Successfully",{type:"success"})

      }
      }else{
      const {data}=await axios.post(`${backEndUrl}/api/v1/user/login`,{email,password});
        if(data.success){
          localStorage.setItem('userToken',token);
          setToken(data.token)
          toast("login Successfully",{type:"success"})
          toast('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            type:"info"
          });
        }
      }

    }catch (error){
      toast(error.message,{type:"error"})
      console.log(error)
    }
  }
  useEffect(() => {
    if(token){
      navigate('/')
    }
  }, [token]);
  return (
      <form onSubmit={handelSubmit} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-center p-8 min-w-[340px] sm:min-w-96 border rounded-xl  text-zinc-600 shadow-lg">
          <p className="text-2xl font-semibold uppercase ">{state === "Sign Up" ? "create Account" : "Login"}</p>
          <p className="text-sm font-light">Please {state === "Sign Up" ? "Sign Up" : "Login "} to book appointment ! </p>
          {
              state === "Sign Up" && <div className="w-full ">
                <p>Name</p>
                <input className="border hover:border-primary
              border-zinc-300 rounded w-full p-2 mt-2" type="text"
                       onChange={ (e) => setName(e.target.value.trim())}
                       value={name} required/>
              </div>
          }
          {/*// Phone Number*/}
          {
              state === "Sign Up" && <div className="w-full ">
                <p>Phone</p>
                <input className="border hover:border-primary
              border-zinc-300 rounded w-full p-2 mt-2" type="text"
                       onChange={ (e) => setPhone(e.target.value.trim())}
                       value={phone} required/>
              </div>
          }
          <div className="w-full">
            <p>Email</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-2 "
                   type="text"
                   onChange={(e) => setEmail(e.target.value.trim())}
                   value={email} required/>
          </div>
          <div className="w-full">
            <p>Password</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-2 "
                   type="password"
                   onChange={(e) => setPassword(e.target.value.trim())}
                   value={password} required/>
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-base" type="submit"
                  onSubmit={handelSubmit}>
            {state==="Sign Up"?"create account":"Login"}</button>
          {state==="Sign Up" ?
              <p> Already Have account ?
               <span
                   onClick={()=>setState('Login')}
                   className="text-primary underline text-sm cursor-pointer mx-1"> Login Here </span>
              </p>
              : <p>  Create new Account ?<span onClick={()=>setState("Sign Up")} className="mx-1 text-primary underline text-sm cursor-pointer">Click Here</span></p>}
        </div>
      </form>
  )
}

export default Login