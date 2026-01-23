
import { TaskList } from '../taskList/TaskList';
import { InputTask } from '../inputTask/InputTask';
import { Filters } from '../filters/Filters';
import styles from "./TaskManager.module.css";

export const TaskManager = () => {
    return(
        <div className={styles.taskManager}>
            <h1 className={styles.title}>タスク管理</h1>
            <Filters />
            <InputTask />
            <TaskList />
        </div>
    );
}