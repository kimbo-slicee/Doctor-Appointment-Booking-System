import {Route,Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/about";
import Doctors from "./pages/Doctors.jsx";
import Login from "./pages/Login.jsx"
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
import Appointment from "./pages/Appointment.jsx";
import MyAppointments from "./pages/MyAppointment";
import NavBar from "./components/navBar";
import Footer from "./components/Footer.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
    return (
    <div className="mx-4 sm:mx-[5%]">
        <ToastContainer/>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:speciality" element={<Doctors/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/appointment/:docId" element={<Appointment/>}/>
        <Route path="/myAppointments" element={<MyAppointments/>}/>
      </Routes>
    <Footer/>
    </div>
    )
  }