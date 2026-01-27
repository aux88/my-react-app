import { Select, type SelectItem } from "../select/Select";
import { useTasks } from "../hooks/useTasks";

const selectItems : SelectItem[] = [
    {label: "作成日時", value:1},
    {label: "優先度", value:2},
    {label: "タイトル", value:3},
]


export const AttributeSort = () => {

    const {currentSort, setCurrentSort} = useTasks();

    return (       
        <Select items={selectItems} onChange={(value)=>setCurrentSort(Number(value))} value={currentSort.toString()} />
    );
}