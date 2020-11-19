import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./musicList.less";
export default (props: any) => {
  return (
    <div className="music-player-list" style={props.style}>
      <div className="music-player-list-header">
        <span>歌曲</span>
        <span>歌手</span>
      </div>
      {props.songList.map((item) => (
        <div
          className={
            props.currentSong === item
              ? "music-player-list-item active"
              : "music-player-list-item "
          }
          key={item.songid}
          onClick={(event) => props.playSong(event, item.songid)}
        >
          {props.currentSong === item ? (
            <span>
              <img
                className="music-playing-icon"
                src={require("../../../assets/images/playing.svg")}
              />
              {item.title}
            </span>
          ) : (
            <span>{item.title}</span>
          )}
          <span>{item.author}</span>
          {props.isRemove ? <div className="closeWrap" onClick={(event) =>props.closeSong(event, item.songid)}>
            <CloseCircleOutlined style={{ fontSize: '24px' }} /> </div>: null}
        </div>
      ))}
    </div>
  );
};
