
export const Hexagon: React.FC = () =>{
    return(
        <div className="relative w-10 h-10 ">
            <svg viewBox="0 0 100 100" className=" absolute inset-0 w-full h-full">
                <polygon
                    points="50 5, 95 25, 95 75, 50 95, 5 75, 5 25"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={7}
                    className="text-cyan-300"
                ></polygon>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-cyan-300 font-bold text-xl">D</div>
        </div>
    )
}