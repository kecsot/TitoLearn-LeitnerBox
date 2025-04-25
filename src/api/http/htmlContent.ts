import axios from "../axios";
import {HtmlContentFilters, HtmlContentType} from "../../types";

export const getHtmlContent = (directory: string, view: string, filters: HtmlContentFilters) =>
    axios.get(`html-content/${directory}/${view}?prefer_dark=${filters.prefer_dark}`)
        .then(response => response.data.data as HtmlContentType)
