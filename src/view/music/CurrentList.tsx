import React, { useEffect } from "react";
import MusicList from "./../../components/musicList";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "src/api";
import * as actions from "../../stores/actions";
export default () => {
  const currentSong = useSelector((state: any) => state.currentSong);
  const songList = useSelector((state: any) => state.songList);
  const dispatch = useDispatch();

  const playSong = (event: any, songid: string) => {
    // 歌曲资源托管在码云上
    dispatch(
      actions.setCurrentSong(songList.find((item) => item.songid === songid))
    );
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
        dispatch(actions.setSongList(hahaha23));
        // 初始化自动播放
        // const randomSong = Math.ceil(100 * Math.random());
        // dispatch(actions.setCurrentSong(hahaha23[randomSong]));
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
