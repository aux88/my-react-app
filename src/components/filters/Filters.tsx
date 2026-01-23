import styles from "./Filter.module.css";
import { StatusFilter } from "./StatusFilter";
import { AttributeFilter } from "./AttributeFilter";

export const Filters = () => {
    return (
        <div className={styles.filters}>
            <StatusFilter status={["すべて","未完了","完了済み"]} selected="すべて"></StatusFilter>
            <AttributeFilter attribute={["作成日時","優先度","タイトル"]}></AttributeFilter>
        </div>
    );
}
