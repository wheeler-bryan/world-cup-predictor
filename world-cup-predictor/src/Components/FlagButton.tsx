import "../App.css"
import type { Country } from "../assets/countries.ts";

export function FlagButton({ onToggle, country, match_number, winner, placeholder } : {
    onToggle: (country: Country, match_number: number) => void,
    country: Country | null,
    match_number: number,
    winner: boolean,
    placeholder: string,
}) {

    const color: string = (winner) ? "bg-green-200 hover:bg-green-300 border-2 border-green-600" : "bg-[#ececec] hover:bg-[#e0e0e0]";

    return (
        (country) ?
        <button onClick={() => onToggle(country, match_number)}>
            <div className={`flex flex-col items-center justify-center rounded-2xl w-[10rem] h-[5rem] ${color}`}>
                <img className="pt-[0.5rem]" src={country.flag} alt={country.name + "flag"}
                     height="80rem" width="60rem"/>
                <h3 className="text-center">{country.name}</h3>
            </div>
        </button> :
        <h4 className="text-center max-w-[7rem]">{placeholder}</h4>
    );
}