import { Button } from "./Button";

type page = {
    current: number, 
    total: number[],
    setPage: (page: number)=>void
}

/* FIXME 좀 더 효율적인 방법 고민해보기!! */


export const Paging = ({ current, total, setPage}: page) => {

    return (
        <div className="grid grid-cols-6">
            <div className="col-span-1">
                <div className="hidden sm:block">
                    <Button type='page' name='Prev' px={5} py={1}  disabled={current==1}   handler={() =>setPage(current-1)} ></Button>
                </div>
                <div className="sm:hidden">
                    <Button type='page' name='❰' px={3} py={1}  disabled={current==1}   handler={() =>setPage(current-1)} ></Button>
                   </div>
            </div>
            <div className="col-span-4 place-content-center m-auto">
                <div className="hidden sm:block">
                    {
                        total.map((value:any)=> (        
                            <span className="px-1">
                                <Button type='page' px={5} py={1} key={value} name={value} handler={()=>setPage(value)} ></Button>
                            </span>
                        ))
                    }
                </div>
                <div className="sm:hidden">
                    {
                        [1,2,'..',5]   .map((value:any)=> (        
                            <span className="px-1" onClick={()=>console.log("test")}>
                                <Button type='page' px={3} py={1} key={value} name={value} handler={()=>setPage(value)} ></Button>
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className="col-span-1 ml-auto">
                <div className="hidden sm:block">
                    <Button type='page' name='Next' px={5} py={1}  disabled={current==total.length-1}   handler={() =>setPage(current+1)} ></Button>
                </div>
                <div className="sm:hidden z-100" onClick={()=>console.log("test")}>
                    <Button type='page' name='❱' px={3} py={1} disabled={current==total.length-1}   handler={() =>setPage(current+1)} ></Button>
                </div>
            </div>
        </div>
    )
};