import React from 'react';
import "../App.css"

export function SubmitButton({ children, onClick, color, submissionError, pt, width }:{
    children: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    color?: string,
    submissionError?: string,
    pt?: string,
    width?: string,
}) {

    const bg_color: string = (color) ? color : "bg-blue-500 hover:bg-blue-600";
    const new_width: string = (width) ? width : "w-[12.375rem] h-[3.25rem]"
    const pt_passed: string = (pt) ? pt : "pt-[20px]";

    return(
        <div className={`flex flex-col justify-center items-center ${pt_passed}`}>
            <button className={`font-[Poppins] ${bg_color} ${new_width} text-white rounded-[5px] cursor-pointer`} onClick={onClick}>{children}</button>
            <h2 className="pt-[1rem] text-red-700 text-center">{submissionError}</h2>
        </div>
        //hover:bg-[#00008B]
    )
}