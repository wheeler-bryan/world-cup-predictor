
export function Header({  className, children }: { className?: string; children: string}){
    return (
        <h2 className={`font-[Poppins] text-[15px] pt-[20px] pb-[3px] ${className ?? ""}`}>{children}</h2>
    )
}