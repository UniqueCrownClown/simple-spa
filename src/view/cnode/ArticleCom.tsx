import React, { useState, useEffect } from "react";
import "./articleCom.less";
import axios from "src/api";
import { Link } from "react-router-dom";
export default (props: any) => {
  const [article, setArticle] = useState<
    | string
    | {
        title: string;
        author: { loginname: string };
        visit_count: string;
        tab: string;
        content: string;
        create_at: string;
        replies: any;
      }
  >("");
  useEffect(() => {
    console.log(props);
    const pathname = props.location.pathname;
    getData(pathname);
  }, []);
  const getData = (path: string) => {
    axios
      .get(`https://cnodejs.org/api/v1${path}`)
      .then((res) => {
        if (res.data.success === true) {
          setArticle(res.data.data);
        } else {
          this.article =
            "Sorry, Something wrong happened when getting the remote data";
        }
      })
      .catch((res) => {
        console.log("ArticleCom: ", res);
      });
  };
  const dealCommentTime = (time: string) => {
    return String(time)
      .match(/.{16}/)[0]
      .replace(/.{2}/, "")
      .replace(/[T]/, " ");
  };
  return typeof article === "string" ? null : (
    <div className="secDiv">
      <span className="marginSpan">
        发布于：{dealCommentTime(article.create_at)}
      </span>
      <Link
        className="nav-link"
        to={{
          pathname: `/@${article.author.loginname}/users`,
          state: { name: article.author.loginname },
        }}
      >
        作者：{article.author.loginname}
      </Link>
      <span className="marginSpan">浏览量：{article.visit_count}</span>
      <span>来自：{article.tab}</span>
      <h3>{article.title}</h3>
      <div
        id="content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
      <div id="reply">
        {article.replies.map((reply) => (
          <div className="replySec" key={reply.length}>
            <Link
              className="nav-link"
              to={{
                pathname: `/@${reply.author.loginname}/users`,
                state: { name: reply.author.loginname },
              }}
            >
              <img
                src={reply.author.avatar_url}
                alt=""
                title={reply.author.loginname}
              />
            </Link>
            <div>
              <div className="replyUp">
                <span className="replyName">{reply.author.loginname}</span>
                <span>{dealCommentTime(reply.create_at)}</span>
              </div>
              <p dangerouslySetInnerHTML={{ __html: reply.content }}></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
