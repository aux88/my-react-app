import { renderHook, act } from "@testing-library/react";
import { test, expect, beforeEach } from 'vitest';
import { useTasks } from "./useTasks";
import { TaskProvider } from "../providers/TasksProvider"

const wrapper = ({ children }: { children: React.ReactNode }) => <TaskProvider>{children}</TaskProvider>
    
beforeEach(() => {
    localStorage.clear();
});

test('カスタムフックuseTasks 初期状態', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    // 配列が存在している
    expect(Array.isArray(result.current.tasks)).toBe(true);
    expect(result.current.tasks.length).toBe(0);
    // フィルタが"全て"になっている
    expect(result.current.currentFilter).toBe("すべて");
    // ソートが"作成日時"になっている
    expect(result.current.currentSort).toBe(1);
});

test('カスタムフックuseTasks フィルタの変更', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    // フィルタを変更
    act(() => {
        result.current.setCurrentFilter("未完了");
    })
    // フィルタが変更されている
    expect(result.current.currentFilter).toBe("未完了");
});

test('カスタムフックuseTasks ソートの変更', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    // ソートを変更
    act(() => {
        result.current.setCurrentSort(2);
    })
    // ソートが変更されている
    expect(result.current.currentSort).toBe(2);
});

test('カスタムフックuseTasks タスクの操作', () => {
    const { result } = renderHook(() => useTasks(), { wrapper });

    // addTaskテスト
    act(() => {
        result.current.addTask("タイトル",1);
    })
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe("タイトル");
    expect(result.current.tasks[0].priority).toBe(1);
    expect(result.current.tasks[0].isCompleted).toBe(false);

    const taskId = result.current.tasks[0].taskId;

    // toggleTaskCompletionテスト
    act(() => {
        result.current.toggleTaskCompletion(taskId);
    })
    expect(result.current.tasks[0].isCompleted).toBe(true);

    //editTaskTitleテスト
    act(() => {
        result.current.editTaskTitle(taskId, "変更後のタイトル");
    })
    expect(result.current.tasks[0].title).toBe("変更後のタイトル");

    // deleteTaskテスト
    act(() => {
        result.current.deleteTask(taskId);
    })
    expect(result.current.tasks.length).toBe(0);
});
