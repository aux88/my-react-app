import { render, screen, fireEvent } from "@testing-library/react";
// renderでコンポーネントを仮想的に描画、fireEventでイベント発火をシミュレート
import { vi, test, expect } from 'vitest';
import { TaskList } from "./TaskList";
import type { Task } from "../types/Task"

const mockTasks: Task[] = [
    {taskId: "001", title: "bbb", priority: 3, isCompleted: false, createdAt: 20260129,},
    {taskId: "002", title: "ccc", priority: 1, isCompleted: true, createdAt: 20260128,},
    {taskId: "003", title: "aaa", priority: 2, isCompleted: false, createdAt: 20260127,},
]  

const mockUseTasks = {
  tasks: mockTasks,
  currentFilter: "すべて",
  currentSort: 1,
};

//カスタムフックのモック
vi.mock("../hooks/useTasks", () => ({
    useTasks: () => mockUseTasks,
}));


test("フィルタが「すべて」のときタスクが3件表示されること", () => {
    render(<TaskList/>);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);

    expect(screen.getByText("bbb")).toBeInTheDocument();
    expect(screen.getByText("ccc")).toBeInTheDocument();
    expect(screen.getByText("aaa")).toBeInTheDocument();

});

test("フィルタが「未完了」のとき未完了のタスクのみ表示されること", () => {

    mockUseTasks.currentFilter = "未完了";

    render(<TaskList/>);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2); // 001,003

    expect(screen.getByText("bbb")).toBeInTheDocument();
    expect(screen.getByText("aaa")).toBeInTheDocument();
    expect(screen.queryByText("ccc")).toBeNull();

});

test("フィルタが「完了済み」のとき完了済みのタスクのみ表示されること", () => {

    mockUseTasks.currentFilter = "完了済み";

    render(<TaskList/>);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(1);

    expect(screen.getByText("ccc")).toBeInTheDocument();
    expect(screen.queryByText("bbb")).toBeNull();
    expect(screen.queryByText("aaa")).toBeNull();
});

test("ソート順が優先度のとき002→003→001の順で表示されること", () => {

    mockUseTasks.currentFilter = "すべて";
    mockUseTasks.currentSort = 2;

    render(<TaskList/>);

    const items = screen.getAllByRole("listitem");
    const titles = items.map((item) =>item.querySelector("label")?.textContent);

    expect(titles).toEqual(["ccc", "aaa", "bbb"]);
});

test("ソート順がタイトルのとき003→001→002の順で表示されること", () => {

    mockUseTasks.currentFilter = "すべて";
    mockUseTasks.currentSort = 3;

    render(<TaskList/>);

    const items = screen.getAllByRole("listitem");
    const titles = items.map((item) =>item.querySelector("label")?.textContent);


    expect(titles).toEqual(["aaa", "bbb", "ccc"]);
});

test("ソート順が作成日時のとき003→002→001の順で表示されること", () => {

    mockUseTasks.currentFilter = "すべて";
    mockUseTasks.currentSort = 1;

    render(<TaskList/>);

    const items = screen.getAllByRole("listitem");
    const titles = items.map((item) =>item.querySelector("label")?.textContent);

    expect(titles).toEqual(["aaa", "ccc", "bbb"]);
});
