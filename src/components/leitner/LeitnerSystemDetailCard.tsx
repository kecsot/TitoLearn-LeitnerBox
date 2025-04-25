import React from "react";
import {Card, IconButton, List} from "react-native-paper";
import {LeitnerSystemType} from "../../types";
import {View} from "react-native";
import {IconWithBadge} from "../base/IconWithBadge";
import {convertMinutesToText} from "../../util/date";

type Props = {
    item: LeitnerSystemType
    onEdit: (id: number) => void
}

export const LeitnerSystemDetailCard = ({item, onEdit}: Props) => {

    return (
        <Card mode="outlined">
            <Card.Title
                title={"Leitner System"}
                right={(props) => (<IconButton icon="pencil" {...props} onPress={() => onEdit(item.id)}/>)}
            />
            <Card.Content>
                <View>
                    {item.boxes.map((item, index) => {
                        return (
                            <List.Item
                                key={item.id}
                                title={`Box ${index + 1}`}
                                description={convertMinutesToText(item.delay_in_minutes)}
                                left={props => (<IconWithBadge icon='archive' text={`${item.count_of_cards}`}/>)}
                            />
                        )
                    })}
                </View>
            </Card.Content>
        </Card>
    );
}