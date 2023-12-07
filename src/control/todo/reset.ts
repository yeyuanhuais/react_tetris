import store from "@/store";
import { changeReset } from "@/store/reset";
import event from "@/unit/event";
import { states } from "../states";

const down = () => {
  const dispatch = store.dispatch;
  const { cur: curState, lock: lockState } = store.getState();
  dispatch(changeReset(true));
  if (lockState) {
    return;
  }
  if (curState !== null) {
    event.down({
      key: "reset",
      once: true,
      callback: () => {
        states.overStart();
      },
    });
  } else {
    event.down({
      key: "reset",
      once: true,
      callback: () => {
        if (lockState) {
          return;
        }
        states.start();
      },
    });
  }
};

const up = () => {
  store.dispatch(changeReset(false));
  event.up({
    key: "reset",
  });
};

export default {
  down,
  up,
};
