import '../App.css'
import {useSortable} from '@dnd-kit/react/sortable';

export function Sortable({id, index} : {
    id: string,
    index: number,
}) {
    const {ref} = useSortable({id, index});

    return (
        <li ref={ref} className="font-[Poppins] text-[1.33rem] item p-[5px] bg-blue-300 w-[10rem]">{id}</li>
    );
}