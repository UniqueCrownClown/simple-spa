import React, { useEffect } from "react";
import MusicList from "./musicList";
import { useSelector, useDispatch } from "react-redux";
import { getPlaylistDetail } from "src/api/NeteaseCloudMusicApi";
import { setGlobalSongList, setCurrentSong } from "src/stores/actions";
export default () => {
  const currentSong = useSelector((state: any) => state.currentSong);
  const songList = useSelector((state: any) => state.globalSongList);
  const dispatch = useDispatch();
  const sourcePath = (id) =>
    `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
  useEffect(() => {
    // 在组件下一次重新渲染之后执行
    if (songList.length <= 0) {
      getPlaylistDetail("3778678").then(async (response: any) => {
        const temp = response.data.playlist.tracks.map((item) => {
          return {
            author: item.ar[0].name,
            pic: item.al.picUrl,
            songid: item.id,
            title: item.name,
            url: sourcePath(item.id),
          };
        });
        dispatch(setGlobalSongList(temp));
        // 初始化自动播放
        // const randomSong = Math.ceil(100 * Math.random());
        // dispatch(actions.setCurrentSong(hahaha23[randomSong]));
      });
    }
  }, []);
  const playSong = (event: any, songid: string) => {
    dispatch(setCurrentSong(songList.find((item) => item.songid === songid)));
  };

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
