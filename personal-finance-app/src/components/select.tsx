import { useState } from "react";

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
        <div>
            <select name={name} value={selected} onChange={(e)=> handleSelected(e.target.value) } 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">	
                { 	
                    items.map((item:select, index:number) =>
                        <option key={index} disabled={item.disabled} value={item.value}>{item.key}</option>
                )}
			</select>
        </div>

    )
};