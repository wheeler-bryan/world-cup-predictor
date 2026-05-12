import "../App.css"
import { useState } from "react";
import {Sortable} from "../Components/Sortable.tsx";

class Country {
    name: string;
    active: boolean;

    constructor(name: string) {
        this.name = name;
        this.active = false;
    }
}

export function MakePicks() {
    const [america, setAmerica] = useState(new Country("USA"));
    const [australia, setAustralia] = useState(new Country("Australia"));
    const [ireland, setIreland] = useState(new Country("Ireland"));
    const [paraguay, setParaguay] = useState(new Country("Paraguay"));

    const items : Country[] = [america, australia, ireland, paraguay];

    const handleClick = () => {
        setAmerica(prev => ({ ...prev, active: true }));
    }

    return(
        <>
            <div className="h-screen">
                <h1 className="font-Poppins text-center">TEST RUNNING...</h1>
                <button onClick={handleClick}>HelloPeter</button>
                <ul className="list">
                    {items.filter(item => item.active).map((item, index) =>
                        <Sortable key={item.name} id={item.name} index={index} />
                    )}
                </ul>
            </div>
        </>
    );
}