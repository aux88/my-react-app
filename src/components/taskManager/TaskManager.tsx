import { TaskList } from "../taskList/TaskList";
import { InputTask } from "../inputTask/InputTask";
import { Filters } from "../filters/Filters";
import styles from "./TaskManager.module.css"
import { TaskProvider } from "../providers/TasksProvider"

export const TaskManager = () => {

  return (
    <div className={styles.taskManager}>
      <h1 className={styles.title}>タスク管理</h1>
      <TaskProvider>
        <Filters />
        <InputTask />
        <TaskList />
      </TaskProvider>
    </div>
  );
};
