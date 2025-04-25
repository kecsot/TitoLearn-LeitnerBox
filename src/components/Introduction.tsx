import React, {useState} from "react";
import {Button, Text} from "react-native-paper";
import {Dimensions, Image, SafeAreaView, View} from "react-native";
import Carousel from "react-native-reanimated-carousel/src/Carousel";
import {ImageSourcePropType} from "react-native/Libraries/Image/Image";
import {StyleProps} from "react-native-reanimated";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ImageStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import LottieView from "lottie-react-native";
import {globalStyleConfig} from "./base/globalStyleConfig";
import { useTheme } from "@react-navigation/native";

type PageItemType = {
    title: string,
    description: string,
    imageSource?: ImageSourcePropType
}

const items = [
    {
        title: "Create your own decks",
        description: "Organize your cards however you like! It can be any topic you like.",
        imageSource: require('../../assets/introduction/1.png'),
    } as PageItemType,
    {
        title: "Add cards to your decks!",
        description: "Make double-sided cards with longer text and add images if you'd like!",
        imageSource: require('../../assets/introduction/2.png'),
    } as PageItemType,
    {
        title: "Build Leitner System",
        description: "Customize your deck with its own Leitner system! Create boxes and set your own timings. It’s fully personalizable anytime!",
        imageSource: require('../../assets/introduction/3.png'),
    } as PageItemType,
    {
        title: "Feel free to start earlier",
        description: "You can skip ahead by 12 hours if needed, so you're not stuck to a fixed time!",
        imageSource: require('../../assets/introduction/4.png'),
    } as PageItemType,
    {
        title: "Start learning",
        description: "If you get it right, the card moves to the next box. On repeat, it stays in that box. If you don’t know it, we'll send it back to an earlier box for an earlier review! Your first answer is key. You’ll keep learning until you've mastered all the cards!",
        imageSource: require('../../assets/introduction/5.png'),
    } as PageItemType,
    {
        title: "Keep track of your learning!",
        description: "Your progress for the deck is saved, and you can review your answers in the same order!",
        imageSource: require('../../assets/introduction/6.png'),
    } as PageItemType,
    {
        title: "Detailed card history",
        description: "You can review the movement of cards between boxes, from their creation to each answer and even the changes in the boxes.",
        imageSource: require('../../assets/introduction/7.png'),
    } as PageItemType,
    {
        title: "Let's start",
    } as PageItemType,
]

type Props = {
    onHeaderButtonPress: () => void;
    headerButtonTitle: string;
    onActionButtonPress: () => void;
    actionButtonTitle: string;
}

export const Introduction = ({onActionButtonPress, actionButtonTitle, onHeaderButtonPress, headerButtonTitle}: Props) => {
    const theme = useTheme();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [carouselIndex, setCarouselProgress] = useState(0);

    return (
        <View
            style={{
                position: 'relative',
                backgroundColor: !theme.dark ? 'transparent' : 'black',
                flex: 1
            }}>

            <Carousel
                loop={false}
                width={width}
                height={height}
                overscrollEnabled={false}
                data={items}
                onSnapToItem={setCarouselProgress}
                renderItem={({item, index}) => {
                    const isLastItem = index == items.length - 1;

                    return (
                        <View
                            key={index}
                            style={styles.itemContainer}>

                            {isLastItem && (
                                <SafeAreaView>
                                    <LottieView
                                        source={require('../../assets/introduction/end-anim.json')}
                                        style={{
                                            width: '100%',
                                            aspectRatio: 1
                                        }}
                                        autoPlay
                                        loop
                                    />
                                </SafeAreaView>
                            )}

                            <SafeAreaView
                                style={styles.titleContainer}>

                                <Text
                                    style={styles.title}
                                    variant='headlineMedium'>
                                    {item.title}
                                </Text>
                                <Text style={styles.description(theme.dark)}>
                                    {item.description}
                                </Text>
                                {isLastItem && (
                                    <Button
                                        mode='contained'
                                        onPress={onActionButtonPress}>{actionButtonTitle}</Button>
                                )}
                            </SafeAreaView>

                            {item.imageSource && (
                                <Image
                                    style={styles.image}
                                    resizeMode="contain"
                                    source={item.imageSource}/>
                            )}
                        </View>
                    )
                }}
            />

            <SafeAreaView style={styles.headerContainer}>
                <View style={styles.headerTopLayer}>
                    <Button
                        style={{
                            opacity: 0
                        }}>{headerButtonTitle}</Button>
                    <View style={styles.dotsContainer}>
                        {[...Array(items.length)].map((value, index, array) => (
                            <View
                                key={'dot-' + index}
                                style={{
                                    ...styles.dot(carouselIndex == index),
                                }}/>
                        ))}

                    </View>
                    <Button onPress={onHeaderButtonPress}>{headerButtonTitle}</Button>
                </View>

                {carouselIndex == 0 && (
                    <>
                        <LottieView
                            source={require('../../assets/introduction/swipe-anim.json')}
                            style={{
                                width: 40,
                                height: 40,
                            }}
                            autoPlay
                            loop
                        />
                        <Text variant='labelSmall'>Swipe to continue</Text>
                    </>
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = {
    itemContainer: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    } as StyleProps,
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 8
    } as StyleProps,
    title: {
        color: globalStyleConfig.color.primary,
        fontWeight: 700,
        textAlign: 'center',
        maxWidth: '85%'
    } as StyleProps,
    description: (isDark: boolean) => ({
        color: isDark ? 'white' : 'black',
        textAlign: 'center',
        maxWidth: '70%'
    } as StyleProps),
    image: {
        height: 'auto',
        maxHeight: '100%',
        width: '85%',
        aspectRatio: 704 / 1050,
        padding: 0,
        margin: 0,
    } as StyleProp<ImageStyle>,
    headerContainer: {
        position: 'absolute',
        top: 16,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    } as StyleProps,
    headerTopLayer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    } as StyleProps,
    dotsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        margin: 'auto',
        gap: 8,
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
    } as StyleProps,
    dot: (active: boolean) => ({
        opacity: active ? 1 : .6,
        backgroundColor: globalStyleConfig.color.primary,
        height: 4,
        width: 4,
        borderRadius: 4,
    } as StyleProps),
    paginationIconButton: {
        backgroundColor: 'transparent',
        opacity: .5
    } as StyleProps
}