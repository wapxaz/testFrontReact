import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { thunk as thunkMiddleware } from "redux-thunk";
import searchReducer from "./search-reducer";

//файл настроек store REDUX

let rootReducer = combineReducers({
  serarch: searchReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

//через эти 2 строчки подключаю редакс для расширения в хроме
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
