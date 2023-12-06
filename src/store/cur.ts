import Block from "@/unit/block";
import { lastRecord } from "@/unit/const";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { List } from "immutable";
// 定义 slice state 的类型
export type CurType = "I" | "L" | "J" | "Z" | "S" | "T" | "O";
export interface CurState {
  type: CurType;
  rotateIndex: number;
  timeStamp?: number;
  shape: List<unknown>;
  xy: List<unknown>;
  reset: boolean;
}
// 使用该类型定义初始 state
const initialState: CurState = (() => {
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
  let block = new Block(option);
  return block;
})();
export const curSlice = createSlice({
  name: "cur",
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    changeCur: (state, action: PayloadAction<CurState>) => {
      state = action.payload.reset === true ? null : new Block(action.payload);
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { changeCur } = curSlice.actions;

export default curSlice.reducer;
