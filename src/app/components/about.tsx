import Image from "next/image"

export const About:React.FC = () =>{
    return(
        <div id="home" className="flex flex-row h-[100vh] justify-center items-center">
            <div className="w-[50vw]">
                <p className="text-md text-cyan-300">Hello, I am</p>
                <p className="text-4xl tracking-widest "> Daniel Chacha</p>
                <p className="text-5xl py-2 "> A Fullstack Web Developer</p>
                <p className="text-4xl py-2"></p>

                <p className="font-semibold">Skilled at  crafting sleek, fast, scalable, and user-focused websites that offer seamless digital experiences. Let’s build something great together—one line of code at a time </p>

                <div className="mt-10">
                    <a className="bg-slate-950 text-cyan-300 p-3 border " href="https://www.linkedin.com/in/daniel-mwita-5b58102b5/">LinkedIn</a>
                    <a className="bg-slate-950 text-cyan-300 p-3  border" href="https://www.instagram.com/_daniel.chacha_/">Instagram</a>
                    <a className="bg-slate-950 text-cyan-300 p-3 border " href="https://wa.me/254791819104">Whatsapp</a>
                </div>
            </div>

            <div className="flex items-center justify-center group ">
                <div className=" relative p-2  transform transition-all duration-300 hover:scale-105  hover:rotate-3 hover:shadow-xl">
                    {/* <div   className="overflow-hidden rounded-full border-4 border-cyan-300  shadow-lg transition-all duration-300 group-hover:shadow-2xl"> */}
                        <div className="absolute inset-0 w-[310px] h-[310px] bg-gradient-to-r from-cyan-300 via-cyan-300 to-cyan-300 rounded-full blur-lg animate-pulse "></div>
                        <Image className="rounded-full brightness-90 contrast-125 saturate-150 hover:brightness-100 hover:contrast-100 hover:saturate-200 transition-all duration-300" width={300}  height={300} src={"/images.jpeg"} alt="Daniel Chacha" quality={90}></Image>
                
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}