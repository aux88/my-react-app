import styles from "./Select.module.css";

interface SelectProps {
    items : SelectItem[];
    onChange:(value:string) => void;
    value: string;
}

export interface SelectItem {
    label: string;
    value: number;
}

export const Select = ({items, onChange, value}:SelectProps) => {

    return (
        <select className={styles.select} onChange={(e) => onChange(e.target.value)} value={value}>
            {items.map((item)=>(
                <option key={item.value} value={item.value}>{item.label}</option>
            ))}
        </select>
    );
};