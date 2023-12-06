import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type KeyBoolean = boolean;
// 定义 slice state 的类型
export interface KeyboardState {
  down: KeyBoolean;
  drop: KeyBoolean;
  left: KeyBoolean;
  music: KeyBoolean;
  pause: KeyBoolean;
  reset: KeyBoolean;
  right: KeyBoolean;
  rotate: KeyBoolean;
}

// 使用该类型定义初始 state
const initialState: KeyboardState = { down: false, drop: false, left: false, music: false, pause: false, reset: false, right: false, rotate: false };
export const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeKeyDown: (state, action: PayloadAction<KeyBoolean>) => {
      state.down = action.payload;
    },
    changeKeyDrop: (state, action: PayloadAction<KeyBoolean>) => {
      state.drop = action.payload;
    },
    changeKeyLeft: (state, action: PayloadAction<KeyBoolean>) => {
      state.left = action.payload;
    },
    changeKeyMusic: (state, action: PayloadAction<KeyBoolean>) => {
      state.music = action.payload;
    },
    changeKeyPause: (state, action: PayloadAction<KeyBoolean>) => {
      state.pause = action.payload;
    },
    changeKeyReset: (state, action: PayloadAction<KeyBoolean>) => {
      state.reset = action.payload;
    },
    changeKeyRight: (state, action: PayloadAction<KeyBoolean>) => {
      state.right = action.payload;
    },
    changeKeyRotate: (state, action: PayloadAction<KeyBoolean>) => {
      state.rotate = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeKeyDown, changeKeyDrop, changeKeyLeft, changeKeyMusic, changeKeyPause, changeKeyReset, changeKeyRight, changeKeyRotate } =
  keyboardSlice.actions;

export default keyboardSlice.reducer;
