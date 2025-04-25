import React from "react";
import {Button, Icon} from "react-native-paper";
import {
    useAddLeitnerSystemBoxMutation
} from "../../api/queries/leitnerSystem";

type Props = {
    leitnerSystemId: number
    index: number
    enabled: boolean
}

export default function LeitnerSystemBuilderAddButtonContainer({leitnerSystemId, index, enabled}: Props) {

    const {
        mutateAsync,
        isPending: isPending
    } = useAddLeitnerSystemBoxMutation()

    const handleOnPress = () =>
        mutateAsync({
            leitnerSystemId: leitnerSystemId,
            index: index
        })
            .then(() => {})

    return (
        <Button
            style={{
                alignSelf: 'center',
            }}
            mode='text'
            icon={props => <Icon source="plus" size={16}/>}
            onPress={handleOnPress}
            loading={isPending}
            disabled={!enabled || isPending}
        >Add item</Button>
    );
}