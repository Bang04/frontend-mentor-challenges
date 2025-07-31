import { PropsWithChildren } from "react";
import dots from "/images/dots-three-thin.svg";
import { Link } from "react-router";

type card = {
    title?: string;
    subTitle?: string;
    link?: string | SVGAElement | number;
    backColor?: string;
} & PropsWithChildren;


export const Card = (prop: card) => {

    return (
        <div className="p-8 shadow-xl w-[100%] rounded-xl" style={
            {backgroundColor: prop.backColor ?? "#FFFFFF"}
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
                            <img src={dots} width={20} height={20}></img>
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