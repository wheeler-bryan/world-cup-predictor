import "../App.css"
import { QuadDrag } from "../Components/QuadDrag.tsx"

export function MakePicks() {


    return(
        <>
            <div className="h-screen">
                <h1 className="font-Poppins text-center">TEST RUNNING...</h1>
                <QuadDrag inputCountries={["United States", "Portugal", "Panama", "Japan"]} abbreviations={["USA", "POR", "PAN", "JAP"]} />
            </div>
        </>
    );
}