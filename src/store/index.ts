import { configureStore } from "@reduxjs/toolkit";
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

const store = configureStore({
  reducer: {
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
  },
});
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
