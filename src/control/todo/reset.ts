import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { StoreReducer } from "@/store";
import { changeReset } from "@/store/reset";
import event from "@/unit/event";
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
const down = (store) => {
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

const up = (store) => {
  dispatch(changeReset(false));
  event.up({
    key: "reset",
  });
};

export default {
  down,
  up,
};
