import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import Toast from "react-native-toast-message";
import {getAxiosErrorMessage, isAxiosError, shouldLogAxiosError} from "../axiosErrorUtil";
import * as Sentry from "@sentry/react-native";

type Props = {
    children: ReactNode
}

export const CustomQueryClientProvider = ({children}: Props) => {

    const catchError = (error: Error) => {
        let errorMessage = {
            title: 'Oops! Something wrong happened',
            description: 'Please try again!'
        }

        if (isAxiosError(error)) {
            errorMessage = getAxiosErrorMessage(error);

            if(shouldLogAxiosError(error)) {
                Sentry.captureException(error)
            }
        }else{
            Sentry.captureException(error)
        }

        Toast.show({
            type: 'error',
            text1: errorMessage.title,
            text2: errorMessage.description,
        });
    }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                refetchInterval: 10 * 60 * 1000,
                gcTime: 10 * 60 * 1000,
                refetchOnWindowFocus: true,
                refetchOnReconnect: true,
                retry: 1,
                throwOnError: true
            },
            mutations: {
                throwOnError: false
            }
        },

        queryCache: new QueryCache({
            onError: (error, query) => catchError(error)
        }),
        mutationCache: new MutationCache({
            onError: (error) => catchError(error)
        })
    })

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}