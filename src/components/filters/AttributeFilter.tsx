import { Select } from "../select/Select";

interface AttributeFilterProps {
    attribute: string[];
    defaultValue?: string;
}

export const AttributeFilter = ({attribute,defaultValue}:AttributeFilterProps) => {
    
    return (       
        <Select items={attribute} defaultValue={defaultValue} />
    );
}