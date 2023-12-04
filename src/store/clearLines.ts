import { lastRecord, clearLinesPoint } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export interface ClearLinesState {
  value: number;
}
// 使用该类型定义初始 state
const initialState: ClearLinesState = {
  value: lastRecord && isNaN(parseInt(lastRecord.clearLines, 10)) ? parseInt(lastRecord.clearLines, 10) : 0,
};
if (initialState.value < 0) {
  initialState.value = 0;
}
export const clearLinesSlice = createSlice({
  name: "clearLines",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeClearLines: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeClearLines } = clearLinesSlice.actions;

export default clearLinesSlice.reducer;
