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
      case "setMusicTime" : 
      return {
        ...state,
        musicTime : (action as any).musicTime
      }
      case "setCurrentSong":
        return {
          ...state,
          currentSong: (action as any).currentSong
        };
        case "setGlobalSongList":
          return {
            ...state,
            globalSongList: (action as any).globalSongList
          };
  }
  return state;
}
