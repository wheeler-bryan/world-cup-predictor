import '../App.css'
import { Country } from '../assets/countries.ts'
import { type Dispatch, type SetStateAction } from "react";
import { Checkbox } from "./Checkbox.tsx";

export function ThirdPlace( { countries, selectedCountries, setSelectedCountries, checkKO } : {
    countries: Country[],
    selectedCountries: (Country | null)[],
    setSelectedCountries: Dispatch<SetStateAction<(Country | null)[]>>,
    checkKO: (country: string) => void,
}) {

    const numSelected: number = selectedCountries.filter(c => c !== null).length;

    const onClick = (index: number) => {

        if (numSelected < 8 || selectedCountries[index]) {

            setSelectedCountries(
                prev => prev.map((country, i) => index === i ?
                    (!(selectedCountries[index]) ? countries[index] : null)
                    : country)
            );
        }

        if (selectedCountries[index] && numSelected === 8) { // if all are filled out and a value is depressed
            for (let i = 0; i < 12; i++) {
                const country_i = selectedCountries[i];
                if (country_i) {
                    checkKO(country_i.name);
                }
            }
        }

        // console.log(numSelected + " Selected");
        // console.log("Index: " + index)
        // console.log("[" + countries[0]?.name + ", " + countries[1]?.name + ", " + countries[2]?.name + ", " + countries[3]?.name + ", " + countries[4]?.name + ", " + countries[5]?.name + ", " + countries[6]?.name + ", " + countries[7]?.name + ", " + countries[8]?.name + ", " + countries[9]?.name + ", " + countries[10]?.name + ", " + countries[11]?.name + "]")
        // console.log("[" + selectedCountries[0]?.name + ", " + selectedCountries[1]?.name + ", " + selectedCountries[2]?.name + ", " + selectedCountries[3]?.name + ", " + selectedCountries[4]?.name + ", " + selectedCountries[5]?.name + ", " + selectedCountries[6]?.name + ", " + selectedCountries[7]?.name + ", " + selectedCountries[8]?.name + ", " + selectedCountries[9]?.name + ", " + selectedCountries[10]?.name + ", " + selectedCountries[11]?.name + "]")
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 ml-[3rem] mr-[3rem] bg-gray-300 rounded-3xl">
            {countries.map((country, index) => (
                (country) ?
                    <Checkbox country={country}
                              value={!!(selectedCountries[index] && selectedCountries[index].name === country.name)}
                              onToggle={onClick}
                              index={index}
                              key={"ThirdPlaceCheckbox"+country.name} />
                    : null
            ))}
        </div>
    );
}