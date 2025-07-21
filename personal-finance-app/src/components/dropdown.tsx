import { useState } from "react";

export type dropdown = {
    onDropdownChanged: (value: string)=>void,
    options:{key: string, value: string}[]
}

export const Dropdown = ({ onDropdownChanged, options  }:dropdown) => {
    const [state, setState] = useState<boolean>(false);
    const [selected, setSelected] = useState(options[0].value);

    return (
        <div className="relative inline-block text-left mx-3">
            <button onClick={()=>setState(!state)} className="inline-flex py-2 px-3 border items-center justify-center gap-x-1.5 rounded-md bg-white text-sm shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer">
                { selected } <div>▼</div>
            </button>
            <div className={ (state ? "block" : "hidden") + " absolute right-0 z-10 mt-2 py-2 px-3 origin-top-right divide-y divide-gray-100 rounded-md bg-white text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden"}>
                {
                    options?.map((option:any,index:number)=> (
                        <div className="p-2 cursor-pointer" onClick={()=>{
                            setSelected(option.value);
                            setState(false); //close dropdown
                            onDropdownChanged(option.key);
                        }}>
                            { option.value }
                        </div>
                    ))
                }
            </div>
        </div>
    )
};