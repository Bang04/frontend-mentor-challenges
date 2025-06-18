import { PropsWithChildren } from "react";

type card = {
    title?: string;
    subTitle?: string;
    link?: string;
} & PropsWithChildren;


export const Card = (prop: card) => {

    return (
        <div className="p-8 shadow-xl w-[100%] bg-white rounded-xl">
            <div className="flex justify-between">
                <div className="font-bold text-xl">{prop.title}</div>
                <div className="text-[#B3B3B3] text-sm">
                    {prop.link} <span className={"text-2xl ml-3 "+ (prop.link==""?"hidden":"")}>▸</span>
                </div>
            </div>
            <div className="">
                { prop.children } 
            </div>
        </div>
    )


}