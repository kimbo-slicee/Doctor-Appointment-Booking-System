// eslint-disable-next-line no-unused-vars
import React, {useContext, useState} from 'react'
import {assets} from "../assets/assets"
import {NavLink, useNavigate} from 'react-router-dom'
import {AppContext} from "../context/AppContext.jsx";
import {toast} from "react-toastify";
function NavBar() {
  const navigate =useNavigate();
  const [showMenu,setShowMenu]=useState(false);
  const {token,setToken,userData}=useContext(AppContext);
  const logout =()=>{
    setToken('')
    localStorage.removeItem("userToken");
    navigate('/')
    toast("Login To Book An Appointment",{type:"info"});
    const logoutTime=Date.now()
    console.log(`Logout At ${logoutTime}`)
  }
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
      <img onClick={()=>{navigate('/')}} className='w-44 cursor-pointer' src={assets.logo} alt="logo Image"/>
      <ul className='hidden md:flex items-start gap-5 font-medium'> 
        <NavLink to='/'>
          <li className="py-1">HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-11/12 m-auto hidden'/>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-11/12 m-auto hidden'/>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-11/12 m-auto hidden'/>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-11/12 m-auto hidden'/>
        </NavLink>
      </ul>
      <ul>
        <div className="flex items-center gap-4">
          {token && userData ? <div className="flex items-center gap-2 cursor-pointer group relative">
                <img src={userData.image} alt="user Profile" className="w-8 rounded-full"/>
                <img src={assets.dropdown_icon} alt="dropdown_icon" className="w-2.5"/>
                <div className="absolute top-0 right-0 text-base pt-14 font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p onClick={()=>{navigate("profile")}} className="hover:text-black cursor-pointer">My Profile</p>
                  <p onClick={()=>{navigate("myAppointments")}} className="hover:text-black cursor-pointer">My Appointment </p>
                  <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
                </div>
                </div>
              </div>
              : <button
                  onClick={() => navigate('/login')}
                  className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">Create
                Account</button>
          }
          <img onClick={()=>setShowMenu(true)} className=" w-6 md:hidden " src={assets.menu_icon} alt="menu Icons"/>
          <div className={`${showMenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-12 overflow-hidden bg-white transition-all duration-500`}>
            <div className="flex  items-center justify-between px-5 py-5 border-b ">
              <img className="w-37" onClick={()=>navigate('/')} src={assets.logo} alt=" "/>
              <img className="w-8" onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt=""/>
            </div>
            <ul className=" flex flex-col gap-5 items-center mt-5  text-lg font-medium">
              <NavLink  onClick={()=>setShowMenu(false)}  to="/"><p className="px-4 py-2 uppercase inline-block rounded">Home</p></NavLink>
              <NavLink  onClick={()=>setShowMenu(false)}  to="doctors"> <p className="px-4 py-2 uppercase inline-block rounded">AllDoctors</p></NavLink>
              <NavLink  onClick={()=>setShowMenu(false)}  to="about">  <p className="px-4 py-2 uppercase inline-block rounded"> About</p></NavLink>
              <NavLink  onClick={()=>setShowMenu(false)}  to="contact"> <p className="px-4 py-2 uppercase inline-block rounded">Contact</p></NavLink>
            </ul>
          </div>
        </div>
      </ul>
    </div>
  )
}

export default NavBar