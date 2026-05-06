import React from 'react';

export function ShowRequestsButton( { submitFunction, children } : {
    submitFunction: (showRequests: boolean) => void
    children: string;
}) {

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        submitFunction(true);
    }
    return (
        <div className="pt-[30px]">
            <button className="font-[Poppins] text-white w-[198px] h-[52px] rounded-[5px] bg-blue-500 hover:bg-blue-600" onClick={handleToggle}>{children}</button>
        </div>
    );
}