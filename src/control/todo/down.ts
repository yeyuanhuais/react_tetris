import { states } from "@/control/states";
import store from "@/store";
import { changeCur } from "@/store/cur";
import { changeKeyDown } from "@/store/keyboard";
import { changeStartLines } from "@/store/startLines";
import { want } from "@/unit";
import event from "@/unit/event";
import { music } from "@/unit/music";

const down = () => {
  const dispatch = store.dispatch;
  const { startLines: startLinesState, cur: curState, matrix: matrixState, pause: pauseState, lock: lockState } = store.getState();
  dispatch(changeKeyDown(true));
  if (curState) {
    event.down({
      key: "down",
      begin: 40,
      interval: 40,
      callback: async (stopDownTrigger: any) => {
        if (lockState) {
          return;
        }
        const musicData = await music();
        if (musicData) {
          musicData.move();
        }
        if (!curState) {
          return;
        }
        if (pauseState) {
          states.pause(false);
          return;
        }
        const next = curState.fall();
        if (want(next, matrixState)) {
          dispatch(changeCur(next));
          states.auto();
        } else {
          let matrix = matrixState;
          const { shape, xy } = curState;
          shape.forEach((m: any[], k1: any) => {
            m.forEach((n: any, k2: any) => {
              if (n && xy[0] + k1 >= 0) {
                let line = matrix[xy[0] + k1];
                line[xy[1] + k2] = 1;
                matrix[xy[0] + k1] = line;
              }
            });
          });
          states.nextAround(matrix, stopDownTrigger);
        }
      },
    });
  } else {
    event.down({
      key: "down",
      begin: 200,
      interval: 100,
      callback: async () => {
        if (lockState) return;
        if (curState) return;
        const musicData = await music();
        if (musicData) {
          musicData.move();
        }
        let startLines = startLinesState - 1 < 0 ? 10 : startLinesState - 1;
        dispatch(changeStartLines(startLines));
      },
    });
  }
};
const up = () => {
  store.dispatch(changeKeyDown(false));
  event.up({
    key: "down",
  });
};

export default {
  down,
  up,
};
