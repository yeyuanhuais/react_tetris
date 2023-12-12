import store from "@/store";
import { changeClearLines } from "@/store/clearLines";
import { changeCur } from "@/store/cur";
import { changeFocus } from "@/store/focus";
import { changeLock } from "@/store/lock";
import { changeMatrix } from "@/store/matrix";
import { changeMax } from "@/store/max";
import { changeNext } from "@/store/next";
import { changePause } from "@/store/pause";
import { changePoints } from "@/store/points";
import { changeReset } from "@/store/reset";
import { changeSpeedRun } from "@/store/speedRun";
import { getNextType, isClear, isOver, want } from "@/unit";
import { blankLine, blankMatrix, clearPoints, eachLines, speeds } from "@/unit/const";
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

const dispatch = store.dispatch;
const {
  speedStart: speedStartState,
  startLines: startLinesState,
  next: nextState,
  cur: curState,
  matrix: matrixState,
  speedRun: speedRunState,
  points: pointsState,
  reset: resetState,
  pause: pauseState,
  clearLines: clearLinesState,
  max: maxState,
} = store.getState();

export const states = {
  //自动下落setTimeout变量
  fallInterval: undefined as NodeJS.Timeout | undefined,
  nextInterval: undefined as NodeJS.Timeout | undefined,
  // 游戏开始
  start: async () => {
    const musicData = await music();
    if (musicData) {
      musicData.start();
    }
    states.dispatchPoints(0);
    dispatch(changeSpeedRun(speedStartState));
    const startMatrix = getStartMatrix(startLinesState);
    dispatch(changeMatrix(startMatrix));
    dispatch(changeCur({ type: nextState }));
    dispatch(changeNext());
    states.auto();
  },
  /* 自动下落 */
  auto: (timeout?: number) => {
    const out = !timeout || timeout < 0 ? 0 : timeout;
    const fall = () => {
      const next = curState ? curState.fall() : { type: getNextType(), xy: List([]), shape: List(List([])) };
      if (want(next, matrixState)) {
        dispatch(changeCur({ type: next.type ?? "" }));
        states.fallInterval = setTimeout(fall, speeds[speedRunState - 1]);
      } else {
        let matrix = matrixState;
        const { shape, xy } = curState;
        shape.forEach((m: any[], k1: any) => {
          m.forEach((n: any, k2: any) => {
            if (n && xy.get(0) + k1 >= 0) {
              let line = matrix.get(xy.get(0) + k1);
              line = line.set(xy.get(1) + k2, 1);
              matrix = matrix.set(xy.get(0) + k1, line);
            }
          });
        });
        states.nextAround(matrix);
      }
    };
    clearTimeout(states.fallInterval);
    states.fallInterval = setTimeout(fall, !out ? speeds[speedRunState - 1] : out);
  },
  /* 一个方块结束触发下一个 */
  nextAround: async (matrix: List<List<number>>, stopDownTrigger: () => void) => {
    clearTimeout(states.nextInterval);
    dispatch(changeLock(true));
    dispatch(changeMatrix(matrix));
    if (typeof stopDownTrigger === "function") {
      stopDownTrigger();
    }
    // 速度越快，得分越高
    const addPoints = pointsState + 10 + (speedRunState - 1) * 2;
    states.dispatchPoints(addPoints);
    const musicData = await music();
    if (isClear(matrix)) {
      if (musicData) {
        musicData.clear();
      }
      return;
    }
    if (isOver(matrix)) {
      if (musicData) {
        musicData.gameOver();
      }
      states.overStart();
      return;
    }
    setTimeout(() => {
      dispatch(changeLock(false));
      dispatch(changeCur({ type: nextState }));
      dispatch(changeNext());
      states.auto();
    }, 100);
  },
  /* 页面焦点变换 */
  focus: (isFocus: boolean) => {
    dispatch(changeFocus(isFocus));
    if (!isFocus) {
      clearTimeout(states.fallInterval);
      return;
    }
    if (curState && !resetState && !pauseState) {
      states.auto();
    }
  },
  /* 暂停 */
  pause: (isPause: boolean) => {
    dispatch(changePause(isPause));
    if (!isPause) {
      clearTimeout(states.fallInterval);
      return;
    }
    states.auto();
  },
  /* 消除行 */
  clearLines: (matrix: any, lines: any[]) => {
    let newMatrix = matrix;
    lines.forEach((n) => {
      newMatrix = newMatrix.splice(n, 1);
      newMatrix = newMatrix.unshift(List(blankLine));
    });
    dispatch(changeMatrix(newMatrix));
    dispatch(changeCur({ type: nextState }));
    dispatch(changeNext());
    states.auto();
    dispatch(changeLock(false));
    const clearLines = clearLinesState + lines.length;
    dispatch(changeClearLines(clearLines));
    // 一次消除的行越多，加分越多
    const addPoints = pointsState + clearPoints[lines.length - 1];
    states.dispatchPoints(addPoints);
    // 消除行数，增加对应速度
    const speedAdd = Math.floor(clearLines / eachLines);
    let speedNow = speedStartState + speedAdd;
    speedNow = speedNow > 6 ? 6 : speedNow;
    dispatch(changeSpeedRun(speedNow));
  },
  // 游戏结束, 触发动画
  overStart: () => {
    clearTimeout(states.fallInterval);
    dispatch(changeLock(true));
    dispatch(changeReset(true));
    dispatch(changePause(false));
  },

  // 游戏结束动画完成
  overEnd: () => {
    dispatch(changeMatrix(blankMatrix));
    dispatch(changeCur({ reset: true }));
    dispatch(changeReset(false));
    dispatch(changeLock(false));
    dispatch(changeClearLines(0));
  },

  // 写入分数
  dispatchPoints: (point: number) => {
    // 写入分数, 同时判断是否创造最高分
    dispatch(changePoints(point));
    if (point > 0 && point > maxState) {
      dispatch(changeMax(point));
    }
  },
};
