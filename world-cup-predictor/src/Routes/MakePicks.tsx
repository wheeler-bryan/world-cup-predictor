import "../App.css"
import { QuadDrag } from "../Components/QuadDrag.tsx"
import { letters, groups, abbreviations, flags, Country } from "../assets/countries.ts"
import { useEffect, useMemo, useState } from "react";
import { ThirdPlace } from "../Components/ThirdPlace.tsx";
import { MatchupDisplay } from "../Components/MatchupDisplay.tsx";
import {
    Group,
    winner,
    runner_up,
    MatchupData,
    third_place,
    roundOf16Seeding,
    QFSeeding,
    SFSeeding,
    finalSeeding, roundOf16Default, QFDefault, thirdDefault, groupDefault, SFDefault, finalDefault,
} from "../assets/seeding.ts";
import thirdPlaceTable from "../assets/third_place_table.json"
import { FinalDisplay } from "../Components/FinalDisplay.tsx";
import { ChampionDisplay } from "../Components/ChampionDisplay";
import { SubmitButton } from "../Components/SubmitButton.tsx";
import { InputBox } from "../Components/InputBox.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.ts"

export function MakePicks() {

    const navigate = useNavigate();
    const location = useLocation()

    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [submissionError, setSubmissionError] = useState("");
    const [currentCode, setCurrentCode] = useState("");
    const [goldenBoot, setGoldenBoot] = useState("");

    // --- GROUP STAGES ---

    //create countries
    const countries: Country[][] = groups.map((group, upperIndex) =>
            group.map((country, index) => new Country(country, abbreviations[upperIndex][index], flags[upperIndex][index]))
    );

    //save current rankings of each country
    const [filteredCountries, setFilteredCountries] = useState<Country[][]>(groupDefault);

    // --- THIRD PLACE COUNTRIES --

    const thirdPlaceCountries = useMemo(
        () => filteredCountries.map((group) => group[2] ?? null),
        [filteredCountries]
    );

    const [selectedThirdPlaceCountries, setSelectedThirdPlaceCountries] = useState<(Country | null)[]>(thirdDefault);

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
        new MatchupData(roundOf32Countries[runner_up][Group.A], roundOf32Countries[runner_up][Group.B], "Group A Runner-Up", "Group B Runner-Up", 73, "Sunday, June 28th", [1, 0]),
        new MatchupData(roundOf32Countries[winner][Group.E], roundOf32Countries[third_place][3], "Group E Winner", "Third Place A/B/C/D/F", 74, "Monday, June 29th", [0, 0]),
        new MatchupData(roundOf32Countries[winner][Group.F], roundOf32Countries[runner_up][Group.C], "Group F Winner", "Group C Runner-Up", 75, "Monday, June 29th", [1, 1]),
        new MatchupData(roundOf32Countries[winner][Group.C], roundOf32Countries[runner_up][Group.F], "Group C Winner", "Group F Runner-Up", 76, "Monday, June 29th", [2, 0]),
        new MatchupData(roundOf32Countries[winner][Group.I], roundOf32Countries[third_place][5], "Group I Winner", "Third Place C/D/F/G/H", 77, "Tuesday, June 30th", [0, 1]),
        new MatchupData(roundOf32Countries[runner_up][Group.E], roundOf32Countries[runner_up][Group.I], "Group E Runner-Up", "Group I Runner-Up", 78, "Tuesday, June 30th", [2, 1]),
        new MatchupData(roundOf32Countries[winner][Group.A], roundOf32Countries[third_place][0], "Group A Winner", "Third Place C/E/F/H/I", 79, "Tuesday, June 30th", [3, 0]),
        new MatchupData(roundOf32Countries[winner][Group.L], roundOf32Countries[third_place][7], "Group L Winner", "Third Place E/H/I/J/K", 80, "Wednesday, July 1st", [3, 1]),
        new MatchupData(roundOf32Countries[winner][Group.D], roundOf32Countries[third_place][2], "Group D Winner", "Third Place B/E/F/I/J", 81, "Wednesday, July 1st", [5, 0]),
        new MatchupData(roundOf32Countries[winner][Group.G], roundOf32Countries[third_place][4], "Group G Winner", "Third Place A/E/H/I/J", 82, "Wednesday July 1st", [5, 1]),
        new MatchupData(roundOf32Countries[runner_up][Group.K], roundOf32Countries[runner_up][Group.L], "Group K Runner-Up", "Group L Runner-Up", 83, "Thursday, July 2nd", [4, 0]),
        new MatchupData(roundOf32Countries[winner][Group.H], roundOf32Countries[runner_up][Group.J], "Group H Winner", "Group J Runner-Up", 84, "Thursday, July 2nd", [4, 1]),
        new MatchupData(roundOf32Countries[winner][Group.B], roundOf32Countries[third_place][1], "Group B Winner", "Third Place E/F/G/I/J", 85, "Thursday, July 2nd", [7, 0]),
        new MatchupData(roundOf32Countries[winner][Group.J], roundOf32Countries[runner_up][Group.H], "Group J Winner", "Group H Runner-Up", 86, "Friday, July 3rd", [6, 0]),
        new MatchupData(roundOf32Countries[winner][Group.K], roundOf32Countries[third_place][6], "Group K Winner", "Third Place D/E/I/J/L", 87, "Friday, July 3rd", [7, 1]),
        new MatchupData(roundOf32Countries[runner_up][Group.D], roundOf32Countries[runner_up][Group.G], "Group D Runner-Up", "Group G Runner-Up", 88, "Friday, July 3rd", [6, 1]),
        ],
        [roundOf32Countries]
    );

    const [roundOf16Matchups, setRoundOf16Matchups] = useState<MatchupData[]>(roundOf16Default);

    const [QFMatchups, setQFMatchups] = useState<MatchupData[]>(QFDefault);

    const [SFMatchups, setSFMatchups] = useState<MatchupData[]>(SFDefault);

    const [finalMatchup, setFinalMatchup] = useState<MatchupData[]>(finalDefault);

    const [champion, setChampion] = useState<(Country | null)>(null);

    const checkKO = (c: string, thirdWipe: boolean = false, type: string = "") => {
        console.log("KO PURGING  " + c);
        //RO32, RO16, QF, SF, F, ""
        if (type === "RO32" || type === "") {
            setRoundOf16Matchups(prev =>
                prev.map((m: MatchupData) => ((c === m.home?.name || c === m.away?.name) ?
                    ((c === m.home?.name) ? {...m, home: null} : {...m, away: null}) : m)
                )
            );
        }
        if (type === "RO32" || type === "" || type === "RO16") {
            setQFMatchups(prev =>
                prev.map((m: MatchupData) => ((c === m.home?.name || c === m.away?.name) ?
                    ((c === m.home?.name) ? {...m, home: null} : {...m, away: null}) : m)
                )
            );
        }
        if (type !== "F" && type !== "SF") {
            setSFMatchups(prev =>
                prev.map((m: MatchupData) => ((c === m.home?.name || c === m.away?.name) ?
                    ((c === m.home?.name) ? {...m, home: null} : {...m, away: null}) : m)
                )
            );
        }
        if (type !== "F") {
            setFinalMatchup(prev =>
                prev.map((m: MatchupData) => ((c === m.home?.name || c === m.away?.name) ?
                    ((c === m.home?.name) ? {...m, home: null} : {...m, away: null}) : m)
                )
            );
        }
        setChampion(prev => (c === prev?.name) ? null : prev);

        if (thirdWipe && selectedThirdPlaceCountries.filter((country) => country?.name === c).length === 1) {
            for (let i = 0; i < 12; i++) {
                const thirdWipeCountry = selectedThirdPlaceCountries[i]?.name;

                if (thirdWipeCountry && c !== thirdWipeCountry) {
                    setRoundOf16Matchups(prev =>
                        prev.map((m: MatchupData) => ((thirdWipeCountry === m.home?.name || thirdWipeCountry === m.away?.name) ?
                            ((thirdWipeCountry === m.home?.name) ? {...m, home: null} : {...m, away: null}) : m)
                        )
                    );
                    setQFMatchups(prev =>
                        prev.map((m: MatchupData) => ((thirdWipeCountry === m.home?.name || thirdWipeCountry === m.away?.name) ?
                            ((thirdWipeCountry === m.home?.name) ? {...m, home: null} : {...m, away: null}) : m)
                        )
                    );
                    setSFMatchups(prev =>
                        prev.map((m: MatchupData) => ((thirdWipeCountry === m.home?.name || thirdWipeCountry === m.away?.name) ?
                            ((thirdWipeCountry === m.home?.name) ? {...m, home: null} : {...m, away: null}) : m)
                        )
                    );
                    setFinalMatchup(prev =>
                        prev.map((m: MatchupData) => ((thirdWipeCountry === m.home?.name || thirdWipeCountry === m.away?.name) ?
                            ((thirdWipeCountry === m.home?.name) ? {...m, home: null} : {...m, away: null}) : m)
                        )
                    );
                    setChampion(prev => (thirdWipeCountry === prev?.name) ? null : prev);

                }
            }
        }
    }

    const handleSubmit = async () => {
        const code: string = (currentCode !== "") ? currentCode : Math.random().toString(36).substring(2, 6).toUpperCase(); // see if there is already a code

       if (filteredCountries.flat().filter(c => c ?? null).length < 48) {
           setColor("bg-red-600 hover:bg-red-700");
           setSubmissionError("Not all countries in group stage selected. Please try again");
           return //error
       }
       if (roundOf32Countries.flat().filter(c => c ?? null).length < 32) {
           setColor("bg-red-600 hover:bg-red-700");
           setSubmissionError("Not all third place countries selected. Please try again")
           return // error
       }

       if ((roundOf16Matchups.filter(m => m.home ?? null).length + roundOf16Matchups.filter(m => m.away ?? null).length) < 16) {
           setColor("bg-red-600 hover:bg-red-700");
           setSubmissionError("Not all Round of 32 matchups completed. Please try again")
           return // error
       }

        if ((QFMatchups.filter(m => m.home ?? null).length + QFMatchups.filter(m => m.away ?? null).length) < 8) {
            setColor("bg-red-600 hover:bg-red-700");
            setSubmissionError("Not all Round of 16 matchups completed. Please try again")
            return // error
        }

        if ((SFMatchups.filter(m => m.home ?? null).length + SFMatchups.filter(m => m.away ?? null).length) < 4) {
            setColor("bg-red-600 hover:bg-red-700");
            setSubmissionError("Not all quarter-final matchups completed. Please try again")
            return // error
        }
        if (!(finalMatchup[0].home && finalMatchup[0].away)) {
            setColor("bg-red-600 hover:bg-red-700");
            setSubmissionError("Not all semi-final matchups completed. Please try again")
            return // error
        }

        if (name === "") {
            setColor("bg-red-600 hover:bg-red-700");
            setSubmissionError("Please enter your name");
            return // error
        }

        const payload = {
            name,
            code,
            group_stage: filteredCountries,
            third_place: selectedThirdPlaceCountries,
            round_of_16: roundOf16Matchups,
            quarterfinals: QFMatchups,
            semifinals: SFMatchups,
            finals: finalMatchup[0],
            champion: champion,
            golden_boot: goldenBoot,
            submitted_at: new Date().toISOString(),
        }
        const query = location.state
            ? supabase.from('brackets').update(payload).eq('code', code)
            : supabase.from('brackets').insert(payload);

        const { error } = await query;

        if (!error) {
            navigate('/bracket_submitted', { state: { code, name } });
        }


    };

    const handleClear = () => {
        setFilteredCountries(groupDefault);
        setSelectedThirdPlaceCountries(thirdDefault);
        setRoundOf16Matchups(roundOf16Default);
        setQFMatchups(QFDefault);
        setSFMatchups(SFDefault);
        setFinalMatchup(finalDefault);
        setChampion(null);
        setName("");
        setGoldenBoot("");
    }


    useEffect(() => {
        if (location.state) {
            setName(location.state.name);
            setCurrentCode(location.state.code);
            setFilteredCountries(location.state.group_stage);
            setSelectedThirdPlaceCountries(location.state.third_place);
            setRoundOf16Matchups(location.state.round_of_16);
            setQFMatchups(location.state.quarterfinals);
            setSFMatchups(location.state.semifinals);
            setFinalMatchup([location.state.finals]);
            setChampion(location.state.champion);
            setGoldenBoot(location.state.golden_boot);
        }
    }, [location.state])


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
                            filteredCountries={filteredCountries[index]}
                            setFilteredCountries={(newRow) =>
                                setFilteredCountries(prev =>
                                    prev.map((r, i) => i === index ? (typeof newRow === 'function' ? newRow(r) : newRow) : r)
                                )
                            }
                            checkThird={checkSelectedThird}
                            checkKO={checkKO}
                        />
                    )}
                </div>
                <h1 className="mt-[1.5rem] pl-[0.5rem]">THIRD PLACE ADVANCES</h1>
                <h4 className="pl-[0.5rem] mb-[1.5rem]">Predict which 8 of the 12 third place teams will move on to the Round of 32</h4>
                <ThirdPlace countries={thirdPlaceCountries}
                            setSelectedCountries={setSelectedThirdPlaceCountries}
                            selectedCountries={selectedThirdPlaceCountries}
                            checkKO={checkKO}
                />
                <h1 className="mt-[1.5rem] pl-[0.5rem]">ROUND OF 32</h1>
                <h4 className="mb-[1.5rem] pl-[0.5rem]"> Select your winners for all 16 matches</h4>
                <MatchupDisplay matchups={roundOf32Matchups} setMatchups={setRoundOf16Matchups} seedingFunc={roundOf16Seeding} nextMatchups={roundOf16Matchups} type={"RO32"} checkKO={checkKO} />
                <h1 className="mt-[1.5rem] pl-[0.5rem]">ROUND OF 16</h1>
                <h4 className="pl-[0.5rem] mb-[1.5rem]">Select your winners for all eight matches</h4>
                <MatchupDisplay matchups={roundOf16Matchups} setMatchups={setQFMatchups} seedingFunc={QFSeeding} nextMatchups={QFMatchups} type={"RO16"} checkKO={checkKO}/>
                <h1 className="mt-[1.5rem] pl-[0.5rem]">QUARTER-FINALS</h1>
                <h4 className="pl-[0.5rem] mb-[1.5rem]">Select your winners for the quarter-finals</h4>
                <MatchupDisplay matchups={QFMatchups} setMatchups={setSFMatchups} seedingFunc={SFSeeding} nextMatchups={SFMatchups} type={"QF"} checkKO={checkKO}/>
                <h1 className="mt-[1.5rem] pl-[0.5rem]">SEMI-FINALS</h1>
                <h4 className="pl-[0.5rem] mb-[1.5rem]">Select your winners for the semi-finals</h4>
                <MatchupDisplay matchups={SFMatchups} setMatchups={setFinalMatchup} seedingFunc={finalSeeding} nextMatchups={finalMatchup} type={"SF"} checkKO={checkKO}/>
                <h1 className="mt-[1.5rem] pl-[0.5rem]">FINAL</h1>
                <h4 className="pl-[0.5rem] mb-[1.5rem]">Select your 2026 World Cup Champion</h4>
                <FinalDisplay matchup={finalMatchup[0]} setChampion={setChampion} champion={champion} />
                <ChampionDisplay champion={champion}/>
                {(champion) ?
                    <div className="flex flex-col justify-center items-center pb-[3rem]">
                        <InputBox value={name} setState={setName} placeholder={"Name"} />
                        <div className="flex justify-center items-center gap-4">
                            <SubmitButton onClick={handleSubmit} color={color} submissionError={submissionError}>Submit Picks</SubmitButton>
                            <SubmitButton onClick={handleClear} color={"bg-gray-300 hover:bg-gray-400"}>Clear Picks</SubmitButton>
                        </div>
                        <h2>Bonus: Golden Boot Winner</h2>
                        <InputBox value={goldenBoot} setState={setGoldenBoot} placeholder={"Player e.g. Christian Pulisic"} />
                    </div>
                : null}
            </div>
        </>
    );
}