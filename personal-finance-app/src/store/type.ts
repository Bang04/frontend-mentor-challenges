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


export const commonType = {
    entries: entries,
    setDate: setDate
}




