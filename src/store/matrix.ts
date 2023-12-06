import { blankMatrix, lastRecord } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { List } from "immutable";
// 定义 slice state 的类型
export type MatrixState =List<List<number>>;

// 使用该类型定义初始 state
const initialState: MatrixState = lastRecord && Array.isArray(lastRecord.matrix) ? List(lastRecord.matrix.map((e) => List(e))) : blankMatrix;

export const matrixSlice = createSlice({
  name: "matrix",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeMatrix: (state, action: PayloadAction<MatrixState>) => {
      state = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeMatrix } = matrixSlice.actions;

export default matrixSlice.reducer;
