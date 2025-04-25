import {useLocalSearchParams} from "expo-router";

type MapToNumber<T> = {
    [K in keyof T]: number;
};

// issue: https://github.com/expo/router/discussions/272
export const useLocalSearchParamsAsNumber = <T extends Record<string, any>>(): MapToNumber<T> => {
    const searchParams = useLocalSearchParams<T>();
    const paramsAsNumber: MapToNumber<T> = {} as MapToNumber<T>;

    for (const key in searchParams) {
        if (Object.prototype.hasOwnProperty.call(searchParams, key)) {
            paramsAsNumber[key] = Number(searchParams[key]);
        }
    }

    return paramsAsNumber;
};