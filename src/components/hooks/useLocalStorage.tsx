// src/hooks/useLocalStorage.js
import { useState } from "react";

function useLocalStorage(key :string,initialValue: string) {

    const [storedValue, setStoredValue] = useState(()=>{
    // 初期化時に localStorage からデータを取得
    // SSR 環境では window がないため、利用環境によってはガードが必要
    if (typeof window === "undefined") {
        return initialValue;
    }
    try {
        const storageData = localStorage.getItem(key);
        return storageData ? storageData: initialValue; 
    }catch(err){
        console.error(err);
        return initialValue;
    }
    });

    const setValue = (value: string) => {
        try {
            setStoredValue(value);
            // ブラウザ環境であれば localStorage に保存
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, value);
            }
        } catch (err) {
            console.error(err);
        }
    };
    // 現在の値と値を更新する関数を返す
    return [storedValue, setValue] as const;
}

export default useLocalStorage;