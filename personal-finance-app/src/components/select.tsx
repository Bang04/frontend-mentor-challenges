import { useEffect, useState } from "react";

export type select = {
    key: string,
    value: string,
    onSelectChanged: (item: {})=>void
}

export const Select = ({ items, name, onSelectChanged }: any) => {

    return (
        <div>
            <select name={name} onChange={(e)=> onSelectChanged({name: name, value: e.target.value}) } 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">	
                { 	
                    items.map((color:select, index:number) =>
                        <option key={index} value={color.value}>{color.key}</option>
                )}
			</select>
        </div>

    )
};