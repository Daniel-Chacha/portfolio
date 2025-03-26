import { Hexagon } from "./hexagon"

export  const Header: React.FC =() =>{
    return(
        <header className="flex flex-row bg-[#0F0F2D] fixed justify-between p-5 font-semibold w-full z-10">
           <Hexagon />

            <div className=" flex flex-row w-[40vw] justify-around ">
                <h1 className="cursor-pointer ">About</h1>
                <h1 className="cursor-pointer ">Skillset</h1>
                <h1 className="cursor-pointer ">Projects</h1>
                <h1 className="cursor-pointer ">Blogs</h1>
                <h1 className="cursor-pointer ">Contact</h1>
            </div>
        </header>
    )
}

