import "../App.css"
import { useState } from "react";
import { Sortable } from "./Sortable.tsx";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

class Country {
    name: string;
    active: boolean;

    constructor(name: string) {
        this.name = name;
        this.active = false;
    }
}

export function QuadDrag( { inputCountries, abbreviations } : {
    inputCountries: string[],
    abbreviations: string[],
}) {

    const [countries, setCountries] = useState<Country[]>([
        new Country(inputCountries[0]),
        new Country(inputCountries[1]),
        new Country(inputCountries[2]),
        new Country(inputCountries[3]),
    ]);

    const [filteredCountries, setFilteredCountries] = useState<Country[]>([
    ]);

    const handleClick = (index: number) => {
        setCountries(prev => prev.map((country, i) =>
            i === index ? { ...country, active: true } : country
        ));

        setFilteredCountries(prev => [...prev, countries[index]]);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setFilteredCountries(prev => {
                const oldIndex = prev.findIndex(c => c.name === active.id);
                const newIndex = prev.findIndex(c => c.name === over?.id);
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    return(
        <div>
            <DndContext onDragEnd={handleDragEnd}>
                {!countries[0].active ? <button id="countryOne" className="m-[0.5rem] p-[0.25rem] rounded-xl border-black border-2" onClick={() => handleClick(0)}>{abbreviations[0]}</button> : null}
                {!countries[1].active ? <button id="countryTwo" className="m-[0.5rem] p-[0.25rem] rounded-xl border-black border-2" onClick={() => handleClick(1)}>{abbreviations[1]}</button> : null}
                {!countries[2].active ? <button id="countryThree" className="m-[0.5rem] p-[0.25rem] rounded-xl border-black border-2" onClick={() => handleClick(2)}>{abbreviations[2]}</button> : null}
                {!countries[3].active ? <button id="countryFour" className="m-[0.5rem] p-[0.25rem] rounded-xl border-black border-2" onClick={() => handleClick(3)}>{abbreviations[3]}</button> : null}
                <ul className="list">
                    {filteredCountries.map((country, index) =>
                        <Sortable key={country.name} id={country.name} index={index} />
                    )}
                </ul>
            </DndContext>
        </div>
    );
}