import React, { useEffect, useState } from "react";
import MusicList from "./musicList";
import LyricList from "./LyricList";
import { useSelector, useDispatch } from "react-redux";
import { getPlaylistDetail } from "src/api/NeteaseCloudMusicApi";
import { setGlobalSongList, setCurrentSong } from "src/stores/actions";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
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
        const temp = response.map((item) => {
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
  const [current, setCurrent] = useState("list");
  const handleClick = ({ item, key, keyPath, domEvent }) => {
    setCurrent(key)
  }
  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="list">
          列表
        </Menu.Item>
        <Menu.Item key="lyric">
          歌词
        </Menu.Item>
      </Menu>
      <MusicList
        style={current === "list" ? { display: "block" } : { display: "none" }}
        songList={songList}
        currentSong={currentSong}
        playSong={playSong}
      />
      <LyricList style={current === "lyric" ? { display: "block" } : { display: "none" }} />
    </div>
  );
};
