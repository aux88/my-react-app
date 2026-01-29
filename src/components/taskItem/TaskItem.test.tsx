import { render, screen, fireEvent } from "@testing-library/react";
// renderでコンポーネントを仮想的に描画、fireEventでイベント発火をシミュレート
import { vi, test, expect } from 'vitest';
import { TaskItem } from "./TaskItem";
import type { Task } from "../types/Task"
import styles from "./TaskItem.module.css";

const mockDeleteTask = vi.fn();
const mockToggleTask = vi.fn();
const mockeEditTaskTitleTask = vi.fn();

//カスタムフックのモック
vi.mock("../hooks/useTasks", () => ({
    useTasks: () => ({
        deleteTask: mockDeleteTask,
        toggleTaskCompletion: mockToggleTask,
        editTaskTitle: mockeEditTaskTitleTask,
    }),
}));

test("タスクアイテムの表示(優先度高、未完了)", () => {
    const handleReset = vi.fn();

    const task: Task={
        taskId: "001",
        title: "タスクのテスト1",
        priority: 1,
        isCompleted: false,
        createdAt: Date.now(),
    }

    render(<TaskItem task={task} key={task.taskId}/>);

    // リストアイテムが生成された
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();

    // タイトルが表示されている(取り消し線なし)
    const titleLabel = screen.getByText("タスクのテスト1");
    expect(titleLabel).toBeInTheDocument();
    expect(titleLabel).not.toHaveClass(styles.delete);

    // チェックボックスが表示されている(未完了)
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // 削除ボタンが存在している
    const deleteButton = screen.getByRole("button", { name: "×" });
    expect(deleteButton).toBeInTheDocument();

    // 優先度が高い（赤になっている）
    expect(listItem).toHaveClass(styles.highPriority);
});

test("タスクアイテムの表示(優先度低、完了済み)", () => {
    const handleReset = vi.fn();

    const task: Task={
        taskId: "002",
        title: "タスクのテスト2",
        priority: 3,
        isCompleted: true,
        createdAt: Date.now(),
    }

    render(<TaskItem task={task} key={task.taskId}/>);

    // リストアイテムが生成された
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();

    // タイトルが表示されている(取り消し線あり)
    const titleLabel = screen.getByText("タスクのテスト2");
    expect(titleLabel).toBeInTheDocument();
    expect(titleLabel).toHaveClass(styles.delete);

    // チェックボックスが表示されている（完了済み）
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();

    // 削除ボタンが存在している
    const deleteButton = screen.getByRole("button", { name: "×" });
    expect(deleteButton).toBeInTheDocument();

    // 優先度が低い（緑になっている）
    expect(listItem).toHaveClass(styles.lowPriority);
});


test("タスクアイテムの表示(優先度中、完了済み)", () => {
    const handleReset = vi.fn();

    const task: Task={
        taskId: "003",
        title: "タスクのテスト3",
        priority: 2,
        isCompleted: true,
        createdAt: Date.now(),
    }

    render(<TaskItem task={task} key={task.taskId}/>);

    // リストアイテムが生成された
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();

    // タイトルが表示されている(取り消し線あり)
    const titleLabel = screen.getByText("タスクのテスト3");
    expect(titleLabel).toBeInTheDocument();
    expect(titleLabel).toHaveClass(styles.delete);

    // チェックボックスが表示されている（完了済み）
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();

    // 削除ボタンが存在している
    const deleteButton = screen.getByRole("button", { name: "×" });
    expect(deleteButton).toBeInTheDocument();

    // 優先度が中くらい（黄色になっている）
    expect(listItem).toHaveClass(styles.mediumPriority);
});


test("ダブルクリックでタイトルが編集できる", () => {
    const handleReset = vi.fn();

    const task: Task={
        taskId: "004",
        title: "タスクのテスト4",
        priority: 2,
        isCompleted: false,
        createdAt: Date.now(),
    }

    render(<TaskItem task={task} key={task.taskId}/>);

    const listItem = screen.getByRole("listitem");

    const titleLabel = screen.getByText("タスクのテスト4");
    fireEvent.doubleClick(titleLabel);
    
    expect(screen.getByRole("textbox")).toBeInTheDocument();
});