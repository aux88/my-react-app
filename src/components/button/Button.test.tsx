import { render, fireEvent } from "@testing-library/react";
// renderでコンポーネントを仮想的に描画、fireEventでイベント発火をシミュレート
import { vi, test, expect } from 'vitest';
import { Button } from "./Button";
import styles from "./Button.module.css";

test("ボタンをクリックすると onClick が呼ばれる", () => {
    // jest.fn()でモック関数（呼び出し回数や引数を記録するダミー関数）を作る
    const handleClick = vi.fn();

    // Buttonコンポーネントを描画
    // 子要素"追加"を表示し、クリック時にhandleClickを呼ぶように設定
    const { getByText } = render(<Button onClick={handleClick} type="add">追加</Button>);

    // テキスト"追加"を含むボタンを取得
    const buttonElement = getByText("追加");

    // ボタンをクリックイベント発生
    fireEvent.click(buttonElement);

    // handleClickが1回呼ばれたことを確認
    expect(handleClick).toHaveBeenCalledTimes(1);
});

test("ボタンタイプがfilterで選択されている場合、activeのスタイルが適用されている", () => {
  // jest.fn()でモック関数（呼び出し回数や引数を記録するダミー関数）を作る
    const handleClick = vi.fn();

    // Buttonコンポーネントを描画
    // 子要素"すべて"を表示し、クリック時にhandleClickを呼ぶように設定
    const { getByText } = render(<Button onClick={handleClick} type="filter" isActive={true}>すべて</Button>);

    // テキスト"クリック"を含むボタンを取得
    const buttonElement = getByText("すべて");

    // 
    expect(buttonElement).toHaveClass(styles.active);
});