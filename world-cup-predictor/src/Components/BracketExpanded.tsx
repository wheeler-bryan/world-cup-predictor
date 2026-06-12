import "../App.css"
import type { BracketRow } from "../assets/results.ts";
import { useState } from "react";
import { TabBar } from "./TabBar.tsx";
import { PointsPanel } from "./PointsPanel.tsx";
import { GroupStagePanel } from "./GroupStagePanel.tsx";
import { BracketPanel } from "./BracketPanel.tsx";
type Tab = 'points' | 'group' | 'bracket';

export function BracketExpanded({ bracket_data }: { bracket_data: BracketRow }) {
    const [tab, setTab] = useState<Tab>('points');

    return (
        <div className="w-full bg-white border-t border-gray-100 py-4">

            {/* Mobile: tab bar + single panel */}
            <div className="md:hidden">
                <div className="mb-4">
                    <TabBar active={tab} onChange={setTab} />
                </div>
                {tab === 'points'  && <PointsPanel bracket_data={bracket_data} />}
                {tab === 'group'   && <GroupStagePanel bracket_data={bracket_data} />}
                {tab === 'bracket' && <BracketPanel bracket_data={bracket_data} />}
            </div>

            {/* PC: all three panels at once */}
            <div className="hidden md:block space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-6 mb-2">Points by Round</h3>
                    <PointsPanel bracket_data={bracket_data} />
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-6 mb-2">Group Stage</h3>
                    <GroupStagePanel bracket_data={bracket_data} />
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-6 mb-2">Bracket</h3>
                    <BracketPanel bracket_data={bracket_data} />
                </div>
            </div>
        </div>
    );
}