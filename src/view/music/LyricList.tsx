import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { transformLrc } from "./lrcUtil";

export default (props: any) => {
  const musicTime = useSelector((state: any) => state.musicTime);
  const currentSong = useSelector((state: any) => state.currentSong);
  const [lrcData, setLrcData] = useState([]);

  useEffect(() => {
    transformLrc(currentSong.songid,currentSong.type).then((lrcData) => {
      setLrcData(lrcData);
    });
  }, [currentSong]);
  useEffect(() => {
    const intMusicTime = Math.ceil(musicTime);
    const index =
      lrcData && lrcData.findIndex((item) => item.locate >= intMusicTime);
    //  console.log(index);
    // tramsform
    const controlDistance: number = 100;
    const moveDistance =
      index * 20 - controlDistance > 0 ? index * 20 - controlDistance : 0;
    document.getElementById("unique-lyricList").style.transform =
      "translateY(-" + moveDistance + "px)";
  }, [musicTime]);

  return (
    <div className="music-module-right" style={props.style}>
      <div className="music-pic">
        <img src={String((currentSong as any).pic)} alt="" />
      </div>
      <div className="music-lyric">
        <ul id="unique-lyricList">
          {lrcData &&
            lrcData.map((item: any) => (
              <li
                key={item.locate + item.type}
                className={musicTime >= item.locate ? "active" : null}
              >
                {item.content}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
