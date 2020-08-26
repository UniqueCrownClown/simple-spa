import Test from "../components/Test";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../stores/typing";
import { incrementEnthusiasm, EnthusiasmAction, decrementEnthusiasm } from "../stores/actions";

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName
  };
}
// 异步的dispatch怎么写怎么处理
// props的一个function可能需要不止dispatch一次，可能多次，可能还需要异步dispatch
export function mapDispatchToProps(
  dispatch: Dispatch<EnthusiasmAction>
) {
  return {
    onIncrement: () => dispatch(incrementEnthusiasm()),
    onDecrement: () => dispatch(decrementEnthusiasm())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
