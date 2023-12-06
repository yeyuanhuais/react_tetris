import { lastRecord } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export type DropState =boolean

// 使用该类型定义初始 state
const initialState: DropState = lastRecord && lastRecord.drop ? !!lastRecord.drop : false;
export const dropSlice = createSlice({
  name: "drop",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeDrop: (state, action: PayloadAction<DropState>) => {
      state = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeDrop } = dropSlice.actions;

export default dropSlice.reducer;
