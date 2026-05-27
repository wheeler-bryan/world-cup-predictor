import type {Country} from "../assets/countries.ts";
import "../App.css"
//#d7d9de
//#e5e7eb

export function Checkbox({ country, value, onToggle, index }: {
    country: Country,
    value: boolean,
    onToggle: (index: number) => void,
    index: number,
})  {

    const color: string = (value) ? "bg-green-200 hover:bg-green-300 border-2 border-green-600" : "bg-[#ececec] hover:bg-[#e0e0e0]";
    const box: string = (value) ? "../src/assets/icons/checked.png" : "../src/assets/icons/unchecked.png";

    return (
        <button onClick={() => onToggle(index)} className="cursor-pointer">
            <div className={`flex justify-center items-center ${color} m-[0.75rem] rounded-xl h-[5rem]`}>
                <img className="ml-[1rem] mr-auto" src={country.flag} alt={country.name + "flag"} height="100rem" width="75rem" />
                <h3 className="text-center">{country.name}</h3>
                <img className="ml-auto mr-[1rem]" src={box} alt={country.name + "checkbox"} height="30rem" width="23rem"/>
            </div>
        </button>
    )
}
