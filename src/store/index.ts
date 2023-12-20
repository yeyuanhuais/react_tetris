import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import clearLinesReducer, { ClearLinesState } from "./clearLines";
import curReducer, { CurState } from "./cur";
import dropReducer, { DropState } from "./drop";
import focusReducer, { FocusState } from "./focus";
import keyboardReducer, { KeyboardState } from "./keyboard";
import lockReducer, { LockState } from "./lock";
import matrixReducer, { MatrixState } from "./matrix";
import maxReducer, { MaxState } from "./max";
import musicReducer, { MusicState } from "./music";
import nextReducer, { NextState } from "./next";
import pauseReducer, { PauseState } from "./pause";
import pointsReducer, { PointsState } from "./points";
import resetReducer, { ResetState } from "./reset";
import speedRunReducer, { SpeedRunState } from "./speedRun";
import speedStartReducer, { SpeedStartState } from "./speedStart";
import startLinesReducer, { StartLinesState } from "./startLines";
const reducer = combineReducers({
  clearLines: clearLinesReducer,
  cur: curReducer,
  drop: dropReducer,
  focus: focusReducer,
  keyboard: keyboardReducer,
  lock: lockReducer,
  matrix: matrixReducer,
  max: maxReducer,
  music: musicReducer,
  next: nextReducer,
  pause: pauseReducer,
  reset: resetReducer,
  points: pointsReducer,
  speedRun: speedRunReducer,
  speedStart: speedStartReducer,
  startLines: startLinesReducer,
});

const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage,
    },
    reducer,
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        //忽略了 Redux Persist 调度的所有操作类型。这样做是为了在浏览器控制台读取a non-serializable value was detected in the state时不会出现错误。
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;
// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export interface StoreReducer {
  clearLines: ClearLinesState;
  cur: CurState;
  drop: DropState;
  focus: FocusState;
  keyboard: KeyboardState;
  lock: LockState;
  matrix: MatrixState;
  max: MaxState;
  music: MusicState;
  points: PointsState;
  next: NextState;
  pause: PauseState;
  reset: ResetState;
  speedRun: SpeedRunState;
  speedStart: SpeedStartState;
  startLines: StartLinesState;
}
