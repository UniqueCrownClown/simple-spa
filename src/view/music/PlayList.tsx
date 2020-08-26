import React, { useState, useEffect } from "react";
import MusicList from "./musicList";
import { useSelector, useDispatch } from "react-redux";
import { getPlaylistDetail } from "src/api/NeteaseCloudMusicApi";
import { setCurrentSong } from "src/stores/actions";
export default (props: any) => {
  const currentSong = useSelector((state: any) => state.currentSong);
  const [songList, setSongList] = useState([]);
  const sourcePath = (id) =>
    `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
  const dispatch = useDispatch();

  const playSong = (event: any, songid: string) => {
    // 歌曲资源托管在码云上
    dispatch(
      setCurrentSong(songList.find((item) => item.songid === songid))
    );
  };
  useEffect(() => {
    getPlaylistDetail(props.match.params.id).then((response) => {
      console.log(response);
      const  temp = response.data.playlist.tracks.map(item=>{
        return {
          author: item.ar[0].name,
          pic: item.al.picUrl,
          songid: item.id,
          title: item.name,
          url: sourcePath(item.id),
        };
      });
      setSongList(temp);
    });
  }, []);
  return (
    <div className="play-list">
      {" "}
      <MusicList
        songList={songList}
        currentSong={currentSong}
        playSong={playSong}
      />
    </div>
  );
};
