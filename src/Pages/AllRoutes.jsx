import {Route,Routes} from "react-router-dom"
import Contacts from "./Contacts"
import EditContact from "../Components/Edit_Contact"
import ContactForm from "../Components/ContactForm"
import Attendance from "../Components/Attendance"
const AllRoutes=()=>{


    return(
        <Routes >
            <Route path="/" element={<Contacts/>}/>
            <Route path="/contact_form" element={<ContactForm/>}/>
            <Route path="/edit/:id" element={<EditContact/>}/>
            <Route path="/attendance_form" element={<Attendance/>}/>
        </Routes>
    )
}

export default AllRoutes