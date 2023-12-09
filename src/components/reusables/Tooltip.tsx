import { ReactNode } from "react";

export default function Tooltip({ message, children }:{message:string,children:ReactNode}) {
    return (
    <div className="group relative flex">
        {children}
        <span className="absolute   whitespace-nowrap z-20 bottom-5 left-[100%] scale-0 transition-all rounded
         bg-teal-500 p-2 px-4 text-sm font-semibold  text-white group-hover:scale-100">{message}</span>
    </div>
    )
}