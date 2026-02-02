import { render, screen } from "@testing-library/react";
// renderでコンポーネントを仮想的に描画、fireEventでイベント発火をシミュレート
import { vi, test, expect } from 'vitest';
import { InputTask } from "./InputTask";
import '@testing-library/jest-dom/vitest';

//カスタムフックのモック
vi.mock("../hooks/useTasks", () => ({
    useTasks: () => ({
    }),
}));

test("テキストインプットエリアが表示されてプレースホルダーが設定されている", () => {
    render(<InputTask />);
    const inputElement = screen.getByPlaceholderText("新しいタスクを入力...");
    expect(inputElement).toBeInTheDocument();
});

test("優先度の選択メニューが表示されている", () => {
    render(<InputTask />);
    const selectElement = screen.getByRole("combobox");

    // メニューが存在するか確認
    expect(selectElement).toBeInTheDocument();

    // オプションが正しいか確認
    expect(screen.getByRole("option", { name: "高優先度" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "中優先度" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "低優先度" })).toBeInTheDocument();
});
