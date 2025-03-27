import Image from "next/image"

export const Skillset: React.FC =() =>{
    const stacks_dict = [{
        id: 1,
        url : "/images/reactjs.png",
        stack_name: "React.JS",
        itemWidth : 80,
        itemHeight : 80,
    },{
        id: 2,
        url : "/images/NEXT.png",
        stack_name: "Next.JS",
        itemWidth : 80,
        itemHeight : 80,
    },{
        id: 3,
        url : "/images/tailwind2.png",
        stack_name: "Tailwind CSS",
        itemWidth : 90,
        itemHeight : 90,
    },{
        id: 4,
        url : "/images/nodejs.png",
        stack_name: "Node.JS",
        itemWidth : 110,
        itemHeight : 100,
    },{
        id: 5,
        url :  "/images/django.png",
        stack_name: "Django",
        itemWidth : 60,
        itemHeight : 60,
    },{
        id: 6,
        url : "/images/postgress.png",
        stack_name: "PostgreSQL",
        itemWidth : 80,
        itemHeight : 80,
    },{
        id: 7,
        url : "/images/mysql.png",
        stack_name: "MySql",
        itemWidth : 80,
        itemHeight : 80,
    },{
        id: 8,
        url : "/images/mongodb.png",
        stack_name: "Mongo DB",
        itemWidth : 80,
        itemHeight : 80,
    },{
        id: 9,
        url : "/images/primsa2.png",
        stack_name: "Prisma",
        itemWidth : 90,
        itemHeight : 100,
    },{
        id: 10,
        url : "/images/js.png",
        stack_name: "Javascript",
        itemWidth : 130,
        itemHeight : 80,
    },{
        id: 11,
        url : "/images/typescript.png",
        stack_name: "TypeScript",
        itemWidth : 70,
        itemHeight : 80,
    }];

    return(
        <div className="flex flex-col justify-center items-center mb-8 bg-slate-950">
            <h2 className="text-center text-cyan-300 text-2xl p-3 underline decoration-cyan-300 underline-offset-2 decoration-dotted">SKILLSET</h2>
            <div className="flex flex-row flex-wrap w-[70vw] items-center justify-center">
                {stacks_dict.map((item) =>(
                    <div className="relative group m-3 flex flex-col items-center" key={item.id}>
                        <p className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-semibold">{item.stack_name}</p>
                        <Image className="block " width={item.itemWidth} height={item.itemHeight} src={item.url} alt={item.stack_name}></Image>
                    </div>
                ))}
            </div>
        </div>
    )
}