import axios, {AxiosError} from "axios";
import { router } from 'expo-router';
import Purchases from "react-native-purchases";

export type CustomAxiosErrorMessageType = {
    title: string,
    description: string
}

type AxiosValidationErrorType = {
    message: string
}

export const getAxiosErrorMessage = (error: Error): CustomAxiosErrorMessageType => {

    if (isHttpCodeEqual(error, 401)) {
        return {
            title: 'Authorization issue!',
            description: `You are unauthorized! Please log in!`
        }
    }

    if (isHttpCodeEqual(error, 402)) {
        router.push('/(app)/(root)/(drawer)/subscription')

        void Purchases.invalidateCustomerInfoCache()

        return {
            title: 'Subscription required!',
            description: `This function available for subscribed members!`
        }
    }

    if (isHttpCodeEqual(error, 403)) {
        return {
            title: 'Access issue!',
            description: `You don't have access to view this data!`
        }
    }

    if (isHttpCodeEqual(error, 404)) {
        return {
            title: 'Content not found!',
            description: `The requested content is not found!`
        }
    }

    if (isHttpCodeEqual(error, 409)) {
        return {
            title: 'Oops!',
            description: 'This request is not allowed at the moment on this item!',
        }
    }

    if (isHttpCodeEqual(error, 413)) {
        return {
            title: 'Content too large!',
            description: `The sent content is too large!`
        }
    }

    if (isHttpCodeEqual(error, 422)) {
        const axiosError = error as AxiosError
        const responseData = axiosError?.response?.data as AxiosValidationErrorType | null

        return {
            title: 'Validation error!',
            description: responseData?.message || 'Some input is invalid'
        }
    }

    if (isHttpCodeEqual(error, 429)) {
        return {
            title: 'Too much request!',
            description: `Please wait, and try again few seconds later.`
        }
    }

    if (isNetworkError(error)) {
        return {
            title: 'Unable to reach the server!',
            description: `Please check you internet connection!`
        }
    }

    if (isHttpCodeBetween(error, 500, 599)) {
        return {
            title: 'Server error',
            description: '`There is an issue on our server!`'
        }
    }

    return {
        title: 'Error',
        description: 'Oops! Something wrong happened!'
    }
}

export const isAxiosError = (error: any) => axios.isAxiosError(error);

export const shouldLogAxiosError = (error: any) => {
    if(!isAxiosError(error)) return false

    const errorCode = getAxiosHttpCode(error)
    const notInterestedErrors = [402, 422]
    const isClientError = !notInterestedErrors.includes(errorCode ?? -1)
    const isServerError = isHttpCodeBetween(error, 500, 599)

    return isClientError || isServerError
}

const getAxiosHttpCode = (error: any) => {
    const axiosError = error as AxiosError;
    return axiosError?.response?.status;
}

const isHttpCodeEqual = (error: any, code: number) => {
    const axiosError = error as AxiosError;
    const statusCode = axiosError?.response?.status;
    return !!statusCode && statusCode == code
}

export const isHttpCodeBetween = (error: any, fromCode: number, toCode: number) => {
    const axiosError = error as AxiosError;
    const statusCode = axiosError?.response?.status;

    return !!statusCode && statusCode >= fromCode && statusCode <= toCode
}

const isNetworkError = (error: any) => {
    const axiosError = error as AxiosError;
    return axiosError?.message === 'Network Error';
}