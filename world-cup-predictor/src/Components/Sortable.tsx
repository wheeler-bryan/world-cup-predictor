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
        (index === 2) ? "bg-yellow-200 border-[0.01rem]" : "text-gray-400 mb-[0.15rem]";

    const padding: string = (index < 1) ? "pr-[1.75rem]" : "pr-[1.5rem]"

    return (
        <li ref={setNodeRef} {...listeners} {...attributes} style={style} key={"li " + id}
            className={`flex font-[Poppins] text-[1.33rem] item p-[5px] w-[18rem]  ${color}`}>
            <h3 className={`justify-self-start text-black ${padding}`}>{index+1}</h3>
            <img src={image} alt={id} height="50rem" width="38rem" />
            <h3 className="pl-[1rem] text-center">{id}</h3>
        </li>
    );
}