import React, { useState, useEffect } from 'react';
import { Button, Icon, Progress } from 'antd';
import "./music.less"
const Music = () => {
  const [songList, setSongList] = useState([{ id: "1", name: "1", singer: "1", time: "1" }]);
  useEffect(() => {
    // 在组件下一次重新渲染之后执行
    const ss = [{ id: "test", name: "test", singer: "test", time: "test" }];
    setSongList(ss)
    return function cleanup() {
      console.log("测试useEffect生命周期")
    };
  }, [songList]);

  return (
    <div className="music-module">
      <div className="music-module-container">
        <div className="music-module-left">
          <div className="music-btn-list">
            <Button>正在播放</Button>
            <Button>推荐</Button>
            <Button>搜索</Button>
            <Button>我的歌单</Button>
            <Button>我听过的</Button>
          </div>
          <div className="music-player-list">
            <div className="music-player-list-header">
              <span>歌曲</span>
              <span>歌手</span>
              <span>专辑</span>
            </div>
            {songList.map(item => (<div className="music-player-list-item">
              <span>{item.name}</span>
              <span>{item.singer}</span>
              <span>{item.time}</span>
            </div>))}
          </div>
        </div>
        <div className="music-module-right">
          <div className="music-pic">
            123
          </div>
          <div className="music-lyric">
            123456
          </div>
        </div>
      </div>
      <div className="music-module-footer">
        <div className="music-play-row">
          <div className="music-play-row-left">
            <Icon type="step-backward" />
            <Icon type="play-circle" />
            <Icon type="step-forward" />
          </div>
          <div className="music-play-row-middle">
            <Progress percent={100} />
          </div>
          <div className="music-play-row-right">
            <Icon type="swap" />
            <Icon type="sound" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Music;