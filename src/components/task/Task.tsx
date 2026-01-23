import type { ReactNode } from "react";
import styles from "./Task.module.css";

interface TaskProps {
    children: ReactNode;
    priority: "high"|"mid"|"low";
    onClickDelete(): void;
    taskId: string;
}

export const Task = ({children,priority,onClickDelete,taskId}:TaskProps) =>{

    let currentPriority: string;
    if(priority==="high"){
        currentPriority=styles.highPriority;
    }else if(priority==="mid"){
        currentPriority=styles.mediumPriority;
    }else{
        currentPriority=styles.lowPriority;
    }

    return (
        <li className={`${styles.task} ${currentPriority}`}>
                <input type="checkbox" id={taskId} onChange={()=>console.log("チェックボックス")}/>
                <label htmlFor={taskId}>{children}</label>
                <button className={styles.deleteButton} onClick={onClickDelete}>×</button>
        </li>
    );
}