import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { StoreReducer } from "@/store";
import { changePoints } from "@/store/points";
import { changeSpeedRun } from "@/store/speedRun";
import { blankLine } from "@/unit/const";
import { music } from "@/unit/music";
import { List } from "immutable";
/* 生成getStartMatrix */
const getStartMatrix = (startLines: number) => {
  // 返回标亮个数在min-max之间一行方块，包含边界
  const getLine = (min: number, max: number) => {
    const count = (max - min + 1) * Math.random() + min;
    const line = [];
    // 插入高亮
    for (let i = 0; i < count; i++) {
      line.push(1);
    }
    // 在随机位置插入灰色
    for (let i = 0, len = 10 - count; i < len; i++) {
      const index = (line.length + 1) * Math.random();
      line.splice(index, 0, 0);
    }
    return List(line);
  };
  let startMatrix = List<List<number>>([]);
  for (let i = 0; i < startLines; i++) {
    if (i <= 2) {
      startMatrix = startMatrix.push(getLine(5, 8));
    } else if (i <= 6) {
      startMatrix = startMatrix.push(getLine(4, 9));
    } else {
      startMatrix = startMatrix.push(getLine(3, 9));
    }
  }
  for (let i = 0, len = 20 - startLines; i < len; i++) {
    startMatrix = startMatrix.unshift(List(blankLine));
  }
  return startMatrix;
};

const dispatch = useAppDispatch();
const speedStartState = useAppSelector((state: StoreReducer) => state.speedStart.value);
const startLinesState = useAppSelector((state: StoreReducer) => state.startLines.value);
export const states = {
  //自动下落setTimeout变量
  fallInterval: null,
  // 游戏开始
  start: () => {
    if (music.start) {
      music.start();
    }
    dispatch(changePoints(0));
    dispatch(changeSpeedRun(speedStartState));
  },
};
