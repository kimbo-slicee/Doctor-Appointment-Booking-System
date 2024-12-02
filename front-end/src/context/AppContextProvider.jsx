import {createContext} from "react";
import {doctors} from "../assets/assets.js";
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext=createContext();
const AppContextProvider=(props)=>{
    const currencySymbol='$';

    const value={doctors,currencySymbol}
        return(
            <AppContext.Provider value={value}>
                {/* eslint-disable-next-line react/prop-types */}
                {props.children}
            </AppContext.Provider>
        )
 }
 export  default AppContextProvider;