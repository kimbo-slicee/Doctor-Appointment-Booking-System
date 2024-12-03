import Login from "./pages/Login.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Fragment, useContext} from "react";
import {AdminContext} from "./context/AdminContext.jsx";
import {NavBar} from "./components/NavBar.jsx";
const App = () => {
    const {adminToken}=useContext(AdminContext);
    return adminToken
        ? (
        <div className="bg-[#F8F9FD]">
            <ToastContainer/>
            <NavBar/>
        </div>
    )
    :(
        <Fragment>
            <ToastContainer/>
            <Login/>
        </Fragment>
     )
}
export default App ;
