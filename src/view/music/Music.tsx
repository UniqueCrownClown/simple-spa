import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { getList, getLrc } from "./../../api";
import LyricList from "./LyricList";
import "./music.less";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../stores/actions";
import { lrc } from "./lrcUtil";
export default () => {
  const lyricData = useSelector((state: any) => state.lyricData);
  const currentSong = useSelector((state: any) => state.currentSong);
  const songList = useSelector((state: any) => state.songList);
  const dispatch = useDispatch();

  const playSong = (event: any, songid: string) => {
    // 歌曲资源托管在码云上
    dispatch(
      actions.setCurrentSong(songList.find((item) => item.songid === songid))
    );
    // 显示歌词
    lrc(songid).then((data) => {
      dispatch(actions.setLyricData(data));
    });
  };
  useEffect(() => {
    // 在组件下一次重新渲染之后执行
    if (songList.length <= 0) {
      // 路由切回来不重新请求
      getList().then(async (res: any) => {
        const hahaha23 = res.data.map((item) => {
          item.show = true;
          item.url = `http://jaymusic.gitee.io/jaymusic${item.path}`;
          return item;
        });
        console.log(hahaha23);
        // 本地路径
        hahaha23[0].url = `node/localMusic/a.mp3`;
        // 初始化自动播放
        dispatch(actions.setSongList(hahaha23));
        const randomSong = Math.ceil(100 * Math.random());
        dispatch(actions.setCurrentSong(hahaha23[randomSong]));
        // 显示歌词
        const data = await lrc(hahaha23[randomSong].songid);
        dispatch(actions.setLyricData(data));
      });
    }
  }, []);
  return (
    <div className="music-module">
      <div className="music-module-container">
        <div className="music-module-left">
          <div className="music-btn-list">
            <Button>正在播放</Button>
            <Button>搜索</Button>
          </div>
          <div className="music-player-list">
            <div className="music-player-list-header">
              <span>歌曲</span>
              <span>歌手</span>
            </div>
            {songList.map((item) => (
              <div
                className={
                  currentSong === item
                    ? "music-player-list-item active"
                    : "music-player-list-item "
                }
                key={item.songid}
                onClick={(event) => playSong(event, item.songid)}
              >
                {currentSong === item ? (
                  <span>
                    <img
                      className="music-playing-icon"
                      src={require("../../assets/images/playing.svg")}
                    />
                    {item.title}
                  </span>
                ) : (
                  <span>{item.title}</span>
                )}
                <span>{item.author}</span>
              </div>
            ))}
          </div>
        </div>
        <LyricList currentSong={currentSong} lrcData={lyricData} />
      </div>
    </div>
  );
};
