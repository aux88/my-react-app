import { memo } from "react";
import { Button } from "../button/Button";
import { useTasks } from "../hooks/useTasks";

interface AddButtonProps {
    title: string;
    priority: number;
    reset(): void; 
}

export const AddButton=memo(({title, priority, reset}:AddButtonProps)=>{
    const { addTask } = useTasks();

    const onClickEvent = () => {
        addTask(title,priority);

        // 入力欄リセット
        reset();
    }

    return(
        <Button type="add" onClick={onClickEvent}>追加</Button>
    );
});