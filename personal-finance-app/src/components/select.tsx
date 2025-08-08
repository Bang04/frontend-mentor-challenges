import { useState } from "react";
import { Dropdown } from "./dropdown";

export type select = {
    key: string,
    value: string,
    disabled?: boolean,
    defaultValue: string
    onSelectChanged: (item: string)=>void
}

export const Select = ({ items, name, defaultValue, onSelectChanged }: any) => {
    const [selected, setSelected] = useState(defaultValue);

    const handleSelected = (value: string) => {
        setSelected(value);
        onSelectChanged(value);
    };

    return (
        <div className="my-1">
            <Dropdown props="w-full py-2 px-3" onDropdownChanged={handleSelected} selected={selected}  options={items}></Dropdown>
        </div>

    )
};