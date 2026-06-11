import "../App.css"
import type { BracketRow } from "../assets/results.ts";
import { BracketExpanded } from "./BracketExpanded.tsx";

export function LeaderboardCard({ bracket_data, i, isOpen, onToggle }: {
    bracket_data: BracketRow;
    i: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="w-full font-[Poppins] border-b border-gray-100">

            {/* Row — mobile: 5 cols, pc: all cols */}
            <div
                onClick={onToggle}
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-150 px-4 py-3"
            >
                {/* Mobile row */}
                <div className="flex items-center gap-3 md:hidden">
                    <span className="w-6 text-sm font-bold text-gray-600 shrink-0">{i + 1}</span>
                    <img
                        src={bracket_data.champion.flag}
                        alt={bracket_data.champion.name}
                        className="rounded-sm object-cover shrink-0"
                        style={{ width: '2rem', height: '1.4rem' }}
                    />
                    <span className="flex-1 text-sm font-semibold text-gray-900 truncate">{bracket_data.name}</span>
                    <span className="text-sm font-bold text-gray-900 shrink-0">0</span>
                    <span className="text-xs text-gray-400 shrink-0">/ 436</span>
                    <span className="text-gray-400 text-xs shrink-0">{isOpen ? '▴' : '▾'}</span>
                </div>

                {/* PC row */}
                <div
                    className="hidden md:grid items-center"
                    style={{ gridTemplateColumns: '2.5rem 2.5rem 1fr repeat(8, 3rem) 3.5rem 4rem 2rem' }}
                >
                    <span className="text-sm font-bold text-gray-600">{i + 1}</span>
                    <img
                        src={bracket_data.champion.flag}
                        alt={bracket_data.champion.name}
                        className="rounded-sm object-cover"
                        style={{ width: '2.2rem', height: '1.5rem' }}
                    />
                    <span className="text-sm font-semibold text-gray-900 pl-3 truncate">{bracket_data.name}</span>
                    {['GS', 'R32', 'R16', 'QF', 'SF', 'F', '🏆', '👟'].map(label => (
                        <span key={label} className="text-center text-sm text-gray-500">0</span>
                    ))}
                    <span className="text-center text-sm font-bold text-gray-900">0</span>
                    <span className="text-center text-xs text-gray-400">/ 436</span>
                    <span className="text-center text-gray-400 text-sm">{isOpen ? '▴' : '▾'}</span>
                </div>
            </div>

            {/* Expanded content */}
            {isOpen && <BracketExpanded bracket_data={bracket_data} />}
        </div>
    )
}
