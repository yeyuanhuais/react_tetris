import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export interface KeyboardState {
  value: { down: boolean; drop: boolean; left: boolean; music: boolean; pause: boolean; reset: boolean; right: boolean; rotate: boolean };
}

// 使用该类型定义初始 state
const initialState: KeyboardState = {
  value: { down: false, drop: false, left: false, music: false, pause: false, reset: false, right: false, rotate: false },
};
export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeKeyDown: (state, action: PayloadAction<boolean>) => {
      state.value.down = action.payload;
    },
    changeKeyKeyboard: (state, action: PayloadAction<boolean>) => {
      state.value.drop = action.payload;
    },
    changeKeyLeft: (state, action: PayloadAction<boolean>) => {
      state.value.left = action.payload;
    },
    changeKeyMusic: (state, action: PayloadAction<boolean>) => {
      state.value.music = action.payload;
    },
    changeKeyPause: (state, action: PayloadAction<boolean>) => {
      state.value.pause = action.payload;
    },
    changeKeyReset: (state, action: PayloadAction<boolean>) => {
      state.value.reset = action.payload;
    },
    changeKeyRight: (state, action: PayloadAction<boolean>) => {
      state.value.right = action.payload;
    },
    changeKeyRotate: (state, action: PayloadAction<boolean>) => {
      state.value.rotate = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeKeyDown, changeKeyKeyboard, changeKeyLeft, changeKeyMusic, changeKeyPause, changeKeyReset, changeKeyRight, changeKeyRotate } =
  keyboardSlice.actions;

export default keyboardSlice.reducer;
