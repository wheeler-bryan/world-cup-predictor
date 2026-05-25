import "../App.css"
import type { Country } from "../assets/countries.ts";

export function FlagButton({ onToggle, country, match_number, winner, placeholder, type } : {
    onToggle: (country: Country, match_number: number) => void,
    country: Country | null,
    match_number: number,
    winner: boolean,
    placeholder: string,
    type: string,
}) {

    const color: string = (winner) ? "bg-green-200 hover:bg-green-300 border-2 border-green-600" : "bg-[#ececec] hover:bg-[#e0e0e0]";

    const sizing: string = (type === "RO") ? "w-[10rem] h-[5rem]" :
        (type === "QF") ? "w-[10rem] h-[8rem]" : "w-[10rem] h-[5rem]";
    const flag_height: string = (type === "RO") ? "80rem" :
        (type === "QF") ? "100rem" : "80rem";
    const flag_width: string = (type === "RO") ? "60rem" :
        (type === "QF") ? "75rem" : "60rem";


    return (
        (country) ?
        <button onClick={() => onToggle(country, match_number)}>
            <div className={`flex flex-col items-center justify-center rounded-2xl ${sizing} ${color}`}>
                <img className="pt-[0.5rem]" src={country.flag} alt={country.name + "flag"}
                     height={flag_height} width={flag_width} />
                <h3 className="text-center">{country.name}</h3>
            </div>
        </button> :
        <h4 className="text-center max-w-[7rem]">{placeholder}</h4>
    );
}