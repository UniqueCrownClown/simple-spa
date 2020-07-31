import React, { useEffect } from "react";

export default (props: any) => {
  useEffect(() => {
    const index = props.lrcData.findIndex((item) => item.type === false);

    console.log(index);
    // tramsform
    if (index > 0) {
      const controlDistance: number = 100;
      const moveDistance =
        index * 20 - controlDistance > 0 ? index * 20 - controlDistance : 0;
      document.getElementById("unique-lyricList").style.transform =
        "translateY(-" + moveDistance + "px)";
    }
  }, [props.lrcData]);
  return (
    <div className="music-module-right">
      <div className="music-pic">
        <img src={String((props.currentSong as any).pic)} alt="" />
      </div>
      <div className="music-lyric">
        <ul id="unique-lyricList">
          {props.lrcData.map((item: any) => (
            <li
              key={item.locate + item.type}
              className={item.type ? "active" : null}
            >
              {item.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
