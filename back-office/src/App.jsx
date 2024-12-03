import Login from "./pages/Login.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Fragment, useContext} from "react";
import {AdminContext} from "./context/AdminContext.jsx";
import {NavBar} from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";
import {Route, Routes} from "react-router-dom";
import DashBoard from "./pages/admin/DashBoard.jsx";
import Appointments from "./pages/admin/Appointments.jsx";
import DocLists from "./pages/admin/DocLists.jsx";
import AddDoc from "./pages/admin/AddDoc.jsx";



const App = () => {
    const {adminToken}=useContext(AdminContext);
    return adminToken
        ? (
        <div className="bg-[#F8F9FD]">
            <ToastContainer/>
            <NavBar/>
            <div className="felx items-start max-w-sm">
                <SideBar/>
                <Routes>
                    <Route path="/" element={<></>}/>
                    <Route path="/DashBoard" element={<DashBoard/>}/>
                    <Route path="/AddDoctors" element={<AddDoc/>}/>
                    <Route path="/DoctorsList" element={<DocLists/>}/>
                    <Route path="/Appointments" element={<Appointments/>}/>
                </Routes>
            </div>
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
