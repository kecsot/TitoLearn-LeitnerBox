import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteUser} from "../http/user";

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => deleteUser(),
        onSuccess: (result) => {
            if (result) {
                queryClient.removeQueries()
            }
            return result
        }
    })
}