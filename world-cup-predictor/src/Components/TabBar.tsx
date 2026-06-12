import "../App.css"

type Tab = 'points' | 'group' | 'bracket';

export function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
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
                        ? 'bg-white text-black shadow-sm'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}