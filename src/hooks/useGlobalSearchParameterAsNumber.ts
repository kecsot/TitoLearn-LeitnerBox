import {useGlobalSearchParams} from "expo-router";

type MapToNumber<T> = {
    [K in keyof T]: number;
};

// issue: https://github.com/expo/router/discussions/272
export const useGlobalSearchParamsAsNumber = <T extends Record<string, any>>(): MapToNumber<T> => {
    const searchParams = useGlobalSearchParams<T>();
    const paramsAsNumber: MapToNumber<T> = {} as MapToNumber<T>;

    for (const key in searchParams) {
        if (Object.prototype.hasOwnProperty.call(searchParams, key)) {
            paramsAsNumber[key] = Number(searchParams[key]);
        }
    }

    return paramsAsNumber;
};