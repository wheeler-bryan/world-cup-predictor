import "../App.css"

export function Leaderboard() {

    return(
        <div className="bg-[url('/world-cup-background.jpg')] bg-cover bg-center h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white flex shadow-2xl shadow-black flex-col items-center justify-center rounded-4xl p-8">
                    <h2 className="text-center">Thanks for submitting a bracket! Leaderboard coming June 11th!</h2>
                    <h3 className="text-center">To edit your picks, or view before June 11th, use your code to access your account.</h3>
                </div>
            </div>
        </div>
    )
}