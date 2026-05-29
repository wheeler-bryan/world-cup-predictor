import "../App.css"
import type {MatchupData} from "../assets/seeding.ts";
import type {Country} from "../assets/countries.ts";
import { FlagButton } from "./FlagButton.tsx";
// " • "

export function Matchup({ matchup, onToggle, winner, type } : {
    matchup: MatchupData,
    onToggle: (country: Country, match_number: number) => void,
    winner: Country | null,
    type: string
}) {

    const size: string = (type === "RO32" || type === "RO16") ? "w-[22rem] h-[8rem] max-w-[30rem]" :
        (type === "QF") ? "w-[22rem] h-[11rem] max-w-[30rem]" :
            (type === "SF") ? "md:w-[30rem] md:h-[11rem] md:max-w-[40rem] h-[11rem] w-[22rem]" : "w-[30rem] h-[11rem] max-w-[40rem]";

    return(
        <div className={`flex flex-col justify-around pb-[0.7rem] items-center bg-gray-300 rounded-3xl ${size}`}>
            <h5 className="text-[1rem] pt-[0.33rem] text-center">{"Match " + matchup.match_number.toString() + " • " + matchup.date}</h5>
            <div className={`flex justify-center items-center gap-5 m-[0.75rem]`}>
                <FlagButton onToggle={onToggle}
                            country={matchup.home}
                            match_number={matchup.match_number}
                            key={"MatchupButtonHome" + matchup.match_number.toString()}
                            winner={winner?.name === matchup.home?.name}
                            placeholder={matchup.home_placeholder}
                            type={type} />

                <FlagButton onToggle={onToggle}
                            country={matchup.away}
                            match_number={matchup.match_number}
                            key={"MatchupButtonAway" + matchup.match_number.toString()}
                            winner={winner?.name === matchup.away?.name}
                            placeholder={matchup.away_placeholder}
                            type={type} />
            </div>
        </div>
    )
}