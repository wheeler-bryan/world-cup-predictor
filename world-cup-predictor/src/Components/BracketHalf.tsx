import "../App.css"
import { Country } from "../assets/countries.ts";
import {
    eliminated_qf,
    eliminated_ro16, eliminated_sf,
    winners_qf,
    winners_round_of_16,
    winners_round_of_32, winners_sf
} from "../assets/results.ts"

export function BracketHalf({ country, label, details } : {
    country: Country,
    label: string,
    details: number,
}) {
    const color: string = label === 'R32' ?
            details >= 3 ? "bg-green-200" : details > 0 ? "bg-yellow-200" : "bg-red-200" :
        label === 'R16' ?  winners_round_of_32.some(c => c.name === country.name) ? "bg-green-200" : "bg-red-200" :
        label === 'QF' ?  winners_round_of_16.some(c => c.name === country.name) ? "bg-green-200" :
            eliminated_ro16.some(c => c.name === country.name) ? "bg-red-300" : "" :
        label === 'SF' ?  winners_qf.some(c => c.name === country.name) ? "bg-green-200" :
            eliminated_qf.some(c => c.name === country.name) ? "bg-red-300" : "" :
        label === 'F' ?  winners_sf.some(c => c.name === country.name) ? "bg-green-200" :
            eliminated_sf.some(c => c.name === country.name) ? "bg-red-300" : ""
        : "";

    return(
        <div className={`flex ${color} items-center gap-1 rounded-xl pl-1.5`}>
            <img src={country.flag} alt={country.abbreviation}
                         className="rounded-sm object-cover shrink-0"
                         style={{ width: '1rem', height: '0.7rem'}} />
            <span className="text-xs font-mono text-gray-700 truncate">{country.abbreviation}</span>
        </div>
    )
}