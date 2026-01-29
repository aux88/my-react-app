import { render, screen, fireEvent } from "@testing-library/react";
// renderでコンポーネントを仮想的に描画、fireEventでイベント発火をシミュレート
import { vi, test, expect } from 'vitest';
import { AttributeSort } from "./AttributeSort";

const mockSetCurrentSort = vi.fn();

//カスタムフックのモック
vi.mock("../hooks/useTasks", () => ({
    useTasks: () => ({
        currentSort: 1,
        setCurrentSort: mockSetCurrentSort,
    }),
}));

test("ソートのSelectメニューが正しく生成されている", () => {
    const handleReset = vi.fn();

    render(<AttributeSort/>);

    const selectElement = screen.getByRole("combobox");

    // メニューが存在するか確認
    expect(selectElement).toBeInTheDocument();

    // オプションが正しいか確認
    expect(screen.getByRole("option", { name: "作成日時" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "優先度" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "タイトル" })).toBeInTheDocument();
});

test("選択されたらsetCurrentSortが呼ばれる", () => {
    const handleReset = vi.fn();

    render(<AttributeSort/>);

    const selectElement = screen.getByRole("combobox");

    // セレクトイベント発生
    fireEvent.change(selectElement,{ target: { value: "1" }});


    // 正しい引数で呼ばれたか確認
    expect(mockSetCurrentSort).toHaveBeenCalledWith(1);
});

