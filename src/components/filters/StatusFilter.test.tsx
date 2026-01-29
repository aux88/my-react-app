import { render, screen, fireEvent } from "@testing-library/react";
// renderでコンポーネントを仮想的に描画、fireEventでイベント発火をシミュレート
import { vi, test, expect } from 'vitest';
import { StatusFilter } from "./StatusFilter";

const mockSetCurrentFilter = vi.fn();

//カスタムフックのモック
vi.mock("../hooks/useTasks", () => ({
    useTasks: () => ({
        currentFilter: 1,
        setCurrentFilter: mockSetCurrentFilter,
    }),
}));

test("フィルターが正しく表示されている", () => {
    const handleReset = vi.fn();

    render(<StatusFilter/>);

    // フィルター全種類ボタンがあるか確認
    expect(screen.getByRole("button", { name: "すべて" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "未完了" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "完了済み" })).toBeInTheDocument();
});

test("フィルターが選択されたらsetCurrentFilterが呼ばれること", () => {
    const handleReset = vi.fn();

    render(<StatusFilter/>);

    const selectAllButton = screen.getByRole("button", { name: "すべて" });
    const selectInCompletedButton = screen.getByRole("button", { name: "未完了" });
    const selectCompletedButton = screen.getByRole("button", { name: "完了済み" });

    fireEvent.click(selectAllButton);
    expect(mockSetCurrentFilter).toHaveBeenCalledWith("すべて");

});

