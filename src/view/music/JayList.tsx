import React, { useEffect, useState } from "react";
import MusicList from "./musicList";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "src/api";
import { setCurrentSong, setGlobalSongList } from "../../stores/actions";
export default () => {
  const currentSong = useSelector((state: any) => state.currentSong);
  // const [songList, setSongList] = useState([]);
  const songList = useSelector((state: any) => state.globalSongList);
  const dispatch = useDispatch();

  const playSong = (event: any, songid: string) => {
    // 歌曲资源托管在码云上
    dispatch(setCurrentSong(songList.find((item) => item.songid === songid)));
  };

  useEffect(() => {
    // 在组件下一次重新渲染之后执行
    if (songList.length <= 0) {
      // 路由切回来不重新请求
      getList().then(async (res: any) => {
        const hahaha23 =
          res &&
          res.data.map((item) => {
            item.show = true;
            item.url = `http://jaymusic.gitee.io/jaymusic${item.path}`;
            return item;
          });
        // 本地路径
        // hahaha23[0].url = `node/localMusic/a.mp3`;
        if (hahaha23.length > 0) {
          dispatch(setGlobalSongList(hahaha23));
        }
      });
    }
  }, []);
  return (
    <div>
      <MusicList
        songList={songList}
        currentSong={currentSong}
        playSong={playSong}
      />
    </div>
  );
};
