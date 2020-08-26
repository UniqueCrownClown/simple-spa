import { Button } from "antd";
import React from "react";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import { Route } from "react-router-dom";
import CurrentList from "./CurrentList";
import JayList from "./JayList";
import LyricList from "./LyricList";
import "./music.less";
import MusicSearch from "./MusicSearch";
import PlayList from "./PlayList";
import Recommend from "./Recommend";
import HearedList from "./HearedList";
export default (props: any) => {
  return (
    <div className="music-module">
      <div className="music-module-container">
        <div className="music-module-left">
          <div className="music-btn-list">
            <Button
              type="dashed"
              onClick={() => props.history.push({ pathname: "/music/current" })}
            >
              正在播放
            </Button>
            <Button
              type="dashed"
              onClick={() =>
                props.history.push({ pathname: "/music/recommend" })
              }
            >
              推荐
            </Button>
            <Button
              type="dashed"
              onClick={() => props.history.push({ pathname: "/music/search" })}
            >
              搜索
            </Button>
            <Button
              type="dashed"
              onClick={() => props.history.push({ pathname: "/music/jay" })}
            >
              周杰伦歌单
            </Button>
            <Button
              type="dashed"
              onClick={() => props.history.push({ pathname: "/music/heared" })}
            >
              我听过的
            </Button>
          </div>
          <div className="music-player-container">
            <CacheSwitch>
              <Route path="/music/current" component={CurrentList} />
              <CacheRoute path="/music/search" component={MusicSearch} />
              <CacheRoute path="/music/jay" component={JayList} />
              <CacheRoute path="/music/heared" component={HearedList} />
              <CacheRoute
                path="/music/recommend"
                component={(props) => <Recommend {...props} />}
              />
              <Route
                path="/music/playlist/:id"
                component={(props) => <PlayList {...props} />}
              />
            </CacheSwitch>
          </div>
        </div>
        <LyricList />
      </div>
    </div>
  );
};
