import React, {Fragment, useContext, useEffect, useState} from 'react';
import {DoctorContext} from "../../context/DoctorContext.jsx";
import {AppContext} from "../../context/AppContext.jsx";
import {assets} from "../../assets/assets.js";
import {TextEditor} from "../../components/TextEditor.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"
import Spinner from "../../components/Spinner.jsx";



const DoctorProfile = () =>{
const{getDoctorData,doctorToken,doctorData,setDoctorData,yearsOfExperience,
    specialty,updateDocData,loading}=useContext(DoctorContext);
const {currency}=useContext(AppContext);
const [edite,setEdite]=useState(false);
const [image,setImage]=useState(false);
useEffect(() => {
        if(doctorToken) {
            getDoctorData()
        }
    }, [doctorToken]);
    const handelAupDate=()=>{
        const formData = new FormData();
        image ? formData.append('image', image):formData.append('image',doctorData.image)
        formData.append('name'     ,doctorData.name);
        formData.append('experience',doctorData.experience);
        formData.append('speciality',doctorData.speciality);
        formData.append('email'    ,doctorData.email );
        formData.append('phone'    ,doctorData.phone);
        formData.append('address'  ,doctorData.address);
        formData.append('about'    ,doctorData.about);
        formData.append("fess"     ,doctorData.fess)
        formData.append('available',doctorData.available)
        updateDocData(formData)
        setEdite(false)
    }

    return doctorData && (
    <div className="w-[50vw]">
        <Spinner loading={loading}/>
        <div className="flex flex-col gap-4 m-5 border border-stone-100 rounded-lg p-8 py-7 bg-white shadow-custom-light">
            {edite ?
                <label htmlFor="image">
                    <div className="inline-block relative cursor-pointer">
                        <img src={image ?URL.createObjectURL(image): doctorData.image} className="w-36 rounded opacity-10 bg-primary" alt=""/>
                        <img src={image ? URL.createObjectURL(image) :assets.upload_image} className="absolute bottom-0 right-0 opacity-50 bg-gray-300 w-full"  alt=""/>
                    </div>
                    <input type="file" id="image" onChange={e => setImage(e.target.files[0])} hidden/>
                </label>
                : <div>
                    <img className="bg-primary w-full sm:max-w-64 rounded-lg"
                         src={image?URL.createObjectURL(image):doctorData.image}
                         alt="doctor Data "/>
                </div>
            }
            <div className="flex-1 ">
                <Fragment>
                    {edite
                        ?
                        <div className="w-full">
                            <label className="text-m font-medium text-neutral-800 mt-3 my-3 ">Doctor Name</label>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Change Name"
                                value={doctorData.name}
                                onChange={(e)=>setDoctorData(prev=>({...prev,name:e.target.value}))}/>
                        </div>
                        :
                        <div className="w-full flex flex-row items-center gap-2 ">
                            <p className="text-3xl font-medium text-gray-700 ">{doctorData.name.toUpperCase()}</p>
                            <img className="w-5 " src={assets.verified_icon} alt="vervied Doctor Badge"/>

                        </div>

                    }
                </Fragment>
                <Fragment>
                    {edite ?
                        <div className="relative">
                            <label className="text-m font-medium text-neutral-800 mt-3 ">Speciality</label>
                            <select
                                onChange={(e) => setDoctorData((prev) => (
                                    {...prev, speciality: e.target.value}))}
                                className="bg-transparent pl-3 pr-8 py-3  border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option  value="dfeault" hidden>{doctorData.speciality}</option>
                                {specialty.map((ele, index) => (
                                    <option key={index} value={ele}>{ele}</option>
                                ))}
                            </select>
                            <label className="text-m font-medium text-neutral-800 mt-3 mb-3">Experience</label>
                            <select
                                onChange={(e) => setDoctorData((prev) => (
                                    {...prev, experience: e.target.value}))}
                                    className="bg-transparent pl-3 pr-8 py-3  border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

                                <option defaultValue={doctorData.experience}
                                        value={doctorData.experience} hidden>{doctorData.experience}</option>
                                {yearsOfExperience.map((ele, index) => (
                                    <option key={index} value={ele}>{ele}</option>
                                ))}
                            </select>
                        </div>
                        :
                        <div className="flex flex-row gap-2 ml-1">
                            <p className="font-medium uppercase text-zinc-600">{doctorData.speciality}</p>
                            <p className="text-gray-600">{doctorData.degree}</p>
                            <button
                                className=" px-3 border
                                 border-white text-xs rounded-full
                                bg-primary text-white transition-all duration-500">{doctorData.experience}
                            </button>
                        </div>
                    }
                </Fragment>
                {/*/!*------------------------Doctor About Dev----------------------*!/*/}
                <Fragment>
                    {
                        edite ?
                            <div className="w-full">
                                <p className="text-m font-medium text-neutral-800 mt-3 mb-3">About</p>
                                <TextEditor
                                    value={doctorData.about}
                                    onChange={(e)=>setDoctorData((prev)=>({...prev,about:e.target.value}))}

                                />

                            </div>
                        : <div>
                            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3 ">About:</p>
                            <p className="text-sm text-gray-600 max-w-[700px] mt-1">{doctorData.about}</p>
                        </div>
                }
                </Fragment>

                {/*/!*-----------------------------------------Doctor Data-----------------------------------------------------*!/*/}
                <Fragment>

                        {edite?
                            <div className="flex flex-col">
                               <div className="flex flex-row items-center mt-4 md:col-auto">
                                <div className="w-full mr-3 ">
                                <label className="text-m font-medium text-neutral-800">Email</label>
                                    <input
                                        required
                                        value={doctorData.email}
                                        onChange={(e) => setDoctorData(prev => ({...prev, email: e.target.value}))}
                                        className="mr-2 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border
                                        border-slate-200 rounded-md px-3 py-3 transition duration-300
                                        ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        type="text" placeholder="Enter Eamil"
                                    />
                                    <div>
                                    </div>
                                    </div>
                                    <div className="w-full">
                                        <label className="text-m font-medium text-neutral-800 mt-3">Phone</label>
                                        <PhoneInput
                                            inputProps={{
                                                required: true,
                                                name: 'phone',
                                            }}
                                            inputClass=" !pl-12 !h-[13%] !w-full !bg-transparent !placeholder:text-slate-400  !text-slate-700 !text-sm !border !border-slate-200 !rounded-md !px-3 !py-3 !transition !duration-300 !ease !focus:outline-none !focus:border-slate-400 !hover:border-slate-300 !shadow-sm !focus:shadow"
                                            country='us'
                                            regions={['america', 'europe', 'asia', 'oceania', 'africa']}
                                            onChange={phone => setDoctorData((prev) => ({...prev, phone: phone}))}
                                            value={doctorData.phone}
                                            enableAreaCodes={true}
                                            enableAreaCodeStretch
                                        />
                                    </div>
                                </div>
                                <label className="text-m font-medium text-neutral-800 mt-3">Fee</label>
                                <input
                                    required
                                    value={doctorData.fess}
                                    onChange={(e) => setDoctorData(prev => ({...prev, fess: e.target.value}))}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    type="text" placeholder="Enter Fee"
                                />
                                <p className="text-m font-medium text-neutral-800 mt-3">Address</p>
                                <div className="flex flex-row items-center ">
                                    <input
                                        required
                                        value={JSON.parse(doctorData.address).line1}
                                        onChange={(e) => setDoctorData((prev) => ({
                                            ...prev, address: {...prev.address, line1: e.target.value},
                                        }))}
                                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        type="text" placeholder="Enter Address"
                                    />
                                    <input
                                        required
                                        value={JSON.parse(doctorData.address).line2}
                                        onChange={(e) => setDoctorData((prev) => ({
                                            ...prev, address: {...prev.address, line2: e.target.value},
                                    }))}
                                    className="w-full ml-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    type="text" placeholder="Enter Address"
                                />
                                </div>
                            </div>
                            : <div className="flex flex-col  py-2 ">
                                <p className="text-sm font-medium text-neutral-800  mt-4 ">Doctor Email : <span
                                    className="text-zinc-600 mx-2">{doctorData.email}</span></p>
                                <p className="text-sm font-medium text-neutral-800  mt-4 ">Phone Number :
                                    <span className="text-zinc-600  mx-2">{doctorData.phone}</span></p>
                                <p className="text-sm font-medium text-neutral-800  mt-4 ">Appointment Fee :<span
                                    className="text-gray-800 mx-2">{currency} {doctorData.fess}</span></p>
                                <p className="text-sm font-medium text-neutral-800  mt-4">Address:</p>
                                <p className="text-sm mt-2 ">
                                {JSON.parse(doctorData.address).line1}
                                <br/>
                                {JSON.parse(doctorData.address).line2}
                            </p>
                        </div>
                        }
                    </Fragment>

                <div className="flex gap-1.5 pt-2 mt-2" >
                    <label className="flex items-center cursor-pointer relative">
                        <input
                               onClick={(e) =>setDoctorData(prev=>({...prev,available:!prev.available}))}
                               value={doctorData.available}
                               type="checkbox"
                               defaultChecked={doctorData.available}
                               className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary " id="check1"/>
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                     stroke="currentColor" strokeWidth="1">
                                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                   </svg>
                                </span>
                    </label>
                        <p className="text-gray-600">Available</p>
                </div>

                {
                    edite ?
                        <button
                            onClick={handelAupDate}
                            className="text-xl mt-3 w-32 h-10 rounded-full border border-zinc-600 bg-white text-zinc-600 relative overflow-hidden group z-10 hover:border-white hover:text-white duration-1000">
                        <span className="absolute bg-primary w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10   group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                            <span className="absolute bg-primary w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                            Save Profile
                        </button>
                        :
                        <button
                            onClick={() => setEdite(true)}
                            className="text-xl mt-3 w-32 h-10 rounded-full border border-zinc-600 bg-white text-zinc-600 relative overflow-hidden group z-10 hover:border-white hover:text-white duration-1000">
                            <span className="absolute bg-primary w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                            <span className="absolute bg-primary w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                            Edite Profile
                        </button>
                }

            </div>
        </div>
    </div>
    )

}

export default DoctorProfile;