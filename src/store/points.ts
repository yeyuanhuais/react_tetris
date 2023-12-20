import {  maxPoint } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export type PointsState = number;

// 使用该类型定义初始 state
let initialState: PointsState =  0;
if (initialState < 0) {
  initialState = 0;
} else if (initialState > maxPoint) {
  initialState = maxPoint;
}
export const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changePoints: (state, action: PayloadAction<PointsState>) => {
      return action.payload > maxPoint ? maxPoint : action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changePoints } = pointsSlice.actions;

export default pointsSlice.reducer;
