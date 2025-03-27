import Image from "next/image"

export const Projects: React.FC =() =>{
    const projects =[
        {
            id : 1,
            projectImage: "/images/pizzaInn3.png",
            url: "",
            projectName: "Pizza Inn",
            description : "A web application that allows user to order pizza from already made sets of pizza or customize their own pizza.",
        },
        {
            id : 2,
            projectImage: "/images/skycast1.png",
            url: "https://skycast-flame.vercel.app/",
            projectName: "Skycast",
            description : "A website that shows the current weather conditions , forecasts for the next hours  of the day as well as weather forecasts for the whole week.",
        },
    ]
    return(
        <div className="mt-20">
            <h2 className="text-center text-cyan-300 text-2xl p-3 underline decoration-cyan-300 underline-offset-4 decoration-dotted">PROJECTS</h2>
            <div className="flex flex-row flex-wrap justify-center items-center">
                {projects.map((item) =>(
                    <div className="w-[350px] h-[300px] m-5 pt-5 bg-slate-950 p-2 flex flex-col justify-center items-center rounded-2xl" key={item.id}>
                        <Image width={300} height={150}  src={item.projectImage} alt={item.projectName} ></Image>
                        
                        <div>
                            <p className="w-[300px] text-cyan-300  font-semibold text-lg">{item.projectName}</p>
                            <p className="w-[300px] h-[100px]">{item.description}</p>

                            <p className="flex flex-row justify-end w-[300px] text-cyan-300 ">
                                <a href={item.url} target="blank">PREVIEW  
                                    <span ><svg className="inline ml-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M1.25 8A.75.75 0 0 1 2 7.25h10.19L9.47 4.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H2A.75.75 0 0 1 1.25 8" clip-rule="evenodd"/></svg>
                                    </span>
                                </a>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}