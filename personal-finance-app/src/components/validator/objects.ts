type Keys<T> = (keyof T)[];
export const hasAllValue = <T extends object>(obj: T, keys: Keys<T>) => {
    return keys.every(k => obj[k] != null);
}

export const isObject = (value: unknown) => {
    return typeof value === "object" && value != null && !Array.isArray(value);
}