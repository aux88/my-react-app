import { useState } from "react";
import styles from "./TaskItem.module.css";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/Task";

interface TaskItemProps {
    task: Task;
}

export const TaskItem = ({task}:TaskItemProps) =>{
    
    const [ isCompleted, setIsCompleted ] = useState(task.isCompleted);
    const { deleteTask, toggleTaskCompletion, editTaskTitle } = useTasks();

    const [ isEditing, setIsEditing ] = useState(false);
    const [ title, setTitle ] = useState(task.title);

    const onChangeTitle = (value:string) =>{
        setTitle(value)
    }

    let currentPriority: string;
    if(task.priority===1){
        currentPriority=styles.highPriority;
    }else if(task.priority===2){
        currentPriority=styles.mediumPriority;
    }else{
        currentPriority=styles.lowPriority;
    }

    const handleChange = (taskId :string) =>{
        setIsCompleted(!isCompleted);
        toggleTaskCompletion(taskId);
    }

    const handleFinishEditing= () => {
        setIsEditing(false);
        editTaskTitle(task.taskId, title);
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            editTaskTitle(task.taskId, title);
        }
    };
    return (
        <li className={`${styles.task} ${currentPriority}`}>
                <input type="checkbox" id={task.taskId} onChange={()=>handleChange(task.taskId)} checked={isCompleted} />
                {!isEditing?
                (<label
                    className={isCompleted ? styles.delete : ""}
                    onDoubleClick={(e) => {e.preventDefault();setIsEditing(true);}}>{task.title}</label>):
                (<input type="text" onChange={(e)=>onChangeTitle(e.target.value)} value={title} onBlur={handleFinishEditing} onKeyDown={handleKeyDown}/>)}
                <button className={styles.deleteButton} onClick={()=>deleteTask(task.taskId)}>×</button>
        </li>
    );
}
