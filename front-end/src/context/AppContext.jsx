import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';

export const AppContext = createContext(undefined);
const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [token,setToken]=useState(localStorage.getItem("userToken")?localStorage.getItem("userToken"):false);
    const [userData,setUserData]=useState(false);
    // Fetch all doctors
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(`${backEndUrl}/api/v1/doctor`);
            if (data.success) {
                if (!data.allDoctors || data.allDoctors.length === 0) {
                    toast.info('Doctor List is Empty', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                } else {
                    setDoctors(data.allDoctors);
                }
            } else {
                toast.error('Failed to fetch doctor data');
            }
        } catch (error) {
            console.error(error);
            toast.error(`Error: ${error.message}`);
        }
    };
    // User Profile Component
    const loadUserProfile=async ()=>{
        try{
        const {data}=await axios.get(`${backEndUrl}/api/v1/user/profile`,{headers: {Authorization: `Bearer ${token}`}});
        setUserData(data["data"]);
        }catch (error){
            console.log(error);
            toast(error.response.data["message"],{type:"error"});
        }
    }

    useEffect(() => {
        getAllDoctors();
    }, []);
    useEffect(() => {
        if(token){
        loadUserProfile();
        }else {
            setUserData(false);
        }
    }, [token]);

    const value = {getAllDoctors,doctors, currencySymbol,token,setToken ,backEndUrl,userData,setUserData,loadUserProfile};

    return (
        <AppContext.Provider value={value}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
