
export function InputBox({ value, setState, placeholder, type="text" }: {
    value: string;
    setState: (value: string) => void;
    placeholder: string;
    type?: string;
}) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setState(input)
    };

    return (
        <input
            className={`h-[48px] w-[25rem] border-[1px] border-[#ececec] border-solid hover:border-[#a2cafe] rounded-[5px] py-[5px] pr-[5px] pl-[15px] text-[14px] font-[Poppins] shadow-2xl }`}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required
            type={type}
        />
    );
}