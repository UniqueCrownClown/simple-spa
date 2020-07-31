import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./mainSec.less";

export default () => {
  const [content, setContent] = useState([]);
  const getData = (page: string, limit: string) => {
    axios
      .get(
        `https://cnodejs.org/api/v1/topics?page= ${page}&limit=${limit}&mdrender= false`
      )
      .then((res) => {
        console.log(res.data.data);
        setContent(res.data.data);
      })
      .catch((res) => {
        console.log("MaiSec.tsx: ", res);
      });
  };
  const dealCommentTime = (time: string) => {
    return String(time)
      .match(/.{10}/)[0]
      .replace(/.{2}/, "")
      .replace(/[T]/, " ");
  };
  useEffect(() => {
    getData("1", "10");
  }, []);
  return (
    <div style={{ height: "100%", display: "flex", justifyContent: "center" }} data-component="mainSec">
      <div className="secDiv">
        {content.map((item) => (
          <div key={item.id}>
            <Link
              className="nav-link"
              to={{
                pathname: `/@${item.author.loginname}/users`,
                state: { name: item.author.loginname },
              }}
            >
              <img
                src={item.author.avatar_url}
                alt=""
                title={item.author.loginname}
              />
            </Link>

            <div>
              <Link
                className="nav-link"
                to={{
                  pathname: `/topic/${item.id}`,
                }}
              >
                <div>{item.title}</div>
              </Link>

              <div className="stuff">
                <span>回复：{item.reply_count}</span>
                <span>创建于：{dealCommentTime(item.create_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
