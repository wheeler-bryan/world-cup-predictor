import "../App.css"

export function ScoringRules({ onClose }: { onClose: () => void }) {
    const rounds = [
        {
            round: 'Group Stage',
            max: 112,
            rules: [
                { desc: 'Team predicted 1st finishes 1st, or predicted 2nd finishes 2nd', pts: '+4 pts' },
                { desc: 'Team predicted 1st finishes 2nd, or vice versa', pts: '+2 pts' },
                { desc: 'Predicted third-place team advances to Round of 32', pts: '+2 pts' },
            ]
        },
        {
            round: 'Round of 32',
            max: 80,
            rules: [
                { desc: 'Correct winner per match', pts: '+5 pts' },
            ]
        },
        {
            round: 'Round of 16',
            max: 80,
            rules: [
                { desc: 'Correct winner per match', pts: '+10 pts' },
            ]
        },
        {
            round: 'Quarter Finals',
            max: 60,
            rules: [
                { desc: 'Correct winner per match', pts: '+15 pts' },
            ]
        },
        {
            round: 'Semi Finals',
            max: 50,
            rules: [
                { desc: 'Correct winner per match', pts: '+25 pts' },
            ]
        },
        {
            round: 'Champion',
            max: 50,
            rules: [
                { desc: 'Correctly predicted the World Cup winner', pts: '+50 pts' },
            ]
        },
        {
            round: 'Golden Boot',
            max: 20,
            rules: [
                { desc: 'Correctly predicted the top scorer', pts: '+20 pts' },
            ]
        },
    ]

    return (
        /* backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={onClose}
        >
            {/* card */}
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto font-[Poppins]"
                onClick={e => e.stopPropagation()}
            >
                {/* header */}
                <div className="sticky top-0 bg-blue-400 rounded-t-3xl px-6 py-4 flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-lg font-bold text-white">Scoring Rules</h2>
                        <p className="text-xs text-blue-100">Max possible: 452 pts</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white bg-blue-400 hover:bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* body */}
                <div className="px-6 py-4 flex flex-col gap-4">
                    {rounds.map(({ round, max, rules }) => (
                        <div key={round} className="bg-gray-50 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-800">{round}</span>
                                </div>
                                <span className="text-xs font-semibold text-blue-400 bg-blue-50 px-2 py-0.5 rounded-full">
                                    max {max} pts
                                </span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                {rules.map(({ desc, pts }) => (
                                    <div key={desc} className="flex items-start justify-between gap-3">
                                        <span className="text-xs text-gray-500 leading-relaxed">{desc}</span>
                                        <span className="text-xs font-bold text-green-500 shrink-0">{pts}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}