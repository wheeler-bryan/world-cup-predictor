export function Cell({ children } : {
    children: string;
}) {
    return (
        <>
            <td className="border-[1px] border-black py-[5px] px-[20px] font-[Poppins] text-[14px] font-light text-center whitespace-normal break-words max-w-[100px]">{children}</td>
        </>
    )
}