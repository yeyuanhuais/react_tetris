
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export type SpeedStartState = number;

// 使用该类型定义初始 state
let initialState: number =  1;
if (initialState < 1 || initialState > 6) {
  initialState = 1;
}
export const speedStartSlice = createSlice({
  name: "speedStart",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeSpeedStart: (state, action: PayloadAction<SpeedStartState>) => {
      return action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeSpeedStart } = speedStartSlice.actions;

export default speedStartSlice.reducer;
