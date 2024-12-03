import {createContext} from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext=createContext(null);
const  AppContextProvider=(props)=>{
    const value={};
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;