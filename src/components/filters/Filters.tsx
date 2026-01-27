import styles from "./Filter.module.css";
import { StatusFilter } from "./StatusFilter";
import { AttributeSort } from "./AttributeSort";

export const Filters = () => {
    return (
        <div className={styles.filters}>
            <StatusFilter></StatusFilter>
            <AttributeSort></AttributeSort>
        </div>
    );
}
