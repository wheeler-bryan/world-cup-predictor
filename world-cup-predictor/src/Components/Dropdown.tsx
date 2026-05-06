
export function Dropdown ({ placeholder, options, value, onChange }:{
    placeholder: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border-[1px] border-[#ececec] border-solid rounded-[7px] w-[325px] text-[14px] font-[Poppins] font-light h-[36px]"
                required
            >
                <option value ="" disabled selected hidden>{placeholder}</option>

                {options.map((options) => (
                    <option value={options}>
                        {options}
                    </option>
                ))}
            </select>
        </>
    )
}
