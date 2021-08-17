import {useState} from "react";
import {ILaunchesData, IRocketsData} from './interfaces'

export const useLocalStorage = (
    key: string,
    obj: Array<ILaunchesData | IRocketsData>,
): [Array<ILaunchesData | IRocketsData>, (newValue: Array<ILaunchesData | IRocketsData>) => void] => {
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
