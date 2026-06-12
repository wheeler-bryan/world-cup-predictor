import type {BracketRow} from "../assets/results.ts";

export function BracketPanel({ bracket_data }: { bracket_data: BracketRow }) {
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