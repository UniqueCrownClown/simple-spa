import React, { useState, useEffect } from "react";
import MusicList from "./musicList";
import { useSelector, useDispatch } from "react-redux";
import { setGlobalSongList, setCurrentSong } from "src/stores/actions";
export default () => {
  const currentSong = useSelector((state: any) => state.currentSong);
  const [songList, setSongList] = useState([]);
  const globalSongList = useSelector((state: any) => state.globalSongList);
  const dispatch = useDispatch();
  const Storage = window.localStorage;
  const closeSong = (event: any, songid: string) => {
    event.stopPropagation();
    const data = JSON.parse(Storage.getItem("history_music_list")).filter(
      (item) => item.songid !== songid
    );
    Storage.setItem("history_music_list", JSON.stringify(data));
    setSongList(data || []);
  };
  const playSong = (event: any, songid: string) => {
    // 全局的播放列表切到历史
    if (
      globalSongList.length === 0 ||
      globalSongList.length !== songList.length
    ) {
      dispatch(setGlobalSongList(songList));
    }
    dispatch(setCurrentSong(songList.find((item) => item.songid === songid)));
  };
  // localStorage重新触发useEffect
  useEffect(() => {
    const data = Storage.getItem("history_music_list");
    setSongList(JSON.parse(data) || []);
  }, [Storage.getItem("history_music_list")]);

  return (
    <div className="heardList">
      <MusicList
        songList={songList}
        currentSong={currentSong}
        playSong={playSong}
        isRemove={true}
        closeSong={closeSong}
      />
    </div>
  );
};
