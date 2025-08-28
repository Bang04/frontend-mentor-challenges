import { isObject } from "../components/validator/objects";

export type StringKeyObject = {
    [index: string]: {}[]
}


const entries = <T extends object>(obj: T) => {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}

const DepthtoArrays = <T extends object>(obj: T) => {
    if(Object.values(obj).every(k=> !isObject(k)))
        return obj;

    return Object.entries(obj).map(([key,value])=>  ({ id: key, ...value }));
}

const setDate = <T extends Date>(date: T) => {
    const year = date.toLocaleDateString("en", { year: "numeric"});
    const month = date.toLocaleDateString("en", {month: "short"});
    const day = date.toLocaleDateString("en", {day: "numeric"});

    return [day, month, year].join(" ");
}

const groupBy = <T>(array: T[], keyOf: (key: T)=>string): Record<string, T[]> => {
    return array?.reduce((acc, item)=> {
        const _key = keyOf(item);
        (acc[_key] ||= []).push(item);
        return acc;
    }, {} as Record<string, T[]>);
}

const filterByKey = (base: any, target: { [x: string]: any; }, key: any) => {
    return Object.keys(target).filter((key:string)=> key in base). reduce((acc:any,key)=> {
        acc[key] = base[key];
        return acc;
    }, {});
}

const filterTargetByBasedKey = (base: any, target: any, key: string) => {
    return Object.keys(target).filter((key: string)=> key in base).reduce((acc:any,key:string)=> {
        acc.push(
            {
                info: base[key],
                values: target[key]
            }
        );
        return acc;
    }, []);
}

const formatOrdinal =  (date : any) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    let j = day % 10;
    let k = day % 100;

    if (j === 1 && k !== 11) return day + "st";
    else if (j === 2 && k !== 12)return day + "nd";
    else if (j === 3 && k !== 13)return day + "rd";
    return day+'th';
}

export const commonType = {
    entries: entries,
    setDate: setDate,
    groupBy: groupBy,
    filterByKey: filterByKey,
    formatOrdinal :formatOrdinal,
    filterTargetByBasedKey: filterTargetByBasedKey,
    DepthtoArrays: DepthtoArrays
}




