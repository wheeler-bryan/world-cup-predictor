import '../App.css'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function Sortable({id, index, image} : {
    id: string,
    index: number,
    image: string,
}) {

    const {
        setNodeRef,
        listeners,
        attributes,
        transform,
        transition,
    } = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const color: string = (index < 2) ? "bg-green-200 border-[0.01rem]" :
        (index === 2) ? "bg-yellow-200 border-[0.01rem]" : "";

    return (
        <li ref={setNodeRef} {...listeners} {...attributes} style={style} key={"li " + id}
            className={`font-[Poppins] text-[1.33rem] item p-[5px] w-[18rem] ${color}`}>

            <img src={image} alt={id} height="50rem" width="38rem" />
            <h3>{id}</h3>
        </li>
    );
}