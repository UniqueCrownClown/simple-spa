import { Input } from "antd";
import React, { useEffect, useState } from "react";
import MusicList from "./musicList";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../stores/actions";
import { search } from "src/api/NeteaseCloudMusicApi";
export default () => {
  const currentSong = useSelector((state: any) => state.currentSong);
  const [songList, setSongList] = useState([]);
  const sourcePath = (id) =>
    `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
  const dispatch = useDispatch();

  const playSong = (event: any, songid: string) => {
    // 歌曲资源托管在码云上
    dispatch(
      actions.setCurrentSong(songList.find((item) => item.songid === songid))
    );
  };
  useEffect(() => {}, []);
  const searchEvent = (e: { currentTarget: { value: any } }) => {
    console.log(e);
    search(e.currentTarget.value).then((response) => {
      console.log(response);
      const temp = response && response.data && response.data.result.songs.map((item) => {
        return {
          author: item.artists[0].name,
          pic: item.artists[0].img1v1Url,
          songid: item.id,
          title: item.name,
          url: sourcePath(item.id),
        };
      });
      setSongList(temp);
    });
  };
  return (
    <div>
      <div className="searchHeader">
        <Input placeholder="Basic usage" onPressEnter={searchEvent} />
      </div>
      <div className="searchBody">
        <MusicList
          songList={songList}
          currentSong={currentSong}
          playSong={playSong}
        />
      </div>
    </div>
  );
};
