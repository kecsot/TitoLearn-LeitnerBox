import React, {useState} from "react";
import WebView from "react-native-webview";
import {HtmlContentType} from "../../types";
import {useTheme} from "@react-navigation/native";

type Props = {
    item: HtmlContentType
}

export default function HtmlContentScreenView({item}: Props) {
    const theme = useTheme();

    // @hotfix: on dark mode WebView is white for a while until content is not loaded
    const [isDelaying, setDelaying] = useState<boolean>(true)

    return (
        <WebView
            pullToRefreshEnabled={false}
            forceDarkOn
            onLoadStart={() => {
                setDelaying(true)
                setTimeout(() => {
                    setDelaying(false)
                }, 300)
            }}
            style={{
                opacity: theme.dark ? (isDelaying ? 0 : 1) : 1,
                backgroundColor: 'transparent'
            }}
            source={{html: item.html}}
        />
    );
}