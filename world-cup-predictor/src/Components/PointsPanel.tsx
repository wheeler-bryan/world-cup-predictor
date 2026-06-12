import type {BracketRow} from "../assets/results.ts";
import "../App.css"

export function PointsPanel({ bracket_data }: { bracket_data: BracketRow }) {
    const rounds = [
        { label: 'Group Stage', key: 'GS', pts: (bracket_data.name == "Neymar") ? 1 : 0, max: 112 },
        { label: 'Round of 32',  key: 'R32', pts: 0, max: 80 },
        { label: 'Round of 16', key: 'R16', pts: 0, max: 80 },
        { label: 'Quarter Finals', key: 'QF', pts: 0, max: 60 },
        { label: 'Semi Finals', key: 'SF', pts: 0, max: 50 },
        { label: 'Final', key: 'F', pts: 0, max: 25 },
        { label: 'Champion 🏆', key: 'C', pts: 0, max: 50 },
        { label: 'Golden Boot', key: 'GB', pts: 0, max: 20 },
    ];

    return (
        <div className="flex flex-col gap-2 px-4 py-3 w-full max-w-sm mx-auto">
            {rounds.map(({ label, pts, max }) => (
                <div key={label} className="flex items-center gap-3">
                    <div className="text-xs text-black w-32 ">{label}</div>
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