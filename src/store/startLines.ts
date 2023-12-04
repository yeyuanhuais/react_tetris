import { lastRecord } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export interface StartLinesState {
  value: number;
}

// 使用该类型定义初始 state
const initialState: StartLinesState = {
  value: lastRecord && !isNaN(parseInt(lastRecord.startLines, 10)) ? parseInt(lastRecord.startLines, 10) : 0,
};
if (initialState.value < 0 || initialState.value > 10) {
  initialState.value = 0;
}
export const startLinesSlice = createSlice({
  name: "startLines",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeStartLines: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeStartLines } = startLinesSlice.actions;

export default startLinesSlice.reducer;
