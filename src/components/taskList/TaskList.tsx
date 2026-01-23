import { Task } from "../task/Task";
import styles from "./TaskList.module.css"

export const TaskList = () =>{
    return(
        <ul id="taskList" className={styles.taskList}>
            <Task priority='high' taskId="task1" onClickDelete={()=>console.log("削除")}>上司にメール</Task>
            <Task priority='mid' taskId="task2" onClickDelete={()=>console.log("削除")}>先輩のメール確認</Task>
            <Task priority='low' taskId="task3" onClickDelete={()=>console.log("削除")}>家の掃除</Task>
        </ul>
    );
}