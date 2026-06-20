import "../App.css"
import type {Dispatch, SetStateAction} from "react";

export function ScoringButton({ setShowScoring } : {
    setShowScoring: Dispatch<SetStateAction<boolean>>,
}) {

    return(
        <button className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-500 font-semibold px-3 py-1 rounded-full hover:cursor-pointer" onClick={() => setShowScoring(true)} >
            Show Scoring Rules
        </button>
    )
}