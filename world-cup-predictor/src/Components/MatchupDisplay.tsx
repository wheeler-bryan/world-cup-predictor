import {type Country} from "../assets/countries.ts";
import { MatchupData } from "../assets/seeding.ts";
import { Matchup } from "./Matchup.tsx";
import type { Dispatch, SetStateAction } from "react";

export function MatchupDisplay({ matchups, setMatchups, seedingFunc, nextMatchups, type, checkKO } : {
    matchups: MatchupData[],
    setMatchups: Dispatch<SetStateAction<(MatchupData)[]>>,
    seedingFunc: (match_number: number) => (number | boolean)[],
    nextMatchups: MatchupData[],
    type: string,
    checkKO: (c: string, thirdWipe?: boolean, type?: string) => void
} ) {

    const onToggle = (country: Country, match_number: number) => {

        //find the matchup with that country and set it as the winner
       const [index, home] = seedingFunc(match_number);

        setMatchups(prev => prev.map((matchup, i) =>
            i === index ?
                ((home) ? { ...matchup, home: country } : { ...matchup, away: country })
                : matchup
        ))
        const curr_matchup: MatchupData = matchups.filter(m => m.match_number === match_number)[0];
        const loser: (string | undefined) = (curr_matchup.home?.name === country.name) ? curr_matchup.away?.name : curr_matchup.home?.name;
        if (loser) {
            checkKO(loser, false, type); // check for the country that lost to be swept out
        }
        console.log(country.name + " selected");
    }

    const grid_size: string = (type === "RO32" || type === "RO16" || type === "QF") ? "md:grid-cols-4" :
        (type === "SF") ? "md:grid-cols-2" : ""

    return(
        <div className={`grid grid-cols-1 ${grid_size} gap-4 items-center justify-items-center ml-[3rem] mr-[3rem]`}>
            {matchups.map((matchup) => (
                <Matchup matchup={matchup}
                         onToggle={onToggle}
                         key={type + "MatchupNo" + matchup.match_number}
                         winner={
                            (matchup.winner_location[1] === 0) ? // is the matchups winning location a home or away slot?
                            nextMatchups[matchup.winner_location[0]].home : // if home, check the next matchup index home team, (Country | null)
                            nextMatchups[matchup.winner_location[0]].away // if away, check next matchups at that index
                         }
                         type={type}
                />
            ))}
        </div>
    )
}