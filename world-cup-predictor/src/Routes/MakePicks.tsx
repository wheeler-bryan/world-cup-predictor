import "../App.css"
import { QuadDrag } from "../Components/QuadDrag.tsx"
import { letters, groups, abbreviations, flags, Country } from "../assets/countries.ts"
import { useMemo, useState} from "react";
import { ThirdPlace } from "../Components/ThirdPlace.tsx";
import { MatchupDisplay } from "../Components/MatchupDisplay.tsx";
import {Group, winner, runner_up, MatchupData, third_place, roundOf16Seeding, QFSeeding} from "../assets/seeding.ts";
import thirdPlaceTable from "../assets/third_place_table.json"



export function MakePicks() {

    // --- GROUP STAGES ---

    //create countries
    const [countries, setCountries] = useState<Country[][]>(
        groups.map((group, upperIndex) =>
            group.map((country, index) => new Country(country, abbreviations[upperIndex][index], flags[upperIndex][index]))
        )
    );

    //save current rankings of each country
    const [filteredCountries, setFilteredCountries] = useState<Country[][]>([
        [], [], [], [], [], [], [], [], [], [], [], []
    ]);

    // --- THIRD PLACE COUNTRIES --

    const thirdPlaceCountries = useMemo(
        () => filteredCountries.map((group) => group[2] ?? null),
        [filteredCountries]
    );

    const [selectedThirdPlaceCountries, setSelectedThirdPlaceCountries] = useState<(Country | null)[]>(
        [null, null, null, null, null, null, null, null, null, null, null, null]
    );

    const checkSelectedThird = (group: string) => {
        const index = group.charCodeAt(0) - 65;
        console.log("PURGING INDEX " + index)

        setSelectedThirdPlaceCountries(
            selectedThirdPlaceCountries.map((c, i) => (index === i ? null : c)
        ));
    }

    // --- THIRD PLACEMENT ALGORITHMS

    const numSelected: number = selectedThirdPlaceCountries.filter(c => c !== null).length;

    const key: number = selectedThirdPlaceCountries.reduce((acc, country, i) =>
        acc | (country !== null ? 1 << (11 - i) : 0), 0
    );

    const thirdPlacements: (Country | null)[] = useMemo(() =>
        (numSelected >= 8) ?
            thirdPlaceTable[key.toString() as keyof typeof thirdPlaceTable].map((index) => selectedThirdPlaceCountries[index])
            : [null, null, null, null, null, null, null, null],
        [selectedThirdPlaceCountries, numSelected, key]
    );

    // --- ROUND OF 32 ---

    const roundOf32Countries: (Country | null)[][] = useMemo(
        () => [
            filteredCountries.map(group => group[0] ?? null),  // first place countries
            filteredCountries.map(group => group[1] ?? null),  // second place countries
            thirdPlacements                                              // third place countries
        ],
        [filteredCountries, thirdPlacements]
    );

    const roundOf32Matchups: MatchupData[] = useMemo(
        () => [
        new MatchupData(roundOf32Countries[runner_up][Group.A], roundOf32Countries[runner_up][Group.B], "Group A Runner-Up", "Group B Runner-Up", 73, "Sunday, June 28th"),
        new MatchupData(roundOf32Countries[winner][Group.E], roundOf32Countries[third_place][3], "Group E Winner", "Third Place A/B/C/D/F", 74, "Monday, June 29th"),
        new MatchupData(roundOf32Countries[winner][Group.F], roundOf32Countries[runner_up][Group.C], "Group F Winner", "Group C Runner-Up", 75, "Monday, June 29th"),
        new MatchupData(roundOf32Countries[winner][Group.C], roundOf32Countries[runner_up][Group.F], "Group C Winner", "Group F Runner-Up", 76, "Monday, June 29th"),
        new MatchupData(roundOf32Countries[winner][Group.I], roundOf32Countries[third_place][5], "Group I Winner", "Third Place C/D/F/G/H", 77, "Tuesday, June 30th"),
        new MatchupData(roundOf32Countries[runner_up][Group.E], roundOf32Countries[runner_up][Group.I], "Group E Runner-Up", "Group I Runner-Up", 78, "Tuesday, June 30th"),
        new MatchupData(roundOf32Countries[winner][Group.A], roundOf32Countries[third_place][0], "Group A Winner", "Third Place C/E/F/H/I", 79, "Tuesday, June 30th"),
        new MatchupData(roundOf32Countries[winner][Group.L], roundOf32Countries[third_place][7], "Group L Winner", "Third Place E/H/I/J/K", 80, "Wednesday, July 1st"),
        new MatchupData(roundOf32Countries[winner][Group.D], roundOf32Countries[third_place][2], "Group D Winner", "Third Place B/E/F/I/J", 81, "Wednesday, July 1st"),
        new MatchupData(roundOf32Countries[winner][Group.G], roundOf32Countries[third_place][4], "Group G Winner", "Third Place A/E/H/I/J", 82, "Wednesday July 1st"),
        new MatchupData(roundOf32Countries[runner_up][Group.K], roundOf32Countries[runner_up][Group.L], "Group K Runner-Up", "Group L Runner-Up", 83, "Thursday, July 2nd"),
        new MatchupData(roundOf32Countries[winner][Group.H], roundOf32Countries[runner_up][Group.J], "Group H Winner", "Group J Runner-Up", 84, "Thursday, July 2nd"),
        new MatchupData(roundOf32Countries[winner][Group.B], roundOf32Countries[third_place][1], "Group B Winner", "Third Place E/F/G/I/J", 85, "Thursday, July 2nd"),
        new MatchupData(roundOf32Countries[winner][Group.J], roundOf32Countries[runner_up][Group.H], "Group J Winner", "Group H Runner-Up", 86, "Friday, July 3rd"),
        new MatchupData(roundOf32Countries[winner][Group.K], roundOf32Countries[third_place][6], "Group K Winner", "Third Place D/E/I/J/L", 87, "Friday, July 3rd"),
        new MatchupData(roundOf32Countries[runner_up][Group.D], roundOf32Countries[runner_up][Group.G], "Group D Runner-Up", "Group G Runner-Up", 88, "Friday, July 3rd"),
        ],
        [roundOf32Countries]
    );

    const [roundOf16Matchups, setRoundOf16Matchups] = useState<MatchupData[]>([
        new MatchupData(null, null, "Winner Match 74", "Winner Match 77", 89, "Saturday, July 4th"),
        new MatchupData(null, null, "Winner Match 73", "Winner Match 75", 90, "Saturday, July 4th"),
        new MatchupData(null, null, "Winner Match 76", "Winner Match 78", 91, "Sunday, July 5th"),
        new MatchupData(null, null, "Winner Match 79", "Winner Match 80", 92, "Sunday, July 5th"),
        new MatchupData(null, null, "Winner Match 83", "Winner Match 84", 93, "Monday, July 6th"),
        new MatchupData(null, null, "Winner Match 81", "Winner Match 82", 94, "Monday, July 6th"),
        new MatchupData(null, null, "Winner Match 86", "Winner Match 88", 95, "Tuesday, July 7th"),
        new MatchupData(null, null, "Winner Match 85", "Winner Match 87", 96, "Tuesday, July 7th"),
    ]);

    const [QFMatchups, setQFMatchups] = useState<MatchupData[]>([
        new MatchupData(null, null, "Winner Match 89", "Winner Match 90", 97, "Thursday, July 9th"),
        new MatchupData(null, null, "Winner Match 93", "Winner Match 94", 98, "Friday, July 10th"),
        new MatchupData(null, null, "Winner Match 91", "Winner Match 92", 99, "Saturday, July 11th"),
        new MatchupData(null, null, "Winner Match 95", "Winner Match 96", 100, "Saturday, July 11th"),
    ]);

    const [SFMatchups, setSFMatchups] = useState<MatchupData[]>([
        new MatchupData(null, null, "Winner Quarter-final 1", "Winner Quarter-final 2", 101, "Tuesday, July 14th"),
        new MatchupData(null, null, "Winner Quarter-final 3", "Winner Quarter-final 4", 102, "Wednesday, July 15th"),
    ]);

    const [finalMatchup, setFinalMatchup] = useState<MatchupData>(
        new MatchupData(null, null, "Winner Semi-final 1", "Winner Semi-final 2", 104, "Sunday, July 19th")
    );

    return(
        <>
            <div className="h-screen">
                <h1 className="pl-[0.5rem]">GROUP STAGES</h1>
                <h4 className="pl-[0.5rem] mb-[1.5rem]">Predict the outcome of each group</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-[3rem] mr-[3rem] justify-items-center">
                    {countries.map((countries, index) =>
                        <QuadDrag
                            key={"Group " + letters[index]}
                            id={letters[index]}
                            countries={countries}
                            setCountries={(newRow) =>
                                setCountries(prev =>
                                    prev.map((r, i) => i === index ? (typeof newRow === 'function' ? newRow(r) : newRow) : r)
                                )
                            }
                            filteredCountries={filteredCountries[index]}
                            setFilteredCountries={(newRow) =>
                                setFilteredCountries(prev =>
                                    prev.map((r, i) => i === index ? (typeof newRow === 'function' ? newRow(r) : newRow) : r)
                                )
                            }
                            checkState={checkSelectedThird}
                        />
                    )}
                </div>
                <h1 className="mt-[1.5rem] pl-[0.5rem]">THIRD PLACE ADVANCES</h1>
                <h4 className="pl-[0.5rem] mb-[1.5rem]">Predict which 8 of the 12 third place teams will move on to the Round of 32</h4>
                <ThirdPlace countries={thirdPlaceCountries}
                            setSelectedCountries={setSelectedThirdPlaceCountries}
                            selectedCountries={selectedThirdPlaceCountries}
                />
                <h1 className="mt-[1.5rem] pl-[0.5rem]">ROUND OF 32</h1>
                <h4 className="mb-[1.5rem] pl-[0.5rem]"> Select your winners for all 16 matches</h4>
                <MatchupDisplay matchups={roundOf32Matchups} setMatchups={setRoundOf16Matchups} seedingFunc={roundOf16Seeding}/>
                <h1 className="mt-[1.5rem] pl-[0.5rem]">ROUND OF 16</h1>
                <h4 className="pl-[0.5rem] mb-[1.5rem]">Select your winners for all eight matches</h4>
                <MatchupDisplay matchups={roundOf16Matchups} setMatchups={setQFMatchups} seedingFunc={QFSeeding}/>
                <h1 className="mt-[1.5rem] pl-[0.5rem]">QUARTER-FINALS</h1>
                <h4 className="pl-[0.5rem] mb-[1.5rem]">Select your winners for the quarter-finals</h4>
            </div>
        </>
    );
}