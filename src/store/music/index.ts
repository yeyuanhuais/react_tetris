import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
// 定义 slice state 的类型
export interface MusicState {
  value: number;
}

// 使用该类型定义初始 state
const initialState: MusicState = {
  value: 0,
};
export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { incrementByAmount } = musicSlice.actions;

export default musicSlice.reducer;
