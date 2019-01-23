import * as React from "react";
import "./agetable.less";
export interface DeadTableProps {
  deadTime: {
    hour: number,
    min: number
  }
  thingsCount: {
    rice: number,
    love: number,
    week: number,
    holiday: number
  }
}
const DeadTable = (prop: DeadTableProps) => {
  const { deadTime, thingsCount } = prop;
  return (<div className="deadTable">
    <h3>这是你一生中的{deadTime.hour}点{deadTime.min}分</h3>
    <p>剩下的日子里，你大约可以</p>
    <table className="deadTable-content">
      <tbody>
        <tr>
          <td><span>吃{thingsCount.rice}顿饭</span></td>
          <td><span>做{thingsCount.love}次爱</span></td>
        </tr>
        <tr>
          <td><span>度过{thingsCount.week}次周末</span></td>
          <td><span>享受{thingsCount.holiday}个长假</span></td>
        </tr>
      </tbody>
    </table>
  </div>)
}
export default DeadTable;