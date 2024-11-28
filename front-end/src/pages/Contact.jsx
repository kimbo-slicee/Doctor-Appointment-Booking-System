import React from 'react'
import {assets} from "../assets/assets.js";

function Contact() {
  return (
     <div>
    <div className=" text-center text-2xl pt-10 text-gray-500">
      <p className="font-semibold uppercase text-primary">CONTACT<span className="mx-1">US</span></p>
    </div>

       <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
         <img src={assets.contact_image} alt="" className="w-full md:max-w-[360px]"/>
       <div className="flex flex-col justify-center items-start gap-6 ">
         <p className="font-semibold text-lg text-primary ">OUR OFFICE</p>
         <p className="text-gray-500">54709 Willms Station </p> <br/>Suite 350, Washington, USA
         <p className="text-gray-500">Tel: (415) 555‑0132</p> <br/>Email: greatstackdev@gmail.com
         <p className="font-semibold text-lg text-primary uppercase ">Careers at PRESCRIPTO</p>
         <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button className="border border-primary px-8 py-4 bg-primary text-white
          cursor-pointer text-sm hover:scale-110 transition-all duration-500 ease-linear ">Explore Jobs</button>
     </div>
       </div>
     </div>
  )
}

export default Contact