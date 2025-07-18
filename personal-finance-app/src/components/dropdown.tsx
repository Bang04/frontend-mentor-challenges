export const Dropdown = ({ title  }:any) => {

    return (
        <div className="relative inline-block text-left mx-3">
            <button className="inline-flex w-20 justify-center gap-x-1.5 rounded-md bg-white w-20 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 ">
                { title }
                <div>↓</div>
            </button>
            <div className="absolute right-0 z-10 mt-2 w-20 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                <div className="p-2">
                    test1
                </div>
                <div className="p-2">
                    test2
                </div>
                <div className="p-2">
                    test3
                </div>
                <div className="p-2">
                    test4
                </div>
                <div className="p-2">
                    test5
                </div>
            </div>
        </div>
    )
};