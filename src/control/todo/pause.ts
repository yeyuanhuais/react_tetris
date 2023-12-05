import event from "@/unit/event";
import {states} from "../states";
import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { StoreReducer } from "@/store";
import { changePause } from "@/store/pause";

const dispatch = useAppDispatch();
const {
  cur: curState,
  pause: pauseState,
  lock: lockState,
} = useAppSelector((state: StoreReducer) => state);
const down = () => {
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
  dispatch(changePause(false));
  event.up({
    key: "pause",
  });
};

export default {
  down,
  up,
};
