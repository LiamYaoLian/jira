import {useEffect, useState} from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value
export const cleanObject = (object: object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key]
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    },[])
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        // setTimeout after value changes
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // clearTimeout when useEffect finishes
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}