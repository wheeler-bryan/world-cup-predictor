import {type Country} from "../assets/countries.ts";
import { MatchupData } from "../assets/seeding.ts";
import { Matchup } from "./Matchup.tsx";
import type { Dispatch, SetStateAction } from "react";

export function MatchupDisplay({ matchups, setMatchups, seedingFunc, nextMatchups, type } : {
    matchups: MatchupData[],
    setMatchups: Dispatch<SetStateAction<(MatchupData)[]>>,
    seedingFunc: (match_number: number) => (number | boolean)[],
    nextMatchups: MatchupData[],
    type: string,
} ) {

    const onClick = (country: Country, match_number: number) => {

        //find the matchup with that country and set it as the winner
       const [index, home] = seedingFunc(match_number);

        setMatchups(prev => prev.map((matchup, i) =>
            i === index ?
                ((home) ? { ...matchup, home: country } : { ...matchup, away: country })
                : matchup
        ))
        console.log(country.name + " selected")
    }

    const grid_size: string = (type === "RO" || type === "QF") ? "md:grid-cols-4 gap-4" : "md:grid-cols-2 gap-4"

    return(
        <div className={`grid grid-cols-1 ${grid_size} items-center justify-items-center ml-[3rem] mr-[3rem]`}>
            {matchups.map((matchup) => (
                <Matchup matchup={matchup}
                         onToggle={onClick}
                         key={"RO32MatchupNo" + matchup.match_number}
                         winner={(matchup.winner_location[1] === 0) ? nextMatchups[matchup.winner_location[0]].home : nextMatchups[matchup.winner_location[0]].away}
                         type={type}
                />
            ))}
        </div>
    )
}