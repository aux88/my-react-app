import { render, screen, fireEvent } from "@testing-library/react";
// renderでコンポーネントを仮想的に描画、fireEventでイベント発火をシミュレート
import { vi, test, expect } from 'vitest';
import { AddButton } from "./AddButton";

const mockAddTask = vi.fn();

//カスタムフックのモック
vi.mock("../hooks/useTasks", () => ({
    useTasks: () => ({
        addTask: mockAddTask,
    }),
}));

test("[追加]ボタンが生成されている", () => {
    const handleReset = vi.fn();

    render(<AddButton title="ダミー" priority={1} reset={handleReset}/>);

    const buttonElement = screen.getByRole("button", { name: "追加" });

    // ボタンがドキュメント内に存在するか確認
    expect(buttonElement).toBeInTheDocument();
});

test("[追加]ボタンをクリックするとonClick関数が呼ばれてaddTaskとresetが実行される", async () => {
    const reset = vi.fn();

    render(<AddButton title="ダミー" priority={1} reset={reset}/>);
    
    const buttonElement = screen.getByRole("button", { name: "追加" });
    
    // ボタンをクリックイベント発生
    fireEvent.click(buttonElement);

    // addTaskが正しい引数で呼ばれたか確認
    expect(mockAddTask).toHaveBeenCalledWith("ダミー", 1);
    // resetが呼ばれたか確認
    expect(reset).toHaveBeenCalled();
});
