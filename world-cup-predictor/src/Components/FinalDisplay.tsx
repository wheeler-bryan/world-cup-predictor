import { Country } from "../assets/countries.ts";
import { MatchupData } from "../assets/seeding.ts";
import { FlagButton } from "./FlagButton.tsx";
import type { Dispatch, SetStateAction } from "react";

export function FinalDisplay({ matchup, setChampion, champion } : {
    matchup: MatchupData,
    setChampion: Dispatch<SetStateAction<(Country | null)>>,
    champion: Country | null,
} ) {

    const onToggle = (country: Country) => {
        setChampion(country);
        console.log(country.name + " is the champion")
    }

    return(
        <div className={`grid grid-cols-1 gap-4 items-center justify-items-center ml-[3rem] mr-[3rem]`}>
            <div className={`flex flex-col justify-around pb-[0.7rem] items-center bg-[#EFBF04] rounded-3xl md:w-[30rem] md:h-[11rem] md:max-w-[40rem] h-[11rem] w-[22rem]`}>
                <h5 className="text-[1rem] pt-[0.33rem] text-center">{"Match " + matchup.match_number.toString() + " • " + matchup.date}</h5>
                <div className={`flex justify-center items-center gap-5 m-[0.75rem]`}>
                    <FlagButton onToggle={onToggle}
                                country={matchup.home}
                                match_number={matchup.match_number}
                                key={"MatchupButtonHome" + matchup.match_number.toString()}
                                winner={champion?.name === matchup.home?.name}
                                placeholder={matchup.home_placeholder}
                                type={"F"} />

                    <FlagButton onToggle={onToggle}
                                country={matchup.away}
                                match_number={matchup.match_number}
                                key={"MatchupButtonAway" + matchup.match_number.toString()}
                                winner={champion?.name === matchup.away?.name}
                                placeholder={matchup.away_placeholder}
                                type={"F"} />
                </div>
            </div>
        </div>
    )
}