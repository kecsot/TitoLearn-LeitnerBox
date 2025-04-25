import React from "react";
import {CardType} from "../../types";
import LearningCardSideView from "./LearningCardSideView";
import {FlipView} from "../base/FlipView";

type Props = {
    card: CardType
}

export default function LearningCardView({card}: Props) {

    return (
        <FlipView
            frontContent={
                <LearningCardSideView
                    title={'Front'}
                    side={card.card_side_front}/>
            }
            backContent={<LearningCardSideView
                title={'Back'}
                side={card.card_side_back}/>}
        />
    );
}
