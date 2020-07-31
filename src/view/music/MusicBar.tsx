import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../stores/actions";
import Progress from "./../../components/progress/progress";
import "./musicBar.less";
import { lrc } from "./lrcUtil";
enum PlayType {
  Single,
  Random,
  List,
}
export default () => {
  const lyricData = useSelector((state: any) => state.lyricData);
  const currentSong = useSelector((state: any) => state.currentSong);
  const songList = useSelector((state: any) => state.songList);
  const dispatch = useDispatch();
  const [playPercent, setPlayPercent] = useState(0);
  const [currentTime, setcurrentTime] = useState("00:00");
  const [totalTime, settotalTime] = useState("00:00");
  const [playType, setPlayType] = useState(PlayType.List);
  const setLyricProcess = (current) => {
    return lyricData.map((item: any) => {
      if (item.locate === current.toString()) {
        return { ...item, type: false };
      } else {
        return { ...item, type: true };
      }
    });
  };
  const dragEnd = (percent: number) => {
    const myAudio: any = document.getElementById("unique-audio");
    myAudio.currentTime = getSecond(totalTime) * percent;
    // 同步一下歌词
    dispatch(actions.setLyricData(setLyricProcess(myAudio.currentTime)));
  };
  useEffect(() => {
    // 渲染完后才允许调用
    const myAudio: any = document.getElementById("unique-audio");
    if (myAudio) {
      myAudio.oncanplay = () => {
        console.log(myAudio.duration.toString());
        settotalTime(formatTime(myAudio.duration));
      };
      myAudio.ontimeupdate = (event: any) => {
        const current = Math.round(event.target.currentTime);

        dispatch(actions.setLyricData(setLyricProcess(current)));

        // 设置进度条
        setPlayPercent(current / getSecond(totalTime));
        setcurrentTime(formatTime(current));
      };
      myAudio.onended = () => {
        nextClick();
      };
    }

    return () => {
      // 清除myAudio注册事件
    };
  }, [currentSong, totalTime]);

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

  //顺序播放
  const swapClick = () => {
    // 切换图标设置type
    if (playType === PlayType.List) {
      setPlayType(PlayType.Random);
    } else if (playType === PlayType.Random) {
      setPlayType(PlayType.Single);
    } else if (playType === PlayType.Single) {
      setPlayType(PlayType.List);
    }
  };
  // 随机播放
  const pauseClick = () => {
    const myAudio = document.getElementById("unique-audio");
    if ((myAudio as any).paused) {
      setcurrentState(true);
      (myAudio as any).play();
    } else {
      setcurrentState(false);
      (myAudio as any).pause();
    }
  };
  const prevClick = () => {
    // 可能要一个播放index的listState来维护一个上一首列表
    const index = songList.findIndex((item) => item === currentSong);
    if (index >= 1) {
      const songid = songList[index - 1].songid;
      playSong(event, songid);
    }
  };
  const nextClick = () => {
    if (playType === PlayType.List) {
      const index = songList.findIndex((item) => item === currentSong);
      if (index >= -1 && index < songList.length - 1) {
        const songid = songList[index + 1].songid;
        playSong(event, songid);
      }
    } else if (playType === PlayType.Random) {
      const index = songList.findIndex((item) => item === currentSong);
      if (index >= -1 && index < songList.length - 1) {
        const randomIndex = Math.floor(Math.random() * songList.length);
        const songid = songList[randomIndex].songid;
        playSong(event, songid);
      }
    } else {
      const index = songList.findIndex((item) => item === currentSong);
      if (index >= -1 && index < songList.length - 1) {
        const songid = songList[index].songid;
        playSong(event, songid);
      }
    }
  };

  const [currentState, setcurrentState] = useState(false);
  const formatTime = (a: number): string => {
    const min: string =
      Math.floor(a / 60) > 10
        ? Math.floor(a / 60).toString()
        : "0" + Math.floor(a / 60).toString();
    const second: string =
      Math.floor(a % 60) > 10
        ? Math.floor(a % 60).toString()
        : "0" + Math.floor(a % 60).toString();
    return min + ":" + second;
  };
  const getSecond = (a: string): number => {
    const numArr = a.split(":");
    return parseInt(numArr[0], 10) * 60 + parseInt(numArr[1], 10);
  };

  return (
    <div className="music-module-footer">
      <div className="music-play-progress">
        <span style={{ fontSize: "12px" }}>
          {String((currentSong as any).title)}
        </span>
        <Progress
          percent={playPercent}
          percentProgress={50}
          dragEnd={dragEnd}
        />
        <span>
          {currentTime}/{totalTime}
        </span>
      </div>
      <div className="music-play-row">
        <div className="music-play-row-left">
          <audio
            autoPlay={true}
            id="unique-audio"
            src={String((currentSong as any).url)}
          />
          <i
            className={`iconfont ${
              playType === PlayType.List
                ? "icon-music-list"
                : playType === PlayType.Single
                ? "icon-music-cycle"
                : "icon-music-random"
            }`}
            onClick={swapClick}
          ></i>
        </div>
        <div className="music-play-row-middle">
          <i className="iconfont icon-music-prev" onClick={prevClick}></i>
          <i
            className={`iconfont ${
              currentState ? "icon-music-pause" : "icon-music-play"
            }`}
            onClick={pauseClick}
          ></i>
          <i className="iconfont icon-music-next" onClick={nextClick}></i>
        </div>
        <div className="music-play-row-right">
          <i className="iconfont icon-music-voice"></i>
        </div>
      </div>
    </div>
  );
};