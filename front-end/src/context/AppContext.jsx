import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';

export const AppContext = createContext(undefined);
const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);

    // Fetch all doctors
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(`${backEndUrl}/api/v1/doctor`);
            console.log(backEndUrl);
            console.log(data);

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

    useEffect(() => {
        getAllDoctors();
    }, []);

    const value = { doctors, currencySymbol };

    return (
        <AppContext.Provider value={value}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
