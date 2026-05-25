import "../App.css"
import type {MatchupData} from "../assets/seeding.ts";
import type {Country} from "../assets/countries.ts";
import { FlagButton } from "./FlagButton.tsx";
// " • "

export function Matchup({ matchup, onToggle, winner } : {
    matchup: MatchupData,
    onToggle: (country: Country, match_number: number) => void,
    winner: Country | null
}) {

    const onClick = (country: Country, match_number: number) => {
        onToggle(country, match_number);
    }
    return(
        <div className="bg-gray-300 rounded-3xl w-[22rem] h-[8rem] max-w-[30rem]">
            <h5 className="text-[1rem] text-center">{"Match " + matchup.match_number.toString() + " • " + matchup.date}</h5>
            <div className={`flex justify-center items-center gap-5 m-[0.75rem]`}>
                <FlagButton onToggle={onClick}
                            country={matchup.home}
                            match_number={matchup.match_number}
                            key={"MatchupButtonHome" + matchup.match_number.toString()}
                            winner={winner === matchup.home}
                            placeholder={matchup.home_placeholder} />

                <FlagButton onToggle={onClick}
                            country={matchup.away}
                            match_number={matchup.match_number}
                            key={"MatchupButtonAway" + matchup.match_number.toString()}
                            winner={winner === matchup.away}
                            placeholder={matchup.away_placeholder} />
            </div>
        </div>
    )
}