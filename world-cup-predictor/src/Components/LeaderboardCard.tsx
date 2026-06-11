import "../App.css"
import type {BracketRow} from "../assets/results.ts";

export function LeaderboardCard({ bracket_data, i, isOpen, onToggle } : {
    bracket_data: BracketRow;
    i: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="w-screen font-[Poppins]">
            <div className="grid px-6 py-2 items-center hover:bg-gray-300 rounded-2xl h-12 cursor-pointer"
                 style={{ gridTemplateColumns: '2.5rem 2.5rem 1fr repeat(8, 3rem) 3.5rem 4rem 2rem' }} onClick={onToggle}>
                <span className="text-black font-semibold text-left">{i + 1}</span>
                <img
                    src={bracket_data.champion.flag}
                    alt={bracket_data.champion.name}
                    height="41rem"
                    width="55rem"
                />
                <span className="text-left pl-3">{bracket_data.name}</span>
                {['GS', 'R32', 'R16', 'QF', 'SF', 'F', '🏆', '👟'].map(label => (
                    <span key={label} className="text-center text-sm text-gray-500">0</span>
                ))}
                <span className="text-center font-semibold">0</span>
                <span className="text-center text-sm text-black">/ 876</span>
                <span className="text-center text-black">{isOpen ? '▴' : '▾'}</span>
            </div>
            {isOpen && (
                <div className="flex items-center justify-center h-64 bg-gray-50">
                    <h1>HELLO</h1>
                </div>
            )}
        </div>
    )
}