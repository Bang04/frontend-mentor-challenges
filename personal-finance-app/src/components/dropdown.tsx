import { useState } from "react";

export type dropdown = {
    onDropdownChanged: (value: string)=>void,
    options:any[],
    props?: any,
    selected?: string,
    showOnlyOptions?: boolean 
}

export const Dropdown = ({ onDropdownChanged, options, props, selected, showOnlyOptions  }:dropdown) => {
    const [state, setState] = useState<boolean>(false);
    const [_selected, setSelected] = useState(selected ?? options[0].value);

    const _options = () => (
        options?.map((option:any,index:number)=> (
            <div className={`py-2 ${ option.disabled ? "":"cursor-pointer"} flex justify-between`} onClick={()=>{
                if(option.disabled)
                    return;

                setSelected(option.value);
                setState(false); //close dropdown
                onDropdownChanged(option.key);
            }}
            style={{
                color: option.disabled ? "gray" : "black"                                                           
            }}
            >
                { option.value } <span className={option.disabled ? "block": "hidden"}>Already Used</span>
            </div>
        ))
    );

    return (
        <div className="relative inline-block text-left w-full">
            {
                showOnlyOptions ?
                    <div className={`p-3 overflow-y-auto right-0 z-10 mt-2 ${props} origin-top-right divide-y divide-gray-100 rounded-md bg-white text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden`}>
                        {
                            _options()
                        }
                    </div>
                    :
                    <>
                    <button onClick={()=>setState(!state)} className={`inline-flex justify-between ${props} border items-center gap-x-1.5 rounded-md bg-white text-sm shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer`}>
                        <div>{ _selected }</div>
                        <div>▼</div>
                    </button>
                    <div className={ (state ? "block" : "hidden") + ` overflow-y-auto max-h-48 absolute right-0 z-10 mt-2 ${props} origin-top-right divide-y divide-gray-100 rounded-md bg-white text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden`}>
                        {
                            _options()
                        }
                    </div>
                    </>
            }
        </div>
    )
};