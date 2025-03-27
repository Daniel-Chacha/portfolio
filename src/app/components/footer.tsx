'use client'
import { useEffect,useState } from "react"

export const Footer:React.FC = () =>{
    const [currentYear, setCurrentYear] = useState<number>();
    useEffect(() =>{
         setCurrentYear(new Date().getFullYear());
    },[])
    return(
        <div className="bg-slate-950 mt-20 p-5">
            <p className="text-center text-sm">COPYRIGHT &copy; <span className="text-cyan-300 font-semibold">{currentYear}  DANIEL CHACHA MWITA;</span> ALL RIGHTS RESERVED</p>
        </div>
    )
}