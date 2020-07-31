import React, { useState, useEffect, Props } from "react";
import "./userCom.less";
import axios from "src/api";

declare interface IAuthor {
  avatar_url: string;
  loginname: string;
}
declare interface IReplies {
  author: IAuthor;
  title: string;
}
declare type UserComProps = {
  location: any;
};
export default (props: UserComProps) => {
  const [userInfo, setUserInfo] = useState<{
    author: any;
    avatar_url: string;
    loginname: string;
    score: string;
    githubUsername: string;
    create_at: string;
    recent_replies: IReplies[];
    recent_topics: any;
  } | null>(null);
  const dealCommentTime = (time: string) => {
    return String(time)
      .match(/.{10}/)[0]
      .replace(/.{2}/, "")
      .replace(/[T]/, " ");
  };
  const getData = (path: string) => {
    axios
      .get(`https://cnodejs.org/api/v1${path}`)
      .then((res) => {
        setUserInfo(res.data.data);
      })
      .catch((res) => {
        console.log("UserCom: ", res);
      });
  };
  useEffect(() => {
    const name = props.location.state.name;
    getData(`/user/${name}`);
  }, []);
  return (
    <div className="userCom" data-component="userCom">
      {!userInfo ? (
        <div>无数据</div>
      ) : (
        <div className="secDiv">
          <div className="profile">
            <div>
              <img src={userInfo.avatar_url} title={userInfo.loginname} />
              <span>{userInfo.loginname}</span>
            </div>
            <p>
              <span>积分：</span>
              {userInfo.score}
            </p>
            <p>
              <span>Github：</span>{" "}
              {`https://github.com/${userInfo.githubUsername}`}
            </p>
            <p>
              <span>注册时间：</span>
              {dealCommentTime(userInfo.create_at)}
            </p>
          </div>
          <div className="recentReplies">
            <p>最近参与的话题</p>
            {userInfo.recent_replies.map((item) => (
              <div>
                {item.author.avatar_url ? (
                  <img
                    src={item.author.avatar_url}
                    title={item.author.loginname}
                  />
                ) : null}
                <p className="userTitle">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="recentTopics">
            <p>最近创建的话题</p>
            {userInfo.recent_topics.map((item) => (
              <div>
                <img
                  src={item.author.avatar_url}
                  title={item.author.loginname}
                />
                <div>{item.id}</div>
                <p className="userTitle">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
