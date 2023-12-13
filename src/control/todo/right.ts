import store from "@/store";
import { changeCur } from "@/store/cur";
import { changeKeyRight } from "@/store/keyboard";
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
  dispatch(changeKeyRight(true));
  event.down({
    key: "right",
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
      if (cur !== null) {
        if (pauseState) {
          states.pause(false);
          return;
        }
        const next = cur.right();
        const delay = delays[speedRunState - 1];
        let timeStamp;
        if (want(next, matrixState)) {
          next.timeStamp += delay;
          dispatch(changeCur(next));
          timeStamp = next.timeStamp;
        } else {
          cur.timeStamp += delay / 1.5; // 真实移动delay多一点，碰壁delay少一点
          dispatch(changeCur(cur));
          timeStamp = cur.timeStamp;
        }
        const remain = speeds[speedRunState - 1] - (Date.now() - timeStamp);
        states.auto(remain);
      } else {
        let speed = speedStartState;
        speed = speed + 1 > 6 ? 1 : speed + 1;
        dispatch(changeSpeedStart(speed));
      }
    },
  });
};

const up = () => {
  store.dispatch(changeKeyRight(false));
  event.up({
    key: "right",
  });
};

export default {
  down,
  up,
};
