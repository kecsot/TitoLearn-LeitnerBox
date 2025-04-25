import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage<T>(key: string, initialValue: T) {
    const [isInitialized, setInitialized] = useState(false);
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        AsyncStorage.getItem(key)
            .then((value) => {
                if (value === null) return initialValue;
                return JSON.parse(value) as T;
            })
            .then(setStoredValue)
            .then(() => setInitialized(true))
            .catch(() => setInitialized(true));

    }, [key, initialValue]);

    const setValue = (value: T) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        return AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    }

    return {
        value: storedValue,
        setValue,
        isInitialized
    };
}