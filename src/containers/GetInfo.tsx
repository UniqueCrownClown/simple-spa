import GetInfo from "../components/getInfo/GetInfo";
import * as actions from "../stores/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../stores/typing";
// import { bindActionCreators } from "redux";

export function mapStateToProps({ userBirthday }: StoreState) {
  return {
    birth: userBirthday
  };
}
// 异步的dispatch怎么写怎么处理
// props的一个function可能需要不止dispatch一次，可能多次，可能还需要异步dispatch
export function mapDispatchToProps(
  dispatch: Dispatch<actions.EnthusiasmAction>
) {
  return {
    testtest: (parms: string) => dispatch(actions.setUserBirth(parms))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetInfo);
