import "../App.css"
import {supabase} from "../lib/supabase.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BracketRow} from "../assets/results.ts";
import {Group, MatchupData, runner_up, third_place, winner} from "../assets/seeding.ts";
import type {Country} from "../assets/countries.ts";
import thirdPlaceTable from "../assets/third_place_table.json"
import {LeaderboardCard} from "../Components/LeaderboardCard.tsx";

export function ProductionLeaderboard() {

    const navigate = useNavigate();
    const [brackets, setBrackets] = useState<BracketRow[]>([])

    useEffect(() => {
        async function fetchBrackets() {
            const { data, error } = await supabase
                .from('brackets')
                .select('*')
                .order('code', { ascending: true })

            if (error) {
                navigate('/bracket_submitted');
            } else {
                const rows: BracketRow[] = [];

                for (let i = 0; i < data.length; i++) {

                    const key: number = data[i].third_place.reduce((acc: number, country: Country | null, i: number) =>
                        acc | (country !== null ? 1 << (11 - i) : 0), 0
                    );

                    const thirdPlacements: (Country | null)[] = thirdPlaceTable[key.toString() as keyof typeof thirdPlaceTable]
                        .map((index) => data[i].third_place[index]);

                    const roundOf32Countries: (Country | null)[][] = [
                            data[i].group_stage.map((group: Country[]) => group[0] ?? null),  // first place countries
                            data[i].group_stage.map((group: Country[]) => group[1] ?? null),  // second place countries
                            thirdPlacements                                              // third place countries
                    ]

                    const roundOf32Matchups = [
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
                    ];

                    const row: BracketRow = new BracketRow(
                        data[i].name, // name
                        data[i].group_stage, // group_stage
                        roundOf32Matchups, //RO32
                        data[i].round_of_16, // RO16
                        data[i].quarterfinals, // QF
                        data[i].semifinals, // SF
                        data[i].finals, // F
                        data[i].champion, // champion
                        data[i].golden_boot // golden boot
                    )
                    rows.push(row);
                }
                setBrackets(rows);
                console.log(data);
            }
        }

        fetchBrackets()
    }, [])

    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return(
        <div>
            <h1>Leaderboard</h1>
            <div className="grid px-6 py-2 items-center font-[Poppins] text-sm text-gray-400 font-semibold"
                 style={{ gridTemplateColumns: '2.5rem 2.5rem 1fr repeat(8, 3rem) 3.5rem 4rem 2rem' }}>
                <span></span>
                <span></span>
                <span></span>
                {['GS', 'R32', 'R16', 'QF', 'SF', 'F', '🏆', '👟'].map(label => (
                    <span key={label} className="text-center">{label}</span>
                ))}
                <span className="text-center">Total</span>
                <span className="text-center">Max</span>
                <span></span>
            </div>
            <div className="flex flex-col w-full">
                {brackets.map((b, i) => (
                    <LeaderboardCard
                        bracket_data={b}
                        i={i}
                        key={b.name + i.toString()}
                        isOpen={openIndex === i}
                        onToggle={() => setOpenIndex(prev => prev === i ? null : i)}
                    />
                ))}
            </div>
        </div>
    )
}