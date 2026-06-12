import type {BracketRow} from "../assets/results.ts";
import "../App.css"

export function GroupStagePanel({ bracket_data }: { bracket_data: BracketRow }) {
    const groupLabels = ['A','B','C','D','E','F','G','H','I','J','K','L'];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-4 py-3">
            {bracket_data.group_stage.map((group, gi) => (
                <div key={gi} className="bg-gray-100 rounded-xl p-2">
                    <div className="text-xs font-bold text-black mb-1.5 pl-1">Group {groupLabels[gi]}</div>
                    {group.map((country, ci) => (
                        <div key={ci} className={`flex items-center gap-1.5 py-0.5 px-1 rounded-md
                            ${ci < 2 ? 'opacity-100' : 'opacity-40'}`}>
                            <img
                                src={country.flag}
                                alt={country.name}
                                className="rounded-sm object-cover shrink-0"
                                style={{ width: '1.2rem', height: '0.85rem' }}
                            />
                            <div className="text-xs font-[Poppins] text-black">{country.abbreviation}</div>
                            {ci === 0 && <div className="text-xs text-gray-400 ml-auto">1st</div>}
                            {ci === 1 && <div className="text-xs text-gray-400 ml-auto">2nd</div>}
                            {ci === 2 && <div className="text-xs text-gray-400 ml-auto">3rd</div>}
                            {ci === 3 && <div className="text-xs text-gray-400 ml-auto">4th</div>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}