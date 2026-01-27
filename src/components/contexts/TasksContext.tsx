import { createContext } from "react";
import type { Task } from "../types/Task";

export const TasksContext = createContext<TasksContextType | null>(null);

export type TasksContextType = {
    tasks: Task[];
    currentFilter: string;
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
    currentSort: number;
    setCurrentSort: React.Dispatch<React.SetStateAction<number>>;
    addTask: (title :string, priority: number) => void;
    deleteTask: (taskId: string) => void;
    toggleTaskCompletion: (taskId: string) => void;
    editTaskTitle: (id: string, newTitle: string) => void;
};