export const Bar = (
    prop:{total: number, spent:number, color:string}) => {

    const percent = (prop.spent/prop.total)*100;

    return (
        <div>
            <div className="bg-[#F8F4F0] relative w-[100%] h-8 rounded-sm">
                <div className={"absolute h-6 top-1 left-1 right-1 bottom-1 rounded-sm"} style={{backgroundColor: prop.color, width: (percent > 100 ? 99 : percent)+"%"}}>
                    
                </div>
            </div>
        </div>
    )
};