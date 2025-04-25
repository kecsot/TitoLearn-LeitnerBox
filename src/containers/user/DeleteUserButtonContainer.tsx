import React from "react";
import {useDeleteUserMutation} from "../../api/queries/user";
import {Button} from "react-native-paper";
import * as Sentry from "@sentry/react-native";

type Props = {
    enabled: boolean
    onSuccess: VoidFunction
    onError: VoidFunction
}

export default function DeleteUserButtonContainer({enabled,onSuccess, onError}: Props) {

    const {mutateAsync: deleteMutation, isPending} = useDeleteUserMutation()

    const handleOnDeletePressed = () =>
        deleteMutation()
            .then((result) => {
                if(result) onSuccess()
                else onError()
            })
            .catch((error) => {
                Sentry.captureException(error);
                onError()
            })

    return (
        <Button
            mode="outlined"
            disabled={!enabled || isPending}
            loading={isPending}
            onPress={handleOnDeletePressed}>DELETE ACCOUNT</Button>
    );
}