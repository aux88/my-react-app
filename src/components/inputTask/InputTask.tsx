import { Button } from "../button/Button";
import { Select } from "../select/Select";
import styles from "./InputTask.module.css";

export const InputTask = () => {
    
    return (
        <div className={styles.addTask}>
            <input type="text" placeholder="新しいタスクを入力..." />
            <Select items={["高優先度","中優先度","低優先度"]} />
            <Button type="add" onClick={()=>console.log("追加")}>追加</Button>
        </div>
    );
};