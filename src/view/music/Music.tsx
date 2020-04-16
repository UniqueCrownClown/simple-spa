import { Button, Icon } from 'antd';
import React, { useEffect, useState, AudioHTMLAttributes } from 'react';
import { getList, getLrc } from './../../api';
import "./music.less";
import Progress from './../../components/progress/progress';

const Music = () => {
  const [songList, setSongList] = useState([{ songid: "", title: "", author: "" }]);
  const [currentSong, setcurrentSong] = useState({ songid: "1", title: "1", author: "1" });
  const [currentTime, setcurrentTime] = useState("00:00");
  const [totalTime, settotalTime] = useState("00:00");
  const playSong = (event: any, songid: string) => {
    // 歌曲资源托管在码云上
    console.log(songList)
    setcurrentSong(songList.find(item => item.songid === songid))
    // 显示歌词
    lrc(songid);
    // 播放歌曲
    setcurrentState(true);
  };
  useEffect(() => {
    // 在组件下一次重新渲染之后执行
    getList().then((res: any) => {
      const hahaha23 = res.data.map(item => {
        item.show = true;
        item.url = `http://jaymusic.gitee.io/jaymusic${item.path}`
        return item
      });
      // 本地路径
      hahaha23[0].url = `node/localMusic/a.mp3`
      // 初始化自动播放
      setSongList(hahaha23);
      // setcurrentSong(hahaha23[0])
      // lrc(hahaha23[0].songid);
    });
  }, []);
  const [playing, setPlaying] = useState({ lrcData: [] });
  const [playPercent, setPlayPercent] = useState(0);
  const lrc = (songid: string) => {
    getLrc(songid).then((res: any) => {
      const src = formatLrc(res.data.lrc);
      // console.log(src);
      const hahahx = [];
      for (const prop in src) {
        if (src.hasOwnProperty(prop)) {
          // 继续操作prop和obj
          hahahx.push({
            locate: prop,
            content: src[prop],
            type: false // 是否当前的歌词
          });
        }
      }
      console.log(hahahx);
      setPlaying({ lrcData: hahahx })
    })
  };
  const formatTime = (a: number): string => {
    const b = Math.floor(a);
    const min: string = Math.floor(a / 60) > 10 ? Math.floor(a / 60).toString() : "0" + Math.floor(a / 60).toString();
    const second: string = Math.floor(a % 60) > 10 ? Math.floor(a % 60).toString() : "0" + Math.floor(a % 60).toString();
    return min + ":" + second
  }
  const getSecond = (a: string): number => {
    const numArr = a.split(":");
    return parseInt(numArr[0], 10) * 60 + parseInt(numArr[1], 10);
  };
  useEffect(() => {
    // 渲染完后才允许调用
    const myAudio: any = document.getElementById("unique-audio");
    const ddd: any = new Date();
    if (myAudio) {
      myAudio.oncanplay = () => {
        console.log(myAudio.duration.toString())
        settotalTime(formatTime(myAudio.duration))
      }
      myAudio.ontimeupdate = (event: any) => {
        // console.log(event.target.currentTime);
        // let current: number = (new Date() as any) - ddd;
        // current = Math.round(current / 1000);
        const current = Math.round(event.target.currentTime);
        setPlaying(item => {
          const index = item.lrcData.findIndex(ele => ele.locate === current.toString());
          if (index > -1) {
            const returnData = item.lrcData; // 用深克隆？？
            returnData.forEach(ele => ele.type = false);
            returnData[index].type = true;
            // tramsform
            const controlDistance: number = 100;
            const moveDistance = index * 20 - controlDistance > 0 ? index * 20 - controlDistance : 0;
            document.getElementById("unique-lyricList").style.transform = 'translateY(-' + moveDistance + 'px)';
            // if (lyricList) {
            //   lyricList.style.transform = 'translateY(-' + index * 20 + 'px)';
            // }
            return { lrcData: returnData }
          }
          return item
        })
        // 设置进度条
        setPlayPercent(current / getSecond(totalTime));
        setcurrentTime(formatTime(current));
      };
      myAudio.onended = () => {
        console.log("end");
        const index = songList.findIndex(item => item === currentSong);
        if (index >= -1 && index < songList.length - 1) {
          const songid = songList[index + 1].songid;
          playSong(event, songid)
        }
      };
    }

    return () => {
      // 清除myAudio注册事件
    }
  }, [currentSong, totalTime]);
  const formatLrc = (str: string) => {
    const lrcObj = {};
    const regExp = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/g;
    while (1) {
      const result = regExp.exec(str)
      if (result) {
        const time = (parseInt(result[1], 10) * 60) + (parseInt(result[2], 10))
        lrcObj[time] = result[4]
      } else {
        break
      }
    }
    for (const i in lrcObj) {
      if (!lrcObj[i]) {
        delete lrcObj[i]
      }
    }
    return lrcObj
  };
  const [currentState, setcurrentState] = useState(false);
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
    const index = songList.findIndex(item => item === currentSong);
    if (index >= 1) {
      const songid = songList[index - 1].songid;
      playSong(event, songid);
    }
  };
  const nextClick = () => {
    const index = songList.findIndex(item => item === currentSong);
    if (index >= -1 && index < songList.length - 1) {
      const songid = songList[index + 1].songid;
      playSong(event, songid)
    }
  };
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
            {songList.map(item => (<div className={currentSong === item ? "music-player-list-item active" : "music-player-list-item "}
              key={item.songid}
              onClick={(event) => playSong(event, item.songid)}>
              {currentSong === item ?
                <span><img className="music-playing-icon" src={require("../../assets/images/playing.svg")} />{item.title}</span> : <span>{item.title}</span>}
              <span>{item.author}</span>
            </div>))}
          </div>
        </div>
        <div className="music-module-right">
          <div className="music-pic">
            <img src={String((currentSong as any).pic)} alt="" />
          </div>
          <div className="music-lyric">
            <ul id="unique-lyricList">{
              playing.lrcData.map((item, index) => (<li key={item.locate + item.type} className={item.type ? "active" : null}>{item.content}</li>))
            }</ul>
          </div>
        </div>
      </div>
      <div className="music-module-footer">
        <div className="music-play-progress">
          <span>{currentTime}</span>
          <Progress
            percent={playPercent}
            percentProgress={50}
          />
          <span>{totalTime}</span>
        </div>
        <div className="music-play-row">
          <div className="music-play-row-left">
            <audio autoPlay={true} id="unique-audio" src={String((currentSong as any).url)} />
            <Icon type="swap" />
          </div>
          <div className="music-play-row-middle">
            <Icon type="step-backward" onClick={prevClick} />
            <Icon type={currentState ? "pause-circle" : "play-circle"} onClick={pauseClick} />
            <Icon type="step-forward" onClick={nextClick} />
          </div>
          <div className="music-play-row-right">
            <Icon type="sound" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Music;