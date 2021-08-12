import {useState} from "react";

export const useLocalStorage = (
    key: string,
    obj: any,
): [any, (value: any) => void] => {
    const [local, setLocal] = useState(() => {
        const ls = localStorage.getItem(key)
        if (!ls) return obj
        try {
            return JSON.parse(ls)
        } catch {
            return obj
        }
    })
    return [
        local,
        (newValue) => {
            localStorage.setItem(key, JSON.stringify(newValue))
            setLocal(newValue)
        },
    ]
}