import Block from "@/unit/block";
import { lastRecord, curPoint } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { List } from "immutable";
// 定义 slice state 的类型
export interface CurState {
  value: number;
}
// 使用该类型定义初始 state
const initialState: CurState = {
  value: (() => {
    if (!lastRecord || !lastRecord.cur) {
      return null;
    }
    const { cur } = lastRecord;
    const option = {
      type: cur.type,
      rotateIndex: cur.rotateIndex,
      shape: List(cur.shape.map((e) => List(e))),
      xy: cur.xy,
    };
    return new Block(option);
  })(),
};
export const curSlice = createSlice({
  name: "cur",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeCur: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeCur } = curSlice.actions;

export default curSlice.reducer;
