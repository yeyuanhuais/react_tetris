import { lastRecord, maxPoint } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export interface PointsState {
  value: number;
}

// 使用该类型定义初始 state
const initialState: PointsState = {
  value: lastRecord && isNaN(parseInt(lastRecord.points, 10)) ? parseInt(lastRecord.points, 10) : 0,
};
if (initialState.value < 0) {
  initialState.value = 0;
} else if (initialState.value > maxPoint) {
  initialState.value = maxPoint;
}
export const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changePoints: (state, action: PayloadAction<number>) => {
      state.value = action.payload > maxPoint ? maxPoint : action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changePoints } = pointsSlice.actions;

export default pointsSlice.reducer;
