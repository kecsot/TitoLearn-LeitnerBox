import React from "react";
import AnimatedContentCard, {AnimatedContentCardProps} from "../AnimatedContentCard";
import {AnimationObject} from "lottie-react-native/src/types";

type Props = Omit<AnimatedContentCardProps,'lottieResource'> & {
    lottieResource?: string | AnimationObject | { uri: string }
}

export default function ListEmptyAnimatedCardContent({title, lottieResource, ...rest}: Props) {

    return (
        <AnimatedContentCard
            title={title || 'The list is empty!'}
            lottieResource={lottieResource || require("../../../../assets/lottie/empty.json")}
            {...rest}/>
    );
}
