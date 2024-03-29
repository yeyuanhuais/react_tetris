import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export type ResetState = boolean;

// 使用该类型定义初始 state
const initialState: ResetState = false;
export const resetSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeReset: (state, action: PayloadAction<ResetState>) => {
      return action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeReset } = resetSlice.actions;

export default resetSlice.reducer;
