import '../App.css'
import { Country } from '../assets/countries.ts'
import {type Dispatch, type SetStateAction, useState} from "react";
import {Checkbox} from "./Checkbox.tsx";

export function ThirdPlace( { countries, setSelectedCountries, numSelected } : {
    countries: Country[],
    setSelectedCountries: Dispatch<SetStateAction<Country[]>>,
    numSelected: number
}) {

    const [values, setValues] = useState<boolean[]>(
        countries.map(() => false)
    );

    const onClick = (index: number) => {

        if (numSelected < 8 || values[index]) {
            setValues(prev => prev.map((value, i) =>
                i === index ? !value : value
            ));

            if (!values[index]) {    // recently pressed
                setSelectedCountries(prev => [...prev, countries[index]])
            } else { // recently depressed
                setSelectedCountries(prev => prev.filter(c => c.name !== countries[index].name));
            }
        }

        console.log(numSelected + " Selected");
        console.log("Index: " + index)
        console.log(values)
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 ml-[3rem] mr-[3rem] bg-gray-300 rounded-3xl">
            {countries.map((country, index) => (
                (country) ? <Checkbox country={country} value={values[index]} onToggle={onClick} index={index} key={"ThirdPlaceCheckbox"+country.name}></Checkbox> : null
            ))}
        </div>
    );
}