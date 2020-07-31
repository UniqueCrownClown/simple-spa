import { EnthusiasmAction } from "./actions";
import { StoreState } from "./typing";
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from "./constants";

export function enthusiasm(
  state: StoreState,
  action: EnthusiasmAction
): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return {
        ...state,
        enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1)
      };
    case "setuserbirthday":
      return {
        ...state,
        userBirthday: (action as any).userBirthday
      };
      case "setLyricData" : 
      return {
        ...state,
        lyricData: (action as any).lyricData
      }
      case "setCurrentSong":
        return {
          ...state,
          currentSong: (action as any).currentSong
        };
        case "setSongList":
          return {
            ...state,
            songList: (action as any).songList
          };
  }
  return state;
}
