import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

export const useTasks = () => {

    const context = useContext(TasksContext);

    // Provider が存在しない環境で呼ぶとエラーを投げる
    if (!context) {
        throw new Error("useTasks must be used within an TaskProvider");
    }

    return context;
}