import { Button } from "../button/Button";
import { useTasks } from "../hooks/useTasks";

const status:string[] = ["すべて","未完了","完了済み"];

export const StatusFilter = () => {

    const {currentFilter, setCurrentFilter} = useTasks();
    
    return (
        <>
            {status.map((item)=>(
                <Button type="filter" isActive={item===currentFilter} onClick={()=>setCurrentFilter(item)} key={item}>{item}</Button>
            ))}
        </>
    );
}