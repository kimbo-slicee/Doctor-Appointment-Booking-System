import {Route,Routes} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Doctors from "./pages/doctors";
import Login from "./pages/Login"
import Profile from "./pages/profile";
import Contact from "./pages/contact";
import Appointment from "./pages/appointment";
import MyAppointments from "./pages/MyAppointment";
import NavBar from "./components/navBar";
export default function App() {
    return (
    <div>
      <NavBar/>
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
    </div>
    )
  }