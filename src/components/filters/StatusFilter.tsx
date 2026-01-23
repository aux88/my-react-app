import { Button } from "../button/Button";

interface StatusFilterProps {
    status: string[];
    selected?: string;
}

export const StatusFilter = ({status,selected}:StatusFilterProps) => {
    return (
        <>
            {status.map((item)=>(
                <Button type="filter" isActive={item===selected} onClick={()=>console.log(`${item}`)} key={item}>{item}</Button>
            ))}
        </>
    );
}