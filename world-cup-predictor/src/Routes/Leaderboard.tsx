import "../App.css"

export function Leaderboard() {

    return(
        <div className="bg-[url('/world-cup-background.jpg')] bg-cover bg-center h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white flex shadow-2xl shadow-black flex-col items-center justify-center rounded-4xl p-8">
                    <h2 className="text-center">Thanks for submitting a bracket!</h2>
                    <h3>Beta Leaderboard coming June 11th!</h3>
                </div>
            </div>
        </div>
    )
}