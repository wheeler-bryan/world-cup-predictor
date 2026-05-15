import "../App.css"
import { QuadDrag } from "../Components/QuadDrag.tsx"
import {letters, groups, abbreviations, flags, Country} from "../assets/countries.ts"
import {useState} from "react";

export function MakePicks() {

    //create countries
    const [countries, setCountries] = useState<Country[][]>(
        groups.map((group, upperIndex) =>
            group.map((country, index) => new Country(country, abbreviations[upperIndex][index], flags[upperIndex][index]))
        )
    );

    //save current rankings of each country
    const [filteredCountries, setFilteredCountries] = useState<Country[][]>([
        [], [], [], [], [], [], [], [], [], [], [], []
    ]);


    return(
        <>
            <div className="h-screen">
                <h1 className="font-Poppins text-center mb-[1.5rem]">GROUP STAGES</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-[3rem] mr-[3rem]">
                    {countries.map((countries, index) =>
                        <QuadDrag
                            key={"Group " + letters[index]}
                            id={letters[index]}
                            countries={countries}
                            setCountries={(newRow) =>
                                setCountries(prev =>
                                    prev.map((r, i) => i === index ? (typeof newRow === 'function' ? newRow(r) : newRow) : r)
                                )
                            }
                            filteredCountries={filteredCountries[index]}
                            setFilteredCountries={(newRow) =>
                                setFilteredCountries(prev =>
                                    prev.map((r, i) => i === index ? (typeof newRow === 'function' ? newRow(r) : newRow) : r)
                                )
                            }
                        />
                    )}
                </div>
                <h1>THIRD PLACE ADVANCES</h1>
                <h4>Predict which of the 12 third place teams will move on to the Round of 32</h4>
            </div>
        </>
    );
}