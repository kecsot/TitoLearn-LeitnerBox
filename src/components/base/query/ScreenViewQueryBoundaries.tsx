import {QueryErrorResetBoundary} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";
import {ReactNode, Suspense} from "react";
import ErrorFallbackComponent from "./ErrorFallbackComponent";
import QueryLoadingView from "./QueryLoadingView";
import ScreenView from "../ScreenView";

type Props = {
    children: ReactNode
    loading?: ReactNode;
}

export const ScreenViewQueryBoundaries = ({children, loading}: Props) => (
    <QueryErrorResetBoundary>
        {({reset}) => (
            <ErrorBoundary
                onReset={reset}
                FallbackComponent={(props, context) => {
                    return (
                        <ScreenView>
                            <ErrorFallbackComponent {...props}/>
                        </ScreenView>
                    )
                }}>
                <Suspense fallback={loading ?? <ScreenView><QueryLoadingView/></ScreenView>}>
                    {children}
                </Suspense>
            </ErrorBoundary>
        )}
    </QueryErrorResetBoundary>
);

