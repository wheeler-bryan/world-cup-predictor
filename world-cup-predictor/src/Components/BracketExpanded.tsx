import "../App.css"
import type { BracketRow } from "../assets/results.ts";
import { useState } from "react";

type Tab = 'points' | 'group' | 'bracket';

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
    const tabs: { key: Tab; label: string }[] = [
        { key: 'points', label: 'Points' },
        { key: 'group', label: 'Group Stage' },
        { key: 'bracket', label: 'Bracket' },
    ];

    return (
        <div className="flex gap-2 bg-gray-100 rounded-full p-1 w-fit mx-auto">
            {tabs.map(({ key, label }) => (
                <button
                    key={key}
                    onClick={() => onChange(key)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
                        ${active === key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

function PointsPanel({ bracket_data }: { bracket_data: BracketRow }) {
    const rounds = [
        { label: 'Group Stage', key: 'GS', pts: 0, max: 112 },
        { label: 'Round of 32',  key: 'R32', pts: 0, max: 80 },
        { label: 'Round of 16', key: 'R16', pts: 0, max: 80 },
        { label: 'Quarter Finals', key: 'QF', pts: 0, max: 60 },
        { label: 'Semi Finals', key: 'SF', pts: 0, max: 50 },
        { label: 'Final', key: 'F', pts: 0, max: 25 },
        { label: 'Champion 🏆', key: 'C', pts: 0, max: 50 },
        { label: 'Golden Boot 👟', key: 'GB', pts: 0, max: 20 },
    ];

    return (
        <div className="flex flex-col gap-2 px-4 py-3 w-full max-w-sm mx-auto">
            {rounds.map(({ label, pts, max }) => (
                <div key={label} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-32 shrink-0">{label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                            className="bg-green-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(pts / max) * 100}%` }}
                        />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 w-14 text-right">{pts} / {max}</span>
                </div>
            ))}
        </div>
    );
}

function GroupStagePanel({ bracket_data }: { bracket_data: BracketRow }) {
    const groupLabels = ['A','B','C','D','E','F','G','H','I','J','K','L'];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-4 py-3">
            {bracket_data.group_stage.map((group, gi) => (
                <div key={gi} className="bg-gray-50 rounded-xl p-2">
                    <div className="text-xs font-bold text-gray-400 mb-1.5 pl-1">Group {groupLabels[gi]}</div>
                    {group.map((country, ci) => (
                        <div key={ci} className={`flex items-center gap-1.5 py-0.5 px-1 rounded-md
                            ${ci < 2 ? 'opacity-100' : 'opacity-40'}`}>
                            <img
                                src={country.flag}
                                alt={country.name}
                                className="rounded-sm object-cover shrink-0"
                                style={{ width: '1.2rem', height: '0.85rem' }}
                            />
                            <span className="text-xs font-mono text-gray-700">{country.abbreviation}</span>
                            {ci === 0 && <span className="text-xs text-gray-300 ml-auto">1st</span>}
                            {ci === 1 && <span className="text-xs text-gray-300 ml-auto">2nd</span>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

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