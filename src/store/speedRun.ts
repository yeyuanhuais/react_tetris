import { lastRecord } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export interface SpeedRunState {
  value: number;
}

// 使用该类型定义初始 state
const initialState: SpeedRunState = lastRecord && !isNaN(parseInt(lastRecord.speedRun, 10)) ? parseInt(lastRecord.speedRun, 10) : 1;
if (initialState < 1 || initialState > 6) {
  initialState = 1;
}
export const speedRunSlice = createSlice({
  name: "speedRun",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeSpeedRun: (state, action: PayloadAction<number>) => {
      state = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeSpeedRun } = speedRunSlice.actions;

export default speedRunSlice.reducer;
