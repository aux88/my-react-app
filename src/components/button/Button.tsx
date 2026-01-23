import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps{
    children: ReactNode;
    onClick(): void;
    isActive?: boolean;
    type: "filter" | "add";
};

export const Button=({children,onClick,isActive=false,type}:ButtonProps)=>{
    return(
    <button className={`${styles.button} ${isActive? styles.active:""} ${type==="filter"? styles.filter: styles.add}`} onClick={onClick}>{children}</button>
    );
};