import {assets} from "../../assets/assets.js";

const AddDoc=()=>{
 return(
     <form className="mb-3 w-full ">
         <p className=" mb-3 text-center text-primary font-medium ">ADD NEW DOCTOR</p>
         <div className="bg-white px-8 py-8 border rounded w-full max-w-full max-h-[80vh] overflow-scroll">
             <div className="flex items-center gap-4 mb-8 text-gray-500 ">
                 <label htmlFor="profile_pic">
                     <img className="w-16 bg-gray-50 rounded-full  cursor-pointer" src={assets.upload_area} alt="apload images"/>
                 </label>
                 <input type="file" name="profile_pic" id="profile_pic" accept=".jpg, .jpeg, .png" hidden/>
                 <p>Upload doctor<br/>picture</p>
             </div>
             <div className=" ">
                 <div>
                     <div>
                         <p>Doctor Name</p>
                         <input type="text" placeholder="name" required/>
                     </div>
                     <div>
                         <p>Doctor Email</p>
                         <input type="text" placeholder="Your email" required/>
                     </div>
                     <div>
                         <p>Doctor Phone Number</p>
                         <input type="text" placeholder="Phone Number" required/>
                     </div>
                     <div>
                         <p>Doctor Password</p>
                         <input type="text" placeholder="Password" required/>
                     </div>
                     <div>
                         <p>Experience</p>
                         <select name="Experience">
                             <option value="1 Year">1 Year</option>
                             <option value="2 Year">2 Year</option>
                             <option value="3 Year">3 Year</option>
                         </select>
                     </div>
                     <div>
                        <p>Fees</p>
                         <input type="number" placeholder="fees" required/>
                     </div>
                     <div>
                         <div>
                             <p>Speciality</p>
                             <select name="Speciality">
                                 <option value='General Physician'>General Physician</option>
                                 <option value='Gynecologist'>Gynecologist</option>
                                 <option value='Dermatologist'>Dermatologist</option>
                                 <option value='Pediatricians'>Pediatricians</option>
                                 <option value='Neurologist'>Neurologist</option>
                                 <option value='Gastroenterologist'>Gastroenterologist</option>
                             </select>
                         </div>
                         <div>
                             <p>Eduction</p>
                             <input type="text" placeholder="Eduction" required/>
                         </div>
                         <div>
                             <p>Address</p>
                             <input type="text" placeholder="Addesss 1" required/>
                             <input type="text" placeholder="Addesss 2" required/>
                         </div>
                     </div>
                     <div>
                         <p>About</p>
                         <textarea rows={5} placeholder="write about yourself..."/>
                     </div>
                     <button>Add Doctor </button>
                 </div>
             </div>
         </div>
     </form>
 )
}
export default AddDoc;