import {Vibration, View} from "react-native";
import React, {useEffect} from "react";
import {Button} from "react-native-paper";
import AnimatedContentCard from "../base/AnimatedContentCard";
import {globalStyleConfig} from "../base/globalStyleConfig";

type Props = {
    onFinishPress: VoidFunction
}

const motivationalMessages: string[] = [
    "Today, you took another step closer to your goals! Keep it up!",
    "Every step counts – today, you moved closer to success!",
    "Your dedication is inspiring! Next time, another opportunity for growth awaits you!",
    "The work you did today lays the foundation for your next success – don't stop now!",
    "Progress is not a sprint but a journey – and you're already on your way!",
    "Every minute spent learning is an investment in your future. You're doing an amazing job!",
    "Success belongs to those who keep going – today, you proved you're one of them!",
    "Remember, every time you learn, you're taking a step toward your dreams!",
    "The work you did today will bear fruit next time – keep it up!",
    "Your dedication and perseverance are incredible – be proud of yourself!",
    "Today, you conquered your doubts again and moved closer to your goals!",
    "Every day you learn is another victory over yourself!",
    "You are living proof that small steps bring big changes!",
    "Time invested in learning always pays off – you're already on the path to success!",
    "Today, you took another step closer to achieving what you truly want!"
];


export default function LearningFinishedView({onFinishPress}: Props) {

    const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

    useEffect(() => {
        Vibration.vibrate();
    }, []);

    return (
        <View style={{
            marginTop: globalStyleConfig.gap,
            gap: globalStyleConfig.gap
        }}>
            <AnimatedContentCard
                title={'You did it! One step closer!'}
                description={message}
                lottieResource={require("../../../assets/lottie/finish.json")}
                lottieContainerStyle={{
                    height: 250,
                    width: 250,
                    backgroundColor: "transparent",
                }}
            />
            <Button
                onPress={onFinishPress}
                mode={"outlined"}
                >Close</Button>
        </View>
    )

}