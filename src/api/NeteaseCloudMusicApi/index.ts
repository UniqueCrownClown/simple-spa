import axios from 'axios'
import { URL, defaultLimit } from '../../config'

//获取轮播
export function getBanner() {
    const url = `${URL}/banner`
    return axios.get(url)
}

//获取推荐歌单
export function getPersonalized() {
    const url = `${URL}/personalized`
    return axios.get(url)
}

//获取用户歌单详情
export function getUserPlaylist(uid) {
    const url = `${URL}/user/playlist`
    return axios.get(url, {
        params: {
            uid
        }
    })
}

//获取排行榜（完整版）
export function getTopListDetail() {
    const url = `${URL}/toplist/detail`
    return axios.get(url)
}

//获取歌单 ( 网友精选碟 )
export function getTopPlaylist(page = 0, limit = defaultLimit, order = 'hot') {
    const url = `${URL}/top/playlist`
    return axios.get(url, {
        params: {
            offset: page * limit,
            order,
            limit
        }
    })
}

//获取歌单详情
export function getPlaylistDetail(id) {
    // const url = `${URL}/playlist/detail`
    // return axios.get(url, {
    //     params: {
    //         id
    //     }
    // })
    return new Promise((resolve, reject) => {
        axios
            .get(`${URL}/playlist/detail`, {
                params: { id }
            })
            .then(response => response.data.playlist)
            .then(playlist => {
                const { trackIds, tracks } = playlist
                // 过滤完整歌单 如排行榜
                if (tracks.length === trackIds.length) {
                    resolve(playlist.tracks)
                    return
                }
                // 限制歌单详情最大 100
                const ids = trackIds
                    .slice(0, 100)
                    .map(v => v.id)
                    .toString()
                getMusicDetail(ids).then((response) => {
                    resolve(response.data.songs)
                })
            })
    })
}

// 搜索
export function search(keywords, type = 1, page = 0, limit = defaultLimit) {
    const url = `${URL}/search`
    return axios.get(url, {
        params: {
            offset: page * limit,
            type,
            limit,
            keywords
        }
    })
}

//热搜
export function searchHot() {
    const url = `${URL}/search/hot`
    return axios.get(url)
}

//获取歌曲详情
export function getMusicDetail(ids) {
    const url = `${URL}/song/detail`
    return axios.get(url, {
        params: {
            ids
        }
    })
}
