import axios from "../axios";

export const deleteUser = async () =>
    axios.delete(`user/me`)
        .then(response => response.data as boolean)