import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { StoreReducer } from "@/store";
import { changeCur } from "@/store/cur";
import { changeKeyDown } from "@/store/keyboard";
import { changeStartLines } from "@/store/startLines";
import event from "@/unit/event";
import { music } from "@/unit/music";
import { states } from "../states";

const dispatch = useAppDispatch();
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
  lock: lockState,
} = useAppSelector((state: StoreReducer) => state);
const down = () => {
  dispatch(changeKeyDown(true));
  if (curState) {
    event.down({
      key: "down",
      begin: 40,
      interval: 40,
      callback: (stopDownTrigger) => {
        if (lockState) {
          return;
        }
        if (music.move) {
          music.move();
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
          shape.forEach((m, k1) => {
            m.forEach((n, k2) => {
              if (n && xy.get(0) + k1 >= 0) {
                let line = matrix.get(xy.get(0) + k1);
                line = line.set(xy.get(1) + k2, 1);
                matrix = matrix.set(xy.get(0) + k1, line);
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
      callback: () => {
        if (lockState) return;
        if (curState) return;
        if (music.move) {
          music.move();
        }
        let startLines = startLinesState - 1 < 0 ? 10 : startLinesState - 1;
        dispatch(changeStartLines(startLines));
      },
    });
  }
};
const up = () => {
  dispatch(changeKeyDown(false));
  event.up({
    key: "down",
  });
};

export default {
  down,
  up,
};
