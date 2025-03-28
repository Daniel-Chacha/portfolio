'use client'
import { useState } from "react"
import emailjs from "emailjs-com";
import Image from "next/image"
import { error } from "console";


export const Contact: React.FC = () =>{
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit =async(e: React.FormEvent) =>{
        e.preventDefault();

        if(!formData.name || !formData.email || !formData.message ){
            setStatus("Please Fill in all the fields.")
            return;
        }

        try{
            const serviceId ="service_3fddnds"   //EmailJS service ID
            const templateId = "template_wfx0ld5"  //EmailJS template ID
            const userId = "ExdUNNBFTY_zPmfsF"      //EmailJS public key

            await emailjs.send(serviceId, templateId, formData, userId);
            setStatus("✅ Message Sent Successfully.");
            setFormData({name: "", email: "" ,message: ""})         //clear form after sending
        }catch(error){
            console.error("Error sending email.", error);
            setStatus("❌ Error sending message. Please Try Again.");
        }
    };
    return(
        <div id="contact" className="mt-14">
            <h2  className="text-center text-cyan-300 text-2xl p-3 underline decoration-cyan-300 underline-offset-4 decoration-dotted">GET IN TOUCH</h2>
            <div className="flex flex-row flex-wrap justify-around items-center">
                <div >
                    <p className="font-bold text-cyan-300">Email Me.</p>
                    <form onSubmit={handleSubmit}>
                        <input name="name" value={formData.name} onChange={handleChange} className="block bg-slate-950 my-3 w-[410px] rounded-xl h-10 pl-7  border-[0.7px] border-gray-500 " type="text" placeholder="Enter your Name..."/>
                        <input name="email" value={formData.email} onChange={handleChange} className="block bg-slate-950 my-3 w-[410px] rounded-xl h-10 pl-7  border-[0.7px] border-gray-500" type="email" placeholder="Enter your Email..." />
                        <textarea name="message" value={formData.message} onChange={handleChange} className="block bg-slate-950 my-3 w-[410px] rounded-xl h-40 pl-7 pt-3  border-[0.7px] border-gray-500" id="message"  placeholder="Write your message here..."></textarea>
                        <button className="block relative w-full cursor-pointer" type="submit">
                            <svg className="absolute right-10" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <path fill="#1bf5e7" d="M4.176 2.164C2.988 1.57 1.671 2.7 2.077 3.965l2.858 8.883a1 1 0 0 0 .787.68l11.869 1.979c.557.093.557.893 0 .986L5.723 18.471a1 1 0 0 0-.788.68l-2.858 8.886c-.407 1.265.91 2.395 2.099 1.801L29.17 17.343c1.106-.553 1.106-2.13 0-2.684z"/>
                            </svg>
                        </button>
                    </form>
                    {status && 
                        <p className="mt-3 text-sm font-bold text-cyan-300">{status}</p>
                    }
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row lg:h-10 justify-between items-center  lg:w-[30vw] w-[50vw] ">
                            <a href="https://www.instagram.com/_daniel.chacha_/" target="blank" className="mr-1 lg:m-0">
                                <Image src={'/images/instagram.jpeg'} width={40} height={30} alt="Instagram" className="rounded-xl " ></Image>
                            </a>

                            <a href="https://x.com/dan_mwita8" target="blank" className="mr-1 lg:m-0">
                                <Image src={'/images/x.png'} width={40} height={30} alt="X" className="rounded-xl"></Image>
                            </a>

                            <a href="https://www.linkedin.com/in/daniel-mwita-5b58102b5/" target="blank" className="mr-1 lg:m-0">
                                <Image src={'/images/linkedIn.png'} width={40} height={30} alt="LinkedIn" className="rounded-xl"></Image>
                            </a>

                            <a href="https://github.com/Daniel-Chacha" target="blank" className="mr-1 lg:m-0">
                                <Image src={'/images/github.png'} width={40} height={30} alt="Github" className="rounded-xl "></Image>
                            </a>

                            <a href="https://discord.com/dan_mw8/" target="blank" >
                                <Image src={'/images/discord.png'} width={40} height={30} alt="Discord" className="rounded-xl"></Image>
                            </a>

                    </div>
                    <a  href="https://wa.me/254791819104" target="blank" className="border border-cyan-300 flex mt-20 p-4 bg-slate-950  text-cyan-300 font-semibold">
                    <span className="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="64" strokeDashoffset="64" d="M8 3c0.5 0 2.5 4.5 2.5 5c0 1 -1.5 2 -2 3c-0.5 1 0.5 2 1.5 3c0.39 0.39 2 2 3 1.5c1 -0.5 2 -2 3 -2c0.5 0 5 2 5 2.5c0 2 -1.5 3.5 -3 4c-1.5 0.5 -2.5 0.5 -4.5 0c-2 -0.5 -3.5 -1 -6 -3.5c-2.5 -2.5 -3 -4 -3.5 -6c-0.5 -2 -0.5 -3 0 -4.5c0.5 -1.5 2 -3 4 -3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/><animateTransform id="lineMdPhoneCallLoop0" fill="freeze" attributeName="transform" begin="0.6s;lineMdPhoneCallLoop0.begin+2.7s" dur="0.5s" type="rotate" values="0 12 12;15 12 12;0 12 12;-12 12 12;0 12 12;12 12 12;0 12 12;-15 12 12;0 12 12"/></path><path strokeDasharray="4" strokeDashoffset="4" d="M15.76 8.28c-0.5 -0.51 -1.1 -0.93 -1.76 -1.24M15.76 8.28c0.49 0.49 0.9 1.08 1.2 1.72"><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdPhoneCallLoop0.begin+0s" dur="2.7s" keyTimes="0;0.111;0.259;0.37;1" values="4;0;0;4;4"/></path><path strokeDasharray="6" strokeDashoffset="6" d="M18.67 5.35c-1 -1 -2.26 -1.73 -3.67 -2.1M18.67 5.35c0.99 1 1.72 2.25 2.08 3.65"><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdPhoneCallLoop0.begin+0.2s" dur="2.7s" keyTimes="0;0.074;0.185;0.333;0.444;1" values="6;6;0;0;6;6"/></path></g></svg>
                    </span>
                    +254 791 819 104</a>
                </div>

            </div>
        </div>
    )
}