import { lastRecord } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export type PauseState =boolean

// 使用该类型定义初始 state
const initialState: PauseState = lastRecord && lastRecord.pause ? !!lastRecord.pause : false;
export const pauseSlice = createSlice({
  name: "pause",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changePause: (state, action: PayloadAction<PauseState>) => {
      return action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changePause } = pauseSlice.actions;

export default pauseSlice.reducer;
