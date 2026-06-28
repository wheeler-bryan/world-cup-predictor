import type {BracketRow} from "../assets/results.ts";
import "../App.css"

export function GroupStagePanel({ bracket_data }: { bracket_data: BracketRow }) {
    const groupLabels = ['A','B','C','D','E','F','G','H','I','J','K','L'];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-4 py-3">
            {bracket_data.group_stage.map((group, gi) => (
                <div key={gi} className="bg-gray-100 rounded-xl p-2">
                    <div className="text-xs font-bold text-black mb-1.5 pl-1">Group {groupLabels[gi]}</div>
                    {group.map((country, ci) => {
                        const pts = bracket_data.point_details.get(country.name)!;
                        const color: string = pts > 2 ? 'text-green-500' : pts > 0 ? 'text-yellow-400' : pts < 0 ? 'text-red-300' : 'text-gray-400';
                        return (
                            <div key={ci} className={`flex items-center gap-1.5 py-0.5 px-1 rounded-md`}>
                                <img
                                    src={country.flag}
                                    alt={country.name}
                                    className="rounded-sm object-cover shrink-0"
                                    style={{width: '1.2rem', height: '0.85rem'}}
                                />
                                <div className="text-xs font-[Poppins] text-black">{country.abbreviation}</div>
                                <div className="ml-auto flex items-center gap-2">
                                    <div className={`text-xs font-semibold ${color}`}>
                                        {pts > 0 ? pts === 3 ? "+2" : "+" + pts : pts < 0 ? pts : '-'}
                                    </div>
                                    <div className="text-xs text-gray-400 w-6 text-right">
                                        {['1st', '2nd', '3rd', '4th'][ci]}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}