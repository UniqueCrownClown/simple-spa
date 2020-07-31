import axios from "axios";
const axiosWrap = promise => promise.then(res => res.data).catch(err => err);
export const searchMusic = (offset: string, limit: string, keywords: string) =>
    axiosWrap(axios.get(`https://api.mtnhao.com/search?offset=${offset}&limit=${limit}&keywords=${keywords}`))