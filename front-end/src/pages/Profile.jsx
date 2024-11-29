import React, {useState} from 'react'
import {assets} from "../assets/assets.js";

function Profile() {
  const [userData, setUsreData]=useState({
    name:"Edward Vincent",
    email:"richardjameswap@gmail.com",
    image:assets.profile_pic,
    phone:"+1  123 456 7890",
    address:{
     line1: "57th Cross, Richmond",
     line2: "Circle, Church Road, London",
    },
    gender:"Male",
    birthday:"20 July, 2024"
  });
  const [isEdite,setisEdite]=useState(false)
  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img src={userData.image} alt="Profile Image" className="w-36 rounded"/>
      {isEdite
          ? <input type="text"
                   className="border hover:border-primary border-zinc-300 rounded w-full p-2 mt-2"
          value={userData.name}
          onChange={e=>setUsreData(prev=>({...prev,name:e.target.value}))}/>
          :<p className="font-medium text-3xl text-neutral-800 mt-4 ]">{userData.name}</p>
      }
      <hr className="bg-primary border-none h-[1px]"/>
      <div >
        <p className="text-primary underline mt-3 ">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gray-y-2.5 mt-3 text-neutral-800">
          <p className="font-medium">Email:</p>
          <p className="text-gray-800">{userData.email}</p>
          <p className="font-medium" >Phone:</p>
          {
            isEdite
            ?<input type="text"
            value={userData.phone}
                   className="border hover:border-primary border-zinc-300 rounded w-full p-2 mt-2"
            onChange={e=>setUsreData(prev=>({...prev,phone:e.target.value }))}/>
            : <p className="text-gray-800">{userData.phone}</p>
          }
          <p className="font-medium">Address:</p>
          {
            isEdite
            ?<p>
            <input type="text"
                   className="border hover:border-primary border-zinc-300 rounded w-full p-2 mt-2"
                   value={userData.address['line1']}
                   onChange={e=>setUsreData(prev=>({...prev.address, line1:e.target.value}))}/>
            <br/>
            <input type="text"
                   className="border hover:border-primary border-zinc-300 rounded w-full p-2 mt-2"
                   value={userData.address['line2']} onChange={e=>setUsreData(prev=>({...prev.address, line2:e.target.value}))}/>
            </p>
            : <p className="text-gray-800">
                  {userData.address.line1}
              <br/>
                  {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div>
        <p className="text-primary underline mt-3 ">BASIC INFORMATION </p>
        <div className="grid grid-cols-[1fr_3fr] gray-y-2 mt-3 text-neutral-800">
          <p className="font-medium">Gender:</p>
          {isEdite
              ?<select value={userData.gender}
                       className="border hover:border-primary
              border-zinc-300 rounded w-full p-2 mt-2"
                       onChange={(e)=>setUsreData((prev)=>({...prev,gender: e.target.value}))}>
                <option value="Male" className="text-gray-400">Male</option>
                <option value="Female" className=" text-gray-400">Female</option>
              </select>
              :<p className="text-gray-800">{userData.gender}</p>
          }
          <p className="font-medium">BirthDay:</p>
          {
          isEdite?<input type="date" value={ userData.birthday}
                         className="text-gray-400 border hover:border-primary border-zinc-300 rounded w-full p-2 mt-2"
                         onChange={e=>setUsreData(prev=>({...prev,birthday:e.target.value}))}/>
              :<p className="text-gray-800">{userData.birthday}</p>
          }
        </div>
      </div>
      <div className="mt-10">
        {
          isEdite
              ?<button  className=" text-gray-800 border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500" onClick={()=>setisEdite(false)}> Save Information's</button>
              : <button className=" text-gray-800 border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500"   onClick={()=>setisEdite(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default Profile