import store from "@/store";
import { changeCur } from "@/store/cur";
import { changeKeyRotate } from "@/store/keyboard";
import { changeStartLines } from "@/store/startLines";
import { want } from "@/unit";
import event from "@/unit/event";
import { music } from "@/unit/music";
import { states } from "../states";

const down = async () => {
  const dispatch = store.dispatch;
  const { startLines: startLinesState, cur: curState, matrix: matrixState, pause: pauseState, lock: lockState } = store.getState();
  dispatch(changeKeyRotate(true));
  if (curState !== null) {
    event.down({
      key: "rotate",
      once: true,
      callback: async () => {
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
        const musicData = await music();
        if (musicData) {
          musicData.rotate();
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
      callback: async () => {
        if (lockState) {
          return;
        }
        const musicData = await music();
        if (musicData) {
          musicData.move();
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
  store.dispatch(changeKeyRotate(false));
  event.up({
    key: "rotate",
  });
};

export default {
  down,
  up,
};
