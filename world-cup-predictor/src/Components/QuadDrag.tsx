import "../App.css"
import { type Dispatch, type SetStateAction } from 'react';
import { Sortable } from "./Sortable.tsx";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Country } from '../assets/countries.ts'
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

export function QuadDrag( { id, countries, setCountries, filteredCountries, setFilteredCountries, checkState } : {
    id: string,
    countries: Country[],
    setCountries: Dispatch<SetStateAction<Country[]>>,
    filteredCountries: Country[],
    setFilteredCountries: Dispatch<SetStateAction<Country[]>>,
    checkState: (group: string) => void,
}) {

    // for mobile applications
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    // clicking a country's button
    // sets that index of a country to active and appends to filtered countries
    // only way to get a country INTO filtered countries
    const handleClick = (index: number) => {
        setCountries(prev => prev.map((country, i) =>
            i === index ? { ...country, active: true } : country
        ));

        setFilteredCountries(prev => [...prev, countries[index]]);
    };

    // handles changing the indices of the countries once they are dragged
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        const old_index: number = filteredCountries.findIndex(c => c.name === active.id);
        const new_index: number = filteredCountries.findIndex(c => c.name === over?.id);

        console.log("Motion Detected: Group:", id);
        console.log("Country:", active.id);
        console.log("over?:", over?.id);
        console.log("filteredCountries:", filteredCountries.map(c => c.name));
        console.log("oldIndex:", filteredCountries.findIndex(c => c.name === active.id));
        console.log("newIndex:", filteredCountries.findIndex(c => c.name === over?.id));

        if (active.id !== over?.id) {
            setFilteredCountries(prev => {
                const oldIndex = prev.findIndex(c => c.name === active.id);
                const newIndex = prev.findIndex(c => c.name === over?.id);
                return arrayMove(prev, oldIndex, newIndex);
            });
        }

        if((old_index >= 2 || new_index >= 2) && old_index !== new_index) {
            checkState(id); // if we have moved a country that would affect selectedThird
        }
    };

    return(
        <div className="m-[0.2rem] bg-gray-300 rounded-3xl w-[18rem]">
            <h2 className="ml-[0.75rem] pt-[0.25rem] pb-[0.25rem]">{"Group " + id}</h2>
            <DndContext id={"DNDContextGroup" + id} sensors={sensors} onDragEnd={handleDragEnd}> {/* MAKE THIS A MAP FUNCTION*/}
                <div className="flex justify-center">
                    {countries.map((country, i) =>
                        (!country.active ?
                        <button key={country.name + " Button"} id={country.name + " Button"} className="m-[0.5rem] p-[0.25rem] rounded-xl bg-[#ececec] hover:bg-[#e0e0e0]" onClick={() => handleClick(i)}>
                            <img src={country.flag} alt={country.abbreviation} height="55rem" width="41rem" />
                            <h3>{country.abbreviation}</h3>
                        </button>
                        : null)
                    )}
                </div>
                <SortableContext id={"SortableGroup" + id} items={filteredCountries.map(c => c.name)}>
                    <ul className="list">
                        {filteredCountries.map((country, index) =>
                                <Sortable key={country.name} id={country.name} image={country.flag} index={index} />
                        )}
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    );
}