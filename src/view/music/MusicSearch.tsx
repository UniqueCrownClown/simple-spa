import { Input } from "antd";
import React, { useEffect, useState } from "react";
import MusicList from "./musicList";
import { useSelector, useDispatch } from "react-redux";
import { search, searchHot } from "src/api/NeteaseCloudMusicApi";
import "./musicSearch.less";
import { setCurrentSong } from "src/stores/actions";
export default () => {
  const currentSong = useSelector((state: any) => state.currentSong);
  const [songList, setSongList] = useState([]);
  const [hotWord, setHotWord] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const sourcePath = (id) =>
    `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
  const dispatch = useDispatch();
  const searchRequest = (text) =>
    search(text).then((response) => {
      const temp =
        response &&
        response.data &&
        response.data.result.songs.map((item) => {
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
  const searchClick = (event) => {
    console.log(event);
    const text = event.currentTarget.innerText;
    searchRequest(text);
    setSearchInput(text);
  };
  const playSong = (event: any, songid: string) => {
    dispatch(setCurrentSong(songList.find((item) => item.songid === songid)));
  };
  useEffect(() => {
    searchHot().then((response: any) => {
      setHotWord(response.data.result.hots);
    });
  }, []);
  const searchEvent = (e: { currentTarget: { value: any } }) => {
    const text = e.currentTarget.value;
    searchRequest(text);
  };
  return (
    <div className="musicSearch">
      <div className="searchHeader">
        <div className="searchHotBlock">
          {hotWord.map((item, index) => (
            <div key={index.toString()} onClick={searchClick}>
              {item.first}
            </div>
          ))}
        </div>
        <Input
          placeholder="歌曲 歌手"
          onPressEnter={searchEvent}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          value={searchInput}
        />
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
