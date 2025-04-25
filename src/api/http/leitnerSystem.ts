import axios from "../axios";
import {LeitnerSystemType} from "../../types";


export const getLeitnerSystemById = (id: number) =>
    axios.get(`leitner-systems/${id}`)
        .then((response) => response.data.data as LeitnerSystemType)