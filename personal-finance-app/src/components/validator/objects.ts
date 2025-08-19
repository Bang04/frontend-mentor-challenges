type Keys<T> = (keyof T)[];
export const hasAllValue = <T extends object>(obj: T, keys: Keys<T>) => {
    //console.log(obj, keys);
    return keys.every(k => obj[k] != null);
}