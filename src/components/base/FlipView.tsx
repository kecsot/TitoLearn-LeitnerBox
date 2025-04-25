import {StyleSheet} from "react-native";
import React, {ReactNode, useEffect, useState} from "react";
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming,} from "react-native-reanimated";
import GestureRecognizer from "react-native-swipe-gestures";

export type Props = {
    frontContent: ReactNode
    backContent: ReactNode
}

// FIXME: Flip előtt ne rendereljük ki, ha nem focused!
export const FlipView = ({frontContent, backContent}: Props) => {
    const [isSwapped, setIsSwapped] = useState(false);
    const spin = useSharedValue<number>(0);

    const rStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
        return {transform: [{rotateY: withTiming(`${spinVal}deg`, {duration: 350})}]};
    }, []);

    const bStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
        return {transform: [{rotateY: withTiming(`${spinVal}deg`, {duration: 350})}]};
    }, []);

    const handleSwipe = () => {
        setIsSwapped(true);
        spin.value = spin.value ? 0 : 1
    }

    return (
        <GestureRecognizer
            style={{flex: 1}}
            onSwipeLeft={() => handleSwipe()}
            onSwipeRight={() => handleSwipe()}
        >
            <Animated.View style={[Styles.front, rStyle]}>
                {frontContent}
            </Animated.View>
            <Animated.View style={[Styles.back, bStyle]}>
                {isSwapped && backContent}
            </Animated.View>
        </GestureRecognizer>
    );
};

const Styles = StyleSheet.create({
    front: {
        position: "absolute",
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    back: {
        flex: 1,
        backfaceVisibility: "hidden",
        zIndex: 10
    },
});