import React, { useState } from "react";
import "./photoMain.less";
const photoMain = () => {
  const [imgSource, setImgSource] = useState(
    new Array(8).fill(undefined).map((item, index) => {
      return {
        id: (100 * Math.random()).toString(),
        source:  'https://cdn.jsdelivr.net/gh/UniqueCrownClown/pic-bed/img/3f3ee1e67788e49354019f6283f45749.jpg'
      };
    })
  );
  const [imgKinds, setImgKinds] = useState([
    { id: "123", name: "light" },
    { id: "456", name: "life" },
  ]);
  const [activeType, setActiveType] = useState(0);
  const handleSiblingsClick = (event) => {
    const index = event.target.getAttribute("data-index");
    const name = imgKinds[index].name;
    setActiveType(parseInt(index, 10));
    // 图片路径应该是走ajax下发来的
    setImgSource(new Array(4).fill(undefined).map((item, index) => {
      return {
        id: (100 * Math.random()).toString(),
        source: 'https://cdn.jsdelivr.net/gh/UniqueCrownClown/pic-bed/img/3f3ee1e67788e49354019f6283f45749.jpg'
      }
    }))
  };
  return (
    <div className="photo-show-main">
      <div className="photo-show-left">
        <div className="photo-show-kinds">
          {imgKinds.map((item, index) => (
            <div
              className={
                activeType === index
                  ? "photo-show-kinds-item active"
                  : "photo-show-kinds-item"
              }
              onClick={handleSiblingsClick}
              data-index={index}
              key={item.id}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="photo-show-right">
        <div className="photo-show-img-container">
          {/* 有间隙的瀑布流布局 + 懒加载 */}
          {imgSource.map((item) => (
            <div className="photo-show-img-item" key={item.id}>
              <img src={item.source} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default photoMain;
