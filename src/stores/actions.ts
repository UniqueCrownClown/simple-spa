import * as constants from "./constants";
const Storage = window.localStorage;
export interface IncrementEnthusiasm {
  type: constants.INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm {
  type: constants.DECREMENT_ENTHUSIASM;
}

export interface SETUSERBIRTHDAY {
  type: string;
  userBithday: string;
}

export type EnthusiasmAction =
  | SETUSERBIRTHDAY
  | IncrementEnthusiasm
  | DecrementEnthusiasm;

export function incrementEnthusiasm(): IncrementEnthusiasm {
  return {
    type: constants.INCREMENT_ENTHUSIASM,
  };
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
  return {
    type: constants.DECREMENT_ENTHUSIASM,
  };
}
// dispach触发action，通过type映射，把dispach的值挂在action对象上
export function setUserBirth(value: string): SETUSERBIRTHDAY {
  return {
    type: "setuserBirthday",
    userBithday: value,
  };
}

export function setMusicTime(payload: any): any {
  return {
    type: "setMusicTime",
    musicTime: payload,
  };
}
export function setGlobalSongList(payload: any): any {
  return {
    type: 'setGlobalSongList',
    globalSongList: payload
  }
}

export function setCurrentSong(payload: any): any {
  const historyList = Storage.getItem("history_music_list");
  const tempList = JSON.parse(historyList) ? JSON.parse(historyList).filter(item => item.songid !== payload.songid) : [];

  Storage.setItem("history_music_list", JSON.stringify([payload, ...tempList]));
  return {
    type: 'setCurrentSong',
    currentSong: payload
  }
}



