import styles from "./Filter.module.css";
import { StatusFilter } from "./StatusFilter";
import { AttributeSort } from "./AttributeSort";
import { memo } from "react";

export const Filters = memo(() => {
    return (
        <div className={styles.filters}>
            <StatusFilter></StatusFilter>
            <AttributeSort></AttributeSort>
        </div>
    );
});
