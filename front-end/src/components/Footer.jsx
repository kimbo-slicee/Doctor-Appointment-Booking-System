import {assets} from "../assets/assets.js";

const Footer=()=>{
    return(
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            {/*------------Left Section------------*/}
                <div>
                    <img src={assets.logo} alt="" className="mb-5 w-40"/>
                    <p className="w-full md:w-2/3 text-gary-600 leading-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            {/*-----------Center Section------------*/}
                <div>
                    <p className="text-xl font-medium mb-5">Company</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy & Policy</li>
                    </ul>

                </div>
                {/*-----------Right Section------------*/}
                <div>
                    <p className="text-xl font-medium mb-5 uppercase">Get In Touch</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+1-212-456-7890</li>
                        <li>letCode@Company.com</li>
                    </ul>
                </div>
            </div>
                {/*--------------Copyright-------------*/}
            <div>
             <hr/>
                <p className="py-5 text-sm text-center">Copyright © 2024 GreatStack - All Right Reserved.</p>
            </div>
        </div>
    )
}
export default Footer;