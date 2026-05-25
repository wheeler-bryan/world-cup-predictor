import {type Country} from "../assets/countries.ts";
import { MatchupData } from "../assets/seeding.ts";
import { Matchup } from "./Matchup.tsx";
import type { Dispatch, SetStateAction } from "react";

export function MatchupDisplay({ matchups, setMatchups, seedingFunc } : {
    matchups: MatchupData[], // [place][group]
    setMatchups: Dispatch<SetStateAction<(MatchupData)[]>>,
    seedingFunc: (match_number: number) => (number | boolean)[],
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

    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center justify-items-center ml-[3rem] mr-[3rem]">
            {matchups.map((matchup) => (
                <Matchup matchup={matchup} onToggle={onClick} key={"RO32MatchupNo" + matchup.match_number} />
            ))}
        </div>
    )
}