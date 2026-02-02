import { renderHook, act } from "@testing-library/react";
import { test, expect, beforeEach } from 'vitest';
import useLocalStorage from "./useLocalStorage"

beforeEach(() => {
    localStorage.clear();
});

test('ローカルストレージのテスト（初期状態）', () => {
    const { result } = renderHook(() => useLocalStorage("key", "initialValue"));

    // 初期状態ではinitialValueの値がセットされる
    const [storedValue, setStoredValue] = result.current;
    expect(storedValue).toBe("initialValue");
});

test('ローカルストレージの更新', () => {
    const { result } = renderHook(() => useLocalStorage("key", "initialValue"));

    const [storedValue, setStoredValue] = result.current;
    // 値をセット
    act(() => {
        setStoredValue("newValue");
    });

    // 値が更新されている
    const [newValue] = result.current;
    expect(newValue).toBe("newValue");

    // ローカルストレージに反映されている
    expect(localStorage.getItem("key")).toBe("newValue");
});