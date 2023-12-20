
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export type ClearLinesState = number;
// 使用该类型定义初始 state
let initialState: ClearLinesState = 0;
if (initialState < 0) {
  initialState = 0;
}
export const clearLinesSlice = createSlice({
  name: "clearLines",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeClearLines: (state, action: PayloadAction<ClearLinesState>) => {
      return action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeClearLines } = clearLinesSlice.actions;

export default clearLinesSlice.reducer;
