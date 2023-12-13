import store from "@/store";
import { changeCur } from "@/store/cur";
import { changeKeyLeft } from "@/store/keyboard";
import { changeSpeedStart } from "@/store/speedStart";
import { want } from "@/unit";
import { delays, speeds } from "@/unit/const";
import event from "@/unit/event";
import { music } from "@/unit/music";
import { states } from "../states";

const down = () => {
  const dispatch = store.dispatch;
  const {
    speedStart: speedStartState,
    cur: curState,
    matrix: matrixState,
    speedRun: speedRunState,
    pause: pauseState,
    lock: lockState,
  } = store.getState();
  dispatch(changeKeyLeft(true));
  event.down({
    key: "left",
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
      if (!curState) {
        let speed = speedStartState - 1 < 1 ? 6 : speedStartState - 1;
        dispatch(changeSpeedStart(speed));
        return;
      }
      if (pauseState) {
        states.pause(false);
        return;
      }
      const next = curState.left();
      const delay = delays[speedRunState - 1];
      let timeStamp;
      if (want(next, matrixState)) {
        next.timeStamp += delay;
        dispatch(changeCur(next));
        timeStamp = next.timeStamp;
      } else {
        let cur = curState;
        cur.timeStamp += delay / 1.5;
        dispatch(changeCur(cur));
        timeStamp = cur.timeStamp;
      }
      const remain = speeds[speedRunState - 1] - (Date.now() - timeStamp);
      states.auto(remain);
    },
  });
};
const up = () => {
  store.dispatch(changeKeyLeft(false));
  event.up({
    key: "left",
  });
};

export default {
  down,
  up,
};
