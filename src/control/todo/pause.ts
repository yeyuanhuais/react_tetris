import store from "@/store";
import { changePause } from "@/store/pause";
import event from "@/unit/event";
import { states } from "../states";

const down = () => {
  const dispatch = store.dispatch;
  const { cur: curState, pause: pauseState, lock: lockState } = store.getState();
  dispatch(changePause(true));
  event.down({
    key: "pause",
    once: true,
    callback: () => {
      if (lockState) {
        return;
      }
      const cur = curState;
      const isPause = pauseState;
      if (cur !== null) {
        // 暂停
        states.pause(!isPause);
      } else {
        // 新的开始
        states.start();
      }
    },
  });
};

const up = () => {
  store.dispatch(changePause(false));
  event.up({
    key: "pause",
  });
};

export default {
  down,
  up,
};
