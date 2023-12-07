import { lastRecord } from "@/unit/const";
import { hasWebAudioAPI } from "@/unit/music";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// 定义 slice state 的类型
export type MusicState = boolean;

// 使用该类型定义初始 state
let initialState: MusicState = lastRecord && lastRecord.music ? !!lastRecord.music : true;
export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeMusic: (state, action: PayloadAction<MusicState>) => {
      if (!hasWebAudioAPI) {
        state = false;
      }
      state = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeMusic } = musicSlice.actions;

export default musicSlice.reducer;
