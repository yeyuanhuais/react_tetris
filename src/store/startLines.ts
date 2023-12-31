
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export type StartLinesState = number;

// 使用该类型定义初始 state
let initialState: StartLinesState =  0;

if (initialState < 0 || initialState > 10) {
  initialState = 0;
}
export const startLinesSlice = createSlice({
  name: "startLines",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeStartLines: (state, action: PayloadAction<StartLinesState>) => {
      return action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeStartLines } = startLinesSlice.actions;

export default startLinesSlice.reducer;
