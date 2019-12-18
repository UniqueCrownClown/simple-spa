import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { getList, getLrc } from 'src/api';
import "./music.less";
import { constants } from 'zlib';

const Music = () => {
  const [songList, setSongList] = useState([{ songid: "1", title: "1", author: "1" }]);
  let myAudio;
  let lyricList;
  useEffect(() => {
    // 在组件下一次重新渲染之后执行
    getList().then((res: any) => {
      console.log(res);
      const hahaha23 = res.data.map(item => {
        item.show = true;
        item.url = `http://jaymusic.gitee.io/jaymusic${item.path}`
        return item
      })
      setSongList(hahaha23)
    });
  }, []);
  const [playing, setPlaying] = useState({ lrcData: [] });
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
            type: false
          });
        }
      }
      console.log(hahahx);
      setPlaying({ lrcData: hahahx })
    })
  };
  const TestClick = () => {
    // alert("test");
    lrc("003OUlho2HcRHC");
  };
  const [currentSong, setcurrentSong] = useState({ songid: "1", title: "1", author: "1" });
  const playSong = (event: any, songid: string) => {
    // 歌曲资源托管在码云上
    setcurrentSong(songList.find(item => item.songid === songid))
    // 显示歌词
    lrc(songid);
    // 播放歌曲

  };
  useEffect(() => {
    // 渲染完后才允许调用
    myAudio.play();
    const ddd: any = new Date()
    myAudio.ontimeupdate = (event) => {
      console.log(event.target.currentTime);
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
    };
    myAudio.onended = () => {
      console.log("end");
      const index = songList.findIndex(item => item === currentSong);
      const songid = songList[index + 1].songid;
      playSong(event, songid)
    };
    return () => {
      // 清除myAudio注册事件
    }
  }, [currentSong]);
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
  const [currentShow, setcurrentShow] = useState(0);
  return (
    <div className="music-module">
      <div className="music-module-container">
        <div className="music-module-left">
          <div className="music-btn-list">
            <Button>正在播放</Button>
            <Button>搜索</Button>
            {<Button onClick={TestClick}>测试按钮</Button>}
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
            <ul id="unique-lyricList" ref={el => { lyricList = el }}>{
              playing.lrcData.map((item, index) => (<li key={item.locate + item.type} className={item.type ? "active" : null}>{item.content}</li>))
            }</ul>
          </div>
        </div>
      </div>
      <div className="music-module-footer">
        <div className="music-play-row">
          <div className="music-play-row-left">
            {/* <Icon type="step-backward" />
            <Icon type="play-circle" />
            <Icon type="step-forward" /> */}
          </div>
          <div className="music-play-row-middle">
            {/* src={require('/node/downloadFiles/002lW4Yl3ylM02.mp3')} */}
            <audio controls={true} ref={el => { myAudio = el }} src={String((currentSong as any).url)} />
          </div>
          <div className="music-play-row-right">
            {/* <Icon type="swap" />
            <Icon type="sound" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Music;