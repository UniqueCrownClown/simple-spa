import { Button } from "antd";
import React from "react";
import { Route, Switch } from "react-router-dom";
import CurrentList from "./CurrentList";
import JayList from "./JayList";
import PlayList from "./PlayList";
import LyricList from "./LyricList";
import "./music.less";
import MusicSearch from "./MusicSearch";
import Recommend from "./Recommend";
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
              jayList
            </Button>
          </div>
          <div className="music-player-container">
            <Switch>
              <Route path="/music/current" component={CurrentList} />
              <Route path="/music/search" component={MusicSearch} />
              <Route path="/music/jay" component={JayList} />
              <Route path="/music/recommend" component={Recommend} />
              <Route path="/music/playlist/:id" component={PlayList} />
            </Switch>
          </div>
        </div>
        <LyricList />
      </div>
    </div>
  );
};
