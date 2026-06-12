import "../App.css"
import type { BracketRow } from "../assets/results.ts";
import { useState } from "react";
import { TabBar } from "./TabBar.tsx";
import { PointsPanel } from "./PointsPanel.tsx";
import { GroupStagePanel } from "./GroupStagePanel.tsx";
type Tab = 'points' | 'group' | 'bracket';



function BracketPanel({ bracket_data }: { bracket_data: BracketRow }) {
    const rounds = [
        { label: 'R32', matchups: bracket_data.round_of_32 },
        { label: 'R16', matchups: bracket_data.round_of_16 },
        { label: 'QF',  matchups: bracket_data.quarterfinals },
        { label: 'SF',  matchups: bracket_data.semifinals },
        { label: 'F',   matchups: [bracket_data.finals] },
    ];

    return (
        <div className="flex gap-4 overflow-x-auto px-4 py-3 pb-4">
            {rounds.map(({ label, matchups }) => (
                <div key={label} className="flex flex-col gap-2 shrink-0">
                    <div className="text-xs font-bold text-gray-400 text-center mb-1">{label}</div>
                    {matchups.map((m, mi) => (
                        <div key={mi} className="flex flex-col gap-0.5 bg-gray-50 rounded-lg p-1.5 w-20">
                            <div className="flex items-center gap-1">
                                {m.home
                                    ? <><img src={m.home.flag} alt={m.home.abbreviation}
                                             className="rounded-sm object-cover shrink-0"
                                             style={{ width: '1rem', height: '0.7rem' }} />
                                        <span className="text-xs font-mono text-gray-700 truncate">{m.home.abbreviation}</span></>
                                    : <span className="text-xs text-gray-300 italic">TBD</span>
                                }
                            </div>
                            <div className="border-t border-gray-200 my-0.5" />
                            <div className="flex items-center gap-1">
                                {m.away
                                    ? <><img src={m.away.flag} alt={m.away.abbreviation}
                                             className="rounded-sm object-cover shrink-0"
                                             style={{ width: '1rem', height: '0.7rem' }} />
                                        <span className="text-xs font-mono text-gray-700 truncate">{m.away.abbreviation}</span></>
                                    : <span className="text-xs text-gray-300 italic">TBD</span>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export function BracketExpanded({ bracket_data }: { bracket_data: BracketRow }) {
    const [tab, setTab] = useState<Tab>('points');

    return (
        <div className="w-full bg-white border-t border-gray-100 py-4">

            {/* Mobile: tab bar + single panel */}
            <div className="md:hidden">
                <div className="mb-4">
                    <TabBar active={tab} onChange={setTab} />
                </div>
                {tab === 'points'  && <PointsPanel bracket_data={bracket_data} />}
                {tab === 'group'   && <GroupStagePanel bracket_data={bracket_data} />}
                {tab === 'bracket' && <BracketPanel bracket_data={bracket_data} />}
            </div>

            {/* PC: all three panels at once */}
            <div className="hidden md:block space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-6 mb-2">Points by Round</h3>
                    <PointsPanel bracket_data={bracket_data} />
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-6 mb-2">Group Stage</h3>
                    <GroupStagePanel bracket_data={bracket_data} />
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-6 mb-2">Bracket</h3>
                    <BracketPanel bracket_data={bracket_data} />
                </div>
            </div>
        </div>
    );
}