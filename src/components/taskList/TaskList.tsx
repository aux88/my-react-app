import styles from "./TaskList.module.css";
import type { Task } from "../types/Task";
import { useTasks } from "../hooks/useTasks";
import { TaskItem } from "../taskItem/TaskItem";

const sortByTitle = (tasks:Task[]) =>{
  tasks.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else {
      return -1;
    }
  })
}

const sortByCreatedAt = (tasks:Task[]) =>{
  tasks.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return 1;
    } else {
      return -1;
    }
  })
}

const sortByPriority = (tasks:Task[]) =>{
  tasks.sort((a, b) => {
    if (a.priority > b.priority) {
      return 1;
    } else {
      return -1;
    }
  })
}

const createFilteredTask = (tasks:Task[], selectedStatus:string, sortKey:number): Task[] => {

  let newTasks: Task[];

  if(selectedStatus==="未完了"){
    newTasks=tasks.filter(task=>!task.isCompleted);
  }else if(selectedStatus==="完了済み"){ 
      newTasks=tasks.filter(task=>task.isCompleted);
  }else{ /** すべて */
    newTasks=tasks.slice();
  }

  /** 1=作成日時、2=優先度、3=タイトル */
  if(sortKey===1){
    sortByCreatedAt(newTasks);
  }else if (sortKey===2){
    sortByPriority(newTasks);
  }else{
    sortByTitle(newTasks);
  }
  return newTasks;
}

export const TaskList = () => {

  const { tasks, currentFilter, currentSort } = useTasks();

  const previewTasks:Task[] = createFilteredTask(tasks,currentFilter,currentSort);
  
  return (
    <ul id="taskList" className={styles.taskList}>
      {previewTasks.map((task:Task) => (
        <TaskItem task={task} key={task.taskId}/>
      ))}
    </ul>
  );
};
