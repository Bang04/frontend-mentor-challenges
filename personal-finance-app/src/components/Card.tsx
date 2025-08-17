import { PropsWithChildren } from "react";
import { Link } from "react-router";

type card = {
    title?: string;
    subTitle?: string;
    link?: string | SVGAElement | number;
    backColor?: string;
    fontColor?: string;
    size?: number;
    padding?: number;
    border?: string;
} & PropsWithChildren;


export const Card = (prop: card) => {

    return (
        <div className="shadow-xl w-[100%] rounded-xl" style={
            {
                backgroundColor: prop.backColor ?? "#FFFFFF", 
                color: prop.fontColor ?? "#000000",
                padding: prop.size ?? 25,
                border: prop.border ?? "none"
            }
        }>
            <div className="flex justify-between">
                <div className="font-bold text-xl">{prop.title}</div>
                {/* FIXME 
                klsdjfa*/}
                <Link to={"/"+prop.title?.toLowerCase()}>
                    <div className="cursor-pointer">
                        {
                        typeof prop.link == "string" ? 
                            <span className="text-xs text-gray-500"> {prop.link} </span>
                                : 
                            <></>
                        }
                    </div>
                </Link>
            </div>
            <div className="">
                { prop.children } 
            </div>
        </div>
    )


}