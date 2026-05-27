import "../App.css"
import { Country } from "../assets/countries.ts"

export function ChampionDisplay( { champion } : {
    champion: Country | null,
}) {
    return (
        <div>
            {(champion) ?
                <div className="flex flex-col justify-center items-center rounded-2xl bg-gray-300 m-[3rem] pb-[2rem]">
                    <h1 className="text-center mt-[2rem]">YOUR 2026 FIFA WORLD CUP CHAMPION</h1>
                    <h1 className="text-center">{champion.name}</h1>
                    <div className="flex justify-center gap-2 pt-[1rem]">
                        <img src={"trophy.png"} alt={"trophy1"} height="200rem" width="200rem" />
                        <img src={champion.flag} alt={champion.abbreviation} height="200rem" width="150rem" />
                        <img src={"trophy.png"} alt={"trophy2"} height="200rem" width="200rem" />
                    </div>
                </div> : null}
        </div>
    );
}