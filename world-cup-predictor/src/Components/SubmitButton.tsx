import React from 'react';

export function SubmitButton({ children, onClick }:{
    children: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
    return(
        <div className="pt-[20px]">
            <button className="font-[Poppins] bg-blue-500 hover:bg-blue-600 text-white w-[198px] h-[52px] rounded-[5px] cursor-pointer" onClick={onClick}>{children}</button>
        </div>
        //hover:bg-[#00008B]
    )
}