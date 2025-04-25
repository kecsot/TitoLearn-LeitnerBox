import React from "react";
import {LeitnerSystemBoxType} from "../../../types";
import {View} from "react-native";
import {Card, IconButton, MD3Colors, Text} from "react-native-paper";
import {IconWithBadge} from "../../base/IconWithBadge";
import {convertMinutesToText} from "../../../util/date";

type LeitnerSystemBoxBuilderListItemProps = {
    onEditPressed: VoidFunction
    onDeletePressed: VoidFunction
    deleteDisabled?: boolean
}

type Props = LeitnerSystemBoxBuilderListItemProps & {
    index: number
    item: LeitnerSystemBoxType
}

const ITEM_IS_NEW_IN_MINUTES = 5

export default function LeitnerSystemBuilderBoxListItem({index, item, onEditPressed, onDeletePressed,deleteDisabled}: Props) {

    const isNew = !item.system_generated && Date.now() - (new Date(item.created_at).getTime()) < (1000 * 60 * ITEM_IS_NEW_IN_MINUTES)

    return (
        <Card mode={isNew ? 'outlined' : 'contained'}>
            <Card.Title
                title={`Box ${index}`}
                subtitle={convertMinutesToText(item.delay_in_minutes)}
                subtitleStyle={{
                    fontSize: 12
                }}
                subtitleNumberOfLines={2}
                left={props => (
                    <View>
                        <IconWithBadge icon='archive' text={`${item.count_of_cards}`}/>
                        {isNew &&
                            <Text
                                style={{color: MD3Colors.tertiary50}}
                                variant={"labelSmall"}>New</Text>
                        }
                    </View>
                )}
                right={props => (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <IconButton onPress={() => onEditPressed()} icon={'pencil'}/>
                        <IconButton
                            onPress={() => onDeletePressed()}
                            icon={'delete'}
                            iconColor={MD3Colors.error50}
                            disabled={deleteDisabled}/>
                    </View>
                )}
            />
        </Card>
    );
}