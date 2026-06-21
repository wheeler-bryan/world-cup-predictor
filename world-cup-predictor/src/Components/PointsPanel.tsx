import type {BracketRow} from "../assets/results.ts";
import "../App.css"

export function PointsPanel({ bracket_data }: { bracket_data: BracketRow }) {
    const rounds = [
        { label: 'Group Stage', key: 'GS', pts: bracket_data.group_stage_points[0], max: 112, pts_ded: bracket_data.group_stage_points[1] },
        { label: 'Round of 32',  key: 'R32', pts: bracket_data.round_of_32_points[0], max: 80, pts_ded: bracket_data.round_of_32_points[1] },
        { label: 'Round of 16', key: 'R16', pts: bracket_data.round_of_16_points[0], max: 80, pts_ded: bracket_data.round_of_16_points[1] },
        { label: 'Quarter Finals', key: 'QF', pts: bracket_data.quarterfinals_points[0], max: 60, pts_ded: bracket_data.quarterfinals_points[1] },
        { label: 'Semi Finals', key: 'SF', pts: bracket_data.semifinals_points[0], max: 50, pts_ded: bracket_data.semifinals_points[1] },
        { label: 'Champion 🏆', key: 'C', pts: bracket_data.champion_points[0], max: 50, pts_ded: bracket_data.champion_points[1] },
        { label: 'Golden Boot', key: 'GB', pts: bracket_data.golden_boot_points[0], max: 20, pts_ded: bracket_data.golden_boot_points[1] }
    ];

    return (
        <div className="flex flex-col gap-2 px-4 py-3 w-full max-w-sm mx-auto">
            {rounds.map(({ label, pts, max, pts_ded }) => (
                <div key={label} className="flex items-center gap-3">
                    <div className="text-xs text-black w-32 ">{label}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden relative">
                            {/* lost points — red from the right */}
                            <div
                                className="absolute right-0 top-0 h-2 bg-red-300 rounded-full transition-all duration-300"
                                style={{ width: `${(pts_ded / max) * 100}%` }}
                            />
                            {/* earned points — green from the left */}
                            <div
                                className="absolute left-0 top-0 h-2 bg-green-400 rounded-full transition-all duration-300"
                                style={{ width: `${(pts / max) * 100}%` }}
                            />
                        </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-700 w-14 text-right">{pts} / {max}</span>
                </div>
            ))}
            <div className="text-xs text-center text-black font-bold w-32 ">{"(" + bracket_data.golden_boot + ")"}</div>
        </div>
    );
}