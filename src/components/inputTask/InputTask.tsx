import { memo, useState } from "react";
import { Select, type SelectItem } from "../select/Select";
import styles from "./InputTask.module.css";
import { AddButton } from "../button/AddButton";

const selectItems : SelectItem[] = [
    {label: "高優先度", value:1},
    {label: "中優先度", value:2},
    {label: "低優先度", value:3},
]


export const InputTask = memo(() => {
    
    const [ title, setTitle ] = useState("");
    const [ priority, setPriority ] = useState(1);


    const onChangeTitle = (value:string) =>{
        setTitle(value)
    }

    const reset = () => {
        setTitle("");
        setPriority(1);
    }

    return (
        <div className={styles.addTask}>
            <input type="text" placeholder="新しいタスクを入力..." onChange={(e)=>onChangeTitle(e.target.value)} value={title}/>
            <Select items={selectItems} onChange={(value) => setPriority(Number(value))} value={priority.toString()} />
            <AddButton title={title} priority={priority} reset={reset}/>
        </div>
    );
});