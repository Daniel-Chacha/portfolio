'use client'

import { Hexagon } from "./hexagon"
import Link from "next/link"

export  const Header: React.FC =() =>{
    const handleScroll =(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) =>{
        e.preventDefault(); //prevents default anchor behaviour

        const headerHeight = 63;
        const element = document.getElementById(id);
        if(element){
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - headerHeight,
              behavior: "smooth",
            });
        }
    }
    return(
        <header className="flex flex-row fixed bg-slate-950 justify-between items-center p-3 font-semibold w-full z-10">
           <Hexagon />

            <div className=" flex flex-row w-[40vw] justify-around text-cyan-300">
                <h1 className="cursor-pointer ">
                    <Link href="#home" onClick={(e) =>handleScroll(e , 'home')}>Home</Link>
                </h1>
                <h1 className="cursor-pointer ">
                    <Link href="#skillset" onClick={(e) => handleScroll(e, 'skillset')}>Skillset</Link>
                </h1>
                <h1 className="cursor-pointer ">
                    <Link href="#projects" onClick={(e) => handleScroll(e, 'projects')}>Projects</Link>
                </h1>
                <h1 className="cursor-pointer ">
                    <Link href="#blogs" onClick={(e) => handleScroll(e, 'blogs')}>Blogs</Link>
                </h1>
                <h1 className="cursor-pointer ">
                    <Link href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</Link>
                </h1>
            </div>
        </header>
    )
}

