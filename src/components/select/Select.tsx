import styles from "./Select.module.css";

interface SelectProps {
    items : string[];
    defaultValue?: string;
}

export const Select = ({items, defaultValue}:SelectProps) => {

    return (
            <select className={styles.select} defaultValue={defaultValue} onChange={()=>{console.log("選択")}}>
                {items.map((item)=>(
                    <option key={item}>{item}</option>
                ))}
            </select>
    );
};