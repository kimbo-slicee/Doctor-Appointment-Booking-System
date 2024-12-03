import {assets} from "../assets/assets.js";
import {useState} from "react";
const Login=()=>{
    const [state,setState]=useState("admin")
    return(
        <form className="min-h-[80vh] felx items-center">
            <div className="flex flex-col gap-3 m-auto ">
                <p><span> Hello {state}Login</span></p>
                <div>
                    <p>Email</p>
                    <input type="text" required/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" required/>
                </div>
            </div>
        </form>
    )
}
export default Login