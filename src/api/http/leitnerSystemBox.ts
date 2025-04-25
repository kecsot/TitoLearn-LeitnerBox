import axios from "../axios";
import {LeitnerSystemBoxType, LeitnerSystemBoxEditableType} from "../../types";

export const postLeitnerSystemBox = async (leitnerSystemId: number, index: number) =>
    axios.post(`leitner-systems/${leitnerSystemId}/boxes`, {index: index})
        .then(response => response.data.data as LeitnerSystemBoxType)

export const patchLeitnerSystemBox = async (leitnerSystemId: number, boxId: number, data: LeitnerSystemBoxEditableType) =>
    axios.patch(`leitner-systems/${leitnerSystemId}/boxes/${boxId}`, data)
        .then(response => response.data.data as LeitnerSystemBoxType)

export const deleteLeitnerSystemBox = async (leitnerSystemId: number, boxId: number) =>
    axios.delete(`leitner-systems/${leitnerSystemId}/boxes/${boxId}`)
        .then(x => true)