import React, { useEffect, useState } from "react";
import { getTopListDetail } from "./../../api/NeteaseCloudMusicApi";
import { HTTP_OK } from "./../../config";
import "./recommend.less";
export default (props) => {
  const [officialList, setOfficialList] = useState([]);
  const [globalList, setGlobalList] = useState([]);
  const [artistList, setArtistList] = useState<any>([]);
  useEffect(() => {
    getTopListDetail().then((res) => {
      if (res.data.code === HTTP_OK) {
        // console.log(res.data.list)
        let officialList = [],
          globalList = [],
          artistList = res.data.artistToplist;
        res.data.list.forEach((item) => {
          if (item.ToplistType) {
            officialList.push({
              id: item.id,
              name: item.name,
              coverImgUrl: item.coverImgUrl,
              description: item.description,
              updateFrequency: item.updateFrequency,
              tracks: item.tracks,
              ToplistType: item.ToplistType,
            });
          } else {
            globalList.push({
              id: item.id,
              name: item.name,
              coverImgUrl: item.coverImgUrl,
              description: item.description,
              updateFrequency: item.updateFrequency,
            });
          }
        });
        setOfficialList(officialList);
        setGlobalList(globalList);
        setArtistList(artistList);
      }
    });
  }, []);
  return (
    <div className="music-topList">
      <h1 className="toplist-title">官方榜单</h1>
      <div className="row-list">
        {officialList.map((item) => (
          <div
            className="row-item"
            style={{ width: "20%"}}
            onClick={() => {
              props.history.push({
                pathname: `/music/playlist/${item.id}`,
              });
            }}
            key={item.id}
          >
            <div className="item-hd">
              <img src={`${item.coverImgUrl}?param=150y150`} alt="" />
              <p>{item.updateFrequency}</p>
            </div>
            <div className="row-item-bd">
              {item.tracks.map((tracks, index) => (
                <p
                  key={`${item.id}${index}`}
                >{`${tracks.first}-${tracks.second}`}</p>
              ))}
            </div>
          </div>
        ))}
        {artistList && artistList.name && (
          <div className="row-item">
            <div className="item-hd">
              <img src={`${artistList.coverUrl}?param=150y150`} alt="" />
              <p>{artistList.updateFrequency}</p>
            </div>
            <div className="row-item-bd">
              {artistList.artists.map((item, index) => (
                <p
                  key={`${item.third}${index}`}
                >{`${item.first}    ${item.third}`}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      <h1 className="toplist-title">全球榜</h1>
      <div className="column-list">
        {globalList.map((item) => (
          <div
            className="column-item"
            onClick={() => {
              props.history.push({
                pathname: `/music/playlist/${item.id}`,
              });
            }}
            key={item.id}
          >
            <div className="item-hd">
              <img src={`${item.coverImgUrl}?param=150y150`} alt="" />
              <p>{item.updateFrequency}</p>
            </div>
            <div className="column-bd">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
