import { isFocus } from "@/unit";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export type FocusState =boolean

// 使用该类型定义初始 state
const initialState: FocusState = isFocus();
export const focusSlice = createSlice({
  name: "focus",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeFocus: (state, action: PayloadAction<FocusState>) => {
      state = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeFocus } = focusSlice.actions;

export default focusSlice.reducer;
