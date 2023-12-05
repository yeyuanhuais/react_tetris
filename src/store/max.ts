import { lastRecord, maxPoint } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export interface MaxState {
  value: number;
}
const MaxData = 999999;
// 使用该类型定义初始 state
const initialState: MaxState = lastRecord && isNaN(parseInt(lastRecord.max, 10)) ? parseInt(lastRecord.max, 10) : 0;
if (initialState < 0) {
  initialState = 0;
} else if (initialState > maxPoint) {
  initialState = maxPoint;
}
export const maxSlice = createSlice({
  name: "max",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeMax: (state, action: PayloadAction<number>) => {
      state = action.payload > MaxData ? MaxData : action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeMax } = maxSlice.actions;

export default maxSlice.reducer;
