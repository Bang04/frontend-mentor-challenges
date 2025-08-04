export type StringKeyObject = {
    [index: string]: {}[]
}


const entries = <T extends object>(obj: T) => {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}

const setDate = <T extends Date>(date: T) => {
    const year = date.toLocaleDateString("en", { year: "numeric"});
    const month = date.toLocaleDateString("en", {month: "short"});
    const day = date.toLocaleDateString("en", {day: "numeric"});

    return [day, month, year].join(" ");
}

const groupBy = <T>(array: T[], keyOf: (key: T)=>string): Record<string, T[]> => {
    return array.reduce((acc, item)=> {
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

const filterTargetByBasedKey = <T>(base: any, target: any, key: string) => {
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


export const commonType = {
    entries: entries,
    setDate: setDate,
    groupBy: groupBy,
    filterByKey: filterByKey
}




