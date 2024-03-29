import { getNextType } from "@/unit";
import { createSlice } from "@reduxjs/toolkit";
import { CurType } from "./cur";
// 定义 slice state 的类型
export type NextState = CurType;

// 使用该类型定义初始 state
const initialState: NextState = getNextType();
export const nextSlice = createSlice({
  name: "next",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeNext: () => {
      return getNextType();
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeNext } = nextSlice.actions;

export default nextSlice.reducer;
