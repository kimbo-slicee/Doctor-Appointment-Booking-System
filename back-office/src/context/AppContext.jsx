import {createContext} from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext=createContext(null);
const  AppContextProvider=(props)=>{
    // Calculate User Date of Birth Day
    const dateOfBirth=(dob)=>{
        const today=new Date();
        const dateOfBirth=new Date(dob);
        return today.getFullYear() - dateOfBirth.getFullYear();
    }
    const value={dateOfBirth};
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;