
export function Checkbox({ children, value, setState }: {
    children: string;
    value: boolean;
    setState: (newState: boolean) => void;
})  {
    return (
        <>
            <div className="flex flex-col gap-[10px] font-[Poppins] text-[14px] font-light pt-[7px] hover:border-[#a2cafe] ">
                <label htmlFor="cb">{children}</label>
                <input id="cb"
                       className="border-[#ececec]"
                       type="checkbox"
                       checked={value} onChange={(e)=>setState(e.target.checked)}
                />
            </div>

        </>
    )
}
