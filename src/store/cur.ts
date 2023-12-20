import { getNextType } from "@/unit";
import Block from "@/unit/block";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// 定义 slice state 的类型
export type CurType = "I" | "L" | "J" | "Z" | "S" | "T" | "O";
export interface CurAction {
  type: CurType;
  rotateIndex: number;
}
export type CurState = Block | null;
// 使用该类型定义初始 state
const initialState: CurState = null;
export const curSlice = createSlice({
  name: "cur",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeCur: (state, action: PayloadAction<{ type?: CurType; reset?: boolean }>) => {
      return action.payload.reset === true ? null : new Block({ ...action.payload, type: action.payload.type ?? getNextType() });
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeCur } = curSlice.actions;

export default curSlice.reducer;
