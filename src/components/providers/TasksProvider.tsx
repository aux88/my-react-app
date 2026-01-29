import { useEffect, useState } from "react";
import { TasksContext, type TasksContextType } from "../contexts/TasksContext";
import type { Task } from "../types/Task";

import useLocalStorage from "../hooks/useLocalStorage"

interface TaskContextProviderProps {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }:TaskContextProviderProps) => {

  const defaultFilter: string = "すべて";
  const defaultSort: number = 1; // 作成日時;
  const defaultTasks: Task[] =[];
  const [storedValue, setStoredValue] = useLocalStorage("tasks",JSON.stringify(defaultTasks));

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      return JSON.parse(storedValue);
    } catch {
      return [];
  }});

  const [currentFilter, setCurrentFilter] = useState(defaultFilter);
  const [currentSort, setCurrentSort] = useState(defaultSort);

  useEffect(()=>{
    setStoredValue(JSON.stringify(tasks));
  },[tasks]);

  const addTask = (title :string, priority :number) => {
    setTasks([
      ...tasks,
      { priority: priority,
        taskId: new Date().getTime().toString(),
        title: title,
        createdAt: Date.now(),
        isCompleted: false,
      },
    ]);
  };

  const deleteTask = (targetId :string) => {
    setTasks(tasks.filter((task) => task.taskId !== targetId));
  };

  const toggleTaskCompletion = (targetId :string) => {
    setTasks(tasks.map((task)=>
      task.taskId===targetId ? {...task, isCompleted: !task.isCompleted} : task));
  }

  const editTaskTitle = (targetId :string, newTitle :string) => {
    setTasks(tasks.map((task)=>
      task.taskId===targetId ? {...task, title: newTitle} : task));
  }

  const value :TasksContextType = { 
    tasks, 
    currentFilter, 
    setCurrentFilter,
    currentSort,
    setCurrentSort,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    editTaskTitle
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
