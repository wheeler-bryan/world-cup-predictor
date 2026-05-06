export function TableHeader({ children } : {
    children: string;
}) {
    return(
        <th className="px-[20px] py-[5px]">{children}</th>
    )
}