import * as constants from "./constants";

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
    type: constants.INCREMENT_ENTHUSIASM
  };
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
  return {
    type: constants.DECREMENT_ENTHUSIASM
  };
}
// dispach触发action，通过type映射，把dispach的值挂在action对象上
export function setUserBirth(value: string): SETUSERBIRTHDAY {
  return {
    type: "setuserbirthday",
    userBithday: value
  };
}
