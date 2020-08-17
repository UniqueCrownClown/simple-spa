import { getLrc } from "src/api";
export const transformLrc = async (songid: string, type?: string) => {
    const hahahx = [];
    if (songid && songid !== "" && type) {
        const res: any = await getLrc(songid);
        if (res && res.data) {
            const src = formatLrc(res.data.lrc);
            for (const prop in src) {
                if (src.hasOwnProperty(prop)) {
                    // 继续操作prop和obj
                    hahahx.push({
                        locate: prop,
                        content: src[prop],
                        type: false, // 是否当前的歌词
                    });
                }
            }
            return hahahx
        }

    }
    return hahahx
};
const formatLrc = (str: string) => {
    const lrcObj = {};
    const regExp = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/g;
    while (1) {
        const result = regExp.exec(str);
        if (result) {
            const time = parseInt(result[1], 10) * 60 + parseInt(result[2], 10);
            lrcObj[time] = result[4];
        } else {
            break;
        }
    }
    for (const i in lrcObj) {
        if (!lrcObj[i]) {
            delete lrcObj[i];
        }
    }
    return lrcObj;
};