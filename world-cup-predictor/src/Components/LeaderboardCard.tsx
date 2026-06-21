import "../App.css"
import type { BracketRow } from "../assets/results.ts";
import { BracketExpanded } from "./BracketExpanded.tsx";

export function LeaderboardCard({ bracket_data, i, isOpen, onToggle }: {
    bracket_data: BracketRow;
    i: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const points_list: number[] = [
        bracket_data.group_stage_points[0],
        bracket_data.round_of_32_points[0],
        bracket_data.round_of_16_points[0],
        bracket_data.quarterfinals_points[0],
        bracket_data.semifinals_points[0],
        bracket_data.champion_points[0],
        bracket_data.golden_boot_points[0],
    ];

    return (
        <div className="w-full font-[Poppins] border-b border-gray-100">

            {/* Row — mobile: 5 cols, pc: all cols */}
            <div
                onClick={onToggle}
                className="cursor-pointer hover:bg-gray-300 transition-colors duration-150 px-[1rem] py-[0.75rem]"
            >
                {/* Mobile row */}
                <div className="flex items-center gap-3 md:hidden">
                    <div className="w-[1.5rem] font-[Poppins] text-sm font-bold text-black">{i + 1}</div>
                    <img
                        src={bracket_data.champion.flag}
                        alt={bracket_data.champion.name}
                        className="rounded-sm object-cover"
                        style={{ width: '2rem', height: '1.4rem' }}
                    />
                    <div className="flex-1 text-sm font-semibold text-black">{bracket_data.name}</div>
                    <div className="text-sm font-bold text-black shrink-0">{bracket_data.total_points}</div>
                    <div className="text-xs text-gray-400 shrink-0">{bracket_data.max_points}</div>
                    <div className="text-black text-sm">{isOpen ? '▴' : '▾'}</div>
                </div>

                {/* PC row */}
                <div
                    className="hidden md:grid items-center"
                    style={{ gridTemplateColumns: '2.5rem 2.5rem 1fr repeat(8, 3rem) 3.5rem 4rem 2rem' }}>
                    <span className="text-sm font-bold text-black">{i + 1}</span>
                    <img
                        src={bracket_data.champion.flag}
                        alt={bracket_data.champion.name}
                        className="rounded-sm object-cover"
                        style={{ width: '2.2rem', height: '1.5rem' }}
                    />
                    <span className="text-sm font-semibold text-black pl-3">{bracket_data.name}</span>
                    {['GS', 'R32', 'R16', 'QF', 'SF', '🏆', '👟'].map((label, i) => (
                        <span key={label} className="text-center text-sm text-gray-500">{points_list[i]}</span>
                    ))}
                    <div className="text-center text-sm font-bold text-black">{bracket_data.total_points}</div>
                    <div className="text-center text-xs text-gray-400">{bracket_data.max_points}</div>
                    <div className="text-center text-gray-400 text-sm">{isOpen ? '▴' : '▾'}</div>
                </div>
            </div>

            {isOpen && <BracketExpanded bracket_data={bracket_data} />}
        </div>
    )
}
