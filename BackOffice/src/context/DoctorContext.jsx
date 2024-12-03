import {createContext} from "react";
const DoctorContext=createContext(null);
const DoctorContextProvidr=(props)=>{
    const value={}
    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvidr;