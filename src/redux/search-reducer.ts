import { Action, AnyAction, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppStateType } from "./redux-store";
import { API } from "../api/api";

export type ResultType = {
  total: number;
  result: Array<ResultElsType>;
};
type ResultElsType = {
  date: string;
  id: string;
  url: string;
  text: string;
};

//вспомогательный тип InferActionsTypes, который из объекта экшн криэторов создаёт типы для этих экшн криеэторов
type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>;

export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;

//общий тип для thunk
export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;

//общий тип для thunk
type ThunkType = BaseThunkType<ActionsTypes>;

//стартовые данные
let initialState = {
  isLoad: false,
  totalCoun: -1,
  elements: [] as Array<ResultElsType>,
};

type InitialStateType = typeof initialState;

const searchReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "CHUCK/SEARCH": {
      return {
        ...state,
        totalCoun: action.data.total,
        elements: action.data.result,
      };
    }
    case "CHUCK/ISLOADING": {
      return {
        ...state,
        isLoad: action.flag,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setSearchedEls: (data: ResultType) =>
    ({ type: "CHUCK/SEARCH", data } as const),
  seSearchtLoad: (flag: boolean) =>
    ({ type: "CHUCK/ISLOADING", flag } as const),
};

export const getSearchResult =
  (searchStr: string): ThunkType =>
  async (dispatch: Dispatch<ActionsTypes>) => {
    //включаю крутилку
    dispatch(actions.seSearchtLoad(true));

    //делаю запрос по апи
    let data = await API.search(searchStr);
    dispatch(actions.setSearchedEls(data));

    //выключаю крутилку
    dispatch(actions.seSearchtLoad(false));
  };

export default searchReducer;
