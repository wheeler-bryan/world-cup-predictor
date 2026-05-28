import React from 'react';
import "../App.css"

export function SubmitButton({ children, onClick, color, submissionError }:{
    children: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    color?: string,
    submissionError?: string,
}) {

    const bg_color: string = (color) ? color : "bg-blue-500 hover:bg-blue-600";

    return(
        <div className="flex flex-col justify-center items-center pt-[20px]">
            <button className={`font-[Poppins] ${bg_color} text-white w-[198px] h-[52px] rounded-[5px] cursor-pointer`} onClick={onClick}>{children}</button>
            <h2 className="pt-[1rem] text-red-700 text-center">{submissionError}</h2>
        </div>
        //hover:bg-[#00008B]
    )
}