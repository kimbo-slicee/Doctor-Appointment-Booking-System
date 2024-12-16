import {createContext} from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext=createContext(null);
const  AppContextProvider=(props)=>{
    const currency="$"
    const months=[" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","sep","Oct","Nov","Dec"];
    // Calculate User Date of Birth Day
    const calcAge=(dob)=>{
        const today=new Date();
        const dateOfBirth=new Date(dob);
        return today.getFullYear() - dateOfBirth.getFullYear();
    }
    // Format Slot Date
    const slotDateFormat=(slotDate)=>{
        const dateArray=slotDate.split('_')
        return `${dateArray[0]} ${months[+dateArray[1]]} ${dateArray[2]}`
    }
    const value={calcAge,slotDateFormat,currency};
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;