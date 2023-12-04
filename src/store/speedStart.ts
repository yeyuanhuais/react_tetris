import { lastRecord } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export interface SpeedStartState {
  value: number;
}

// 使用该类型定义初始 state
const initialState: SpeedStartState = {
  value: lastRecord && !isNaN(parseInt(lastRecord.speedStart, 10)) ? parseInt(lastRecord.speedStart, 10) : 1,
};
if (initialState.value < 1 || initialState.value > 6) {
  initialState.value = 1;
}
export const speedStartSlice = createSlice({
  name: "speedStart",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeSpeedStart: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeSpeedStart } = speedStartSlice.actions;

export default speedStartSlice.reducer;
