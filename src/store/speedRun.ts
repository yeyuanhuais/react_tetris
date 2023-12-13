import { lastRecord } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export type SpeedRunState = number;

// 使用该类型定义初始 state
let initialState: number = lastRecord && lastRecord.speedStart ? lastRecord.speedStart : 1;
if (initialState < 1 || initialState > 6) {
  initialState = 1;
}
export const speedRunSlice = createSlice({
  name: "speedRun",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeSpeedRun: (state, action: PayloadAction<SpeedRunState>) => {
      return action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeSpeedRun } = speedRunSlice.actions;

export default speedRunSlice.reducer;
