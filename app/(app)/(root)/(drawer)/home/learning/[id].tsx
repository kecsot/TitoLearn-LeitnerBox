import {Stack, useRouter} from "expo-router";
import React, {useState} from "react";
import ScreenView from "../../../../../../src/components/base/ScreenView";
import LearningViewContainer from "../../../../../../src/containers/learning/LearningViewContainer";
import {ScreenViewQueryBoundaries} from "../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import LearningFinishedContainer from "../../../../../../src/containers/learning/LearningFinishedContainer";
import LearningStartingLoadingView from "../../../../../../src/components/learning/LearningStartingLoadingView";
import {useLocalSearchParamsAsNumber} from "../../../../../../src/hooks/useLocalSearchParameterAsNumber";
import Toast from "react-native-toast-message";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IconButton, Text} from "react-native-paper";
import {Drawer} from "expo-router/drawer";
import DeckCancelLearningTextContainer
    from "../../../../../../src/containers/deck/learn/DeckCancelLearningTextContainer";


type SearchParamsType = {
    id: number
}

export default function Page() {
    const {id} = useLocalSearchParamsAsNumber<SearchParamsType>();
    const router = useRouter();
    const [isFinished, setFinished] = useState(false)

    const ASK_REVIEW_AFTER_X_FINISH = 3;

    const handleOnLearningFinished = () => {
        setFinished(true)
        checkRequestReview()
    }

    const checkRequestReview = () => {
        const KEY = 'isRequestReviewRan-AfterLearning'
        void AsyncStorage.getItem(KEY, (error, result) => {
            if (!result) {
                void AsyncStorage.setItem(KEY, '1')
            } else if (result.length < ASK_REVIEW_AFTER_X_FINISH - 1) {
                void AsyncStorage.setItem(KEY, result + '1')
            } else if (result.length === ASK_REVIEW_AFTER_X_FINISH - 1) {
                StoreReview.hasAction().then((hasAction) => {
                    if (hasAction) {
                        void StoreReview.requestReview()
                        void AsyncStorage.setItem(KEY, '1'.repeat(ASK_REVIEW_AFTER_X_FINISH))
                    }
                })
            }
        })
    }

    const handleOnClose = () => router.back()
    const handleOnFinishDetailApproved = () => router.back()

    return (
        <ScreenView withSafeArea>
            <Drawer.Screen
                options={{
                    title: `Learning`,
                    headerRight: () => (
                        <DeckCancelLearningTextContainer
                            learningId={id}
                            onCancelFinished={handleOnClose}/>
                    ),
                }}
            />
            <ScreenViewQueryBoundaries loading={<LearningStartingLoadingView/>}>
                {!isFinished && (
                    <LearningViewContainer
                        learningId={id}
                        onFinished={handleOnLearningFinished}/>
                )}

                {isFinished && (
                    <LearningFinishedContainer
                        learningId={id}
                        onFinished={handleOnFinishDetailApproved}/>
                )}
                <Toast/>{/*FIXME*/}
            </ScreenViewQueryBoundaries>
        </ScreenView>
    )

}