import "../App.css"
import { type Dispatch, type SetStateAction } from 'react';
import { Sortable } from "./Sortable.tsx";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Country } from '../assets/countries.ts'
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

export function QuadDrag( { id, countries, filteredCountries, setFilteredCountries, checkThird, checkKO } : {
    id: string,
    countries: Country[],
    filteredCountries: Country[],
    setFilteredCountries: Dispatch<SetStateAction<Country[]>>,
    checkThird: (group: string) => void,
    checkKO: (country_name: string, thirdWipe?: boolean) => void,
}) {

    // for mobile applications
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    // clicking a country's button
    // sets that index of a country to active and appends to filtered countries
    // only way to get a country INTO filtered countries
    const handleClick = (index: number) => {
        if (filteredCountries.length === 2) {
            const fourthPlace = countries.filter((c, i) =>
                i !== index && !filteredCountries.some(fc => fc?.name === c.name)
            );

            setFilteredCountries(prev => [...prev, countries[index], fourthPlace[0]]); // countries.filter those that arent in ...
        } else {
            setFilteredCountries(prev => [...prev, countries[index]]);
        }
    };

    // handles changing the indices of the countries once they are dragged
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

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

        // check the third place country bug on drag
        if ((old_index >= 2 || new_index >= 2) && old_index !== new_index) {
            checkThird(id); // if we have moved a country that would affect selectedThird
        }

        const first_index: number = (old_index < new_index) ? old_index : new_index;
        const last_index: number = (old_index < new_index) ? new_index : old_index;
        let num_purge: number = 0;
        let offset: number = 0;
        let third_wipe: boolean = false;

        if (old_index !== new_index) {
            if (first_index === 0 && last_index >= 2) { // 1 is replacing / being replaced by 3 or 4, causing a top 3 shift
                num_purge = 3;
                third_wipe = true;
                console.log("full shift")
            } else if (first_index === 0 && last_index == 1) { // 1 is replacing / being replaced by 2, causing only the top two to shift
                num_purge = 2;
                console.log("top shift")
            } else if (first_index === 1 && last_index >= 2) { // 2 is replacing / being replaced by 3 or 4, causing the bottom two to shift
                num_purge = 2;
                offset = 1;
                third_wipe = true;
                console.log("bottom shift");
            } else if (first_index === 2) { // 3 is replacing / being replaced by 4, causing the last value to shift
                num_purge = 1;
                offset = 2;
                third_wipe = true;
                console.log("last shift")
            }

            for (let i: number = offset; i < num_purge + offset; i++) {
                if (i !== 2) {
                    checkKO(filteredCountries[i].name);
                } else {
                    checkKO(filteredCountries[i].name, third_wipe);
                }
            }
        }
    };

    return(
        <div className="m-[0.2rem] bg-gray-300 rounded-3xl w-[18rem]">
            <h2 className="ml-[0.75rem] pt-[0.25rem] pb-[0.25rem]">{"Group " + id}</h2>
            <DndContext id={"DNDContextGroup" + id} sensors={sensors} onDragEnd={handleDragEnd}> {/* MAKE THIS A MAP FUNCTION*/}
                <div className="flex justify-center">
                    {countries.map((country, i) =>
                        ((filteredCountries.filter(c => c.name === country.name).length === 0) ?
                        <button key={country.name + " Button"} id={country.name + " Button"} className="m-[0.5rem] p-[0.25rem] rounded-xl bg-[#ececec] hover:bg-[#e0e0e0] cursor-pointer" onClick={() => handleClick(i)}>
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