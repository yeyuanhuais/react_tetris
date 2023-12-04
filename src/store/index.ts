import { configureStore } from "@reduxjs/toolkit";
import focusReducer, { FocusState } from "./focus";
import musicReducer, { MusicState } from "./music";
import pointsReducer, { PointsState } from "./points";
import speedRunReducer, { SpeedRunState } from "./speedRun";
import speedStartReducer, { SpeedStartState } from "./speedStart";
import startLinesReducer, { StartLinesState } from "./startLines";

const store = configureStore({
  reducer: {
    music: musicReducer,
    points: pointsReducer,
    focus: focusReducer,
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
  music: MusicState;
  points: PointsState;
  focus: FocusState;
  speedRun: SpeedRunState;
  speedStart: SpeedStartState;
  startLines: StartLinesState;
}
