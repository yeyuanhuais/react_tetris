import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { StoreReducer } from "@/store";
import { changeCur } from "@/store/cur";
import { changeKeyRotate } from "@/store/keyboard";
import { changeStartLines } from "@/store/startLines";
import { want } from "@/unit";
import event from "@/unit/event";
import { music } from "@/unit/music";
import { states } from "../states";

const dispatch = useAppDispatch();
const {
  startLines: startLinesState,
  cur: curState,
  matrix: matrixState,
  pause: pauseState,
  lock: lockState,
} = useAppSelector((state: StoreReducer) => state);
const down = () => {
  dispatch(changeKeyRotate(true));
  if (curState !== null) {
    event.down({
      key: "rotate",
      once: true,
      callback: () => {
        if (lockState) {
          return;
        }
        if (pauseState) {
          states.pause(false);
        }
        const cur = curState;
        if (cur === null) {
          return;
        }
        if (music.rotate) {
          music.rotate();
        }
        const next = cur.rotate();
        if (want(next, matrixState)) {
          dispatch(changeCur(next));
        }
      },
    });
  } else {
    event.down({
      key: "rotate",
      begin: 200,
      interval: 100,
      callback: () => {
        if (lockState) {
          return;
        }
        if (music.move) {
          music.move();
        }
        const cur = curState;
        if (cur) {
          return;
        }
        let startLines = startLinesState;
        startLines = startLines + 1 > 10 ? 0 : startLines + 1;
        dispatch(changeStartLines(startLines));
      },
    });
  }
};

const up = () => {
  dispatch(changeKeyRotate(false));
  event.up({
    key: "rotate",
  });
};

export default {
  down,
  up,
};
