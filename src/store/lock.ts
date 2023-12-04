import { lastRecord } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export interface LockState {
  value: boolean;
}

// 使用该类型定义初始 state
const initialState: LockState = {
  value: lastRecord && lastRecord.lock  ? !!lastRecord.lock : false,
};
export const lockSlice = createSlice({
  name: "lock",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeLock: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeLock } = lockSlice.actions;

export default lockSlice.reducer;
