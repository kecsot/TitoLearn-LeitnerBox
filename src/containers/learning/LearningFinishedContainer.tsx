import LearningFinishedView from "../../components/learning/LearningFinishedView";

type Props = {
    learningId: number,
    onFinished: VoidFunction
}

export default function LearningFinishedContainer({learningId, onFinished}: Props) {

    // v2: get learning result by learningId to show some statistics

    return (
        <LearningFinishedView
            onFinishPress={() => onFinished()}/>
    )

}