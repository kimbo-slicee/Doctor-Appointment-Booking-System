import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../context/AppContext.jsx";
import {assets} from "../assets/assets.js";
import {toast} from "react-toastify";
import axios from 'axios';
import dayjs from 'dayjs'
function Profile() {
  const {userData,setUserData,backEndUrl,token,loadUserProfile}=useContext(AppContext);
  const [isEdite,setIsEdite]=useState(false);
  const [image,setImage]=useState(false);

          const formData = new FormData();
          formData.append('name', userData.name || ""); // Default to empty string if undefined
          formData.append('email', userData.email || "");
          formData.append('phone', userData.phone || "");
          formData.append('address', JSON.stringify(userData.address || {}));
          formData.append('gender', userData.gender || "");
          formData.append('dob', userData.dob || "");
          if (image) formData.append('image', image);
        //     // Log all key-value pairs in FormData
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        const updateUserProfile=async () => {
      try {
          const {data} = await axios.patch(`${backEndUrl}/api/v1/user/profile`,formData,{headers: {Authorization:`Bearer ${token}`}});
          if(data.success){
              await loadUserProfile();
              setImage(false);
              setIsEdite(false);
              toast("Profile Completed", {type:"success"})

          }
      } catch (error) {
          console.log(error)
            toast(error["response"]["data"].msg,{
                type:"error"
            })
      }
  }
  return userData &&  (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
        {
            isEdite
            ?
           <label htmlFor="image">
               <div className="inline-block relative cursor-pointer">
                <img className="w-36 rounded opacity-80" src={image?URL.createObjectURL(image):userData.image} alt=""/>
                <img className="w-10 absolute bottom-12 right-12" src={image?'':assets.upload_icon} alt=""/>
               </div>
            <input type="file" id="image" onClick={e=>setImage(e.target.files[0])} hidden/>
           </label>
           :<img src={userData.image} className="w-36" alt="user Image"/>

        }
      {isEdite
          ? <input type="text"
                   className="border hover:border-primary border-zinc-300 rounded w-full p-2 mt-2"
          value={userData.name}
          onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))}/>
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
            onChange={e=>setUserData(prev=>({...prev,phone:e.target.value }))}/>
            : <p className="text-gray-800">{userData.phone}</p>
          }
          <p className="font-medium">Address:</p>
          {
            isEdite
            ?<p>
            <input type="text"
                   className="border hover:border-primary border-zinc-300 rounded w-full p-2 mt-2"
                   onChange={(e) =>
                       setUserData((prev) => ({
                           ...prev,
                           address: {
                               ...prev.address,
                               line1: e.target.value, // Update only line1
                           },
                       }))
                   }
                   value={JSON.parse(userData.address).line1}
            />
            <br/>
            <input type="text"
                   className="border hover:border-primary border-zinc-300 rounded w-full p-2 mt-2"
                   onChange={(e) =>
                       setUserData((prev) => ({
                           ...prev,
                           address: {
                               ...prev.address,
                               line2: e.target.value, // Update only line2
                           },
                       }))
                   }
                   value={JSON.parse(userData.address).line2}
            />
            </p>
            : <p className="text-gray-800">
                  {JSON.parse(userData.address).line1}
              <br/>
                  {JSON.parse(userData.address).line2}
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
                       onChange={(e)=>setUserData((prev)=>({...prev,gender: e.target.value}))}>
                <option value="Male" className="text-gray-400">Male</option>
                <option value="Female" className=" text-gray-400">Female</option>
              </select>
              :<p className="text-gray-800">{userData.gender}</p>
          }
          <p className="font-medium">BirthDay</p>
          {
          isEdite?<input type="date" value={ userData.dob}
                         className="text-gray-400 border hover:border-primary border-zinc-300 rounded w-full p-2 mt-2"
                         onChange={e=>setUserData(prev=>({...prev,dob:e.target.value}))}/>
              :<p className="text-gray-800">{dayjs(userData.dob).format('YYYY-MM-DD')}</p>
          }
        </div>
      </div>
      <div className="mt-10">
        {
          isEdite
              ?<button  className=" text-gray-800 border border-primary
              px-8 py-2 rounded-full hover:bg-primary
              hover:text-white transition-all
              duration-500" onClick={updateUserProfile}> Save Information's</button>
              : <button className=" text-gray-800 border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500"   onClick={()=>setIsEdite(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default Profile