import store from "@/store";
import { changeCur } from "@/store/cur";
import { changeDrop } from "@/store/drop";
import { changeKeyDrop } from "@/store/keyboard";
import { want } from "@/unit";
import event from "@/unit/event";
import { music } from "@/unit/music";
import { states } from "../states";

const down = () => {
  const dispatch = store.dispatch;
  const { cur: curState, matrix: matrixState, pause: pauseState, lock: lockState } = store.getState();
  dispatch(changeKeyDrop(true));
  event.down({
    key: "space",
    once: true,
    callback: async() => {
      if (lockState) {
        return;
      }
      const cur = curState;
      if (cur !== null) {
        // 置底
        if (pauseState) {
          states.pause(false);
          return;
        }const musicData = await music();
        if (musicData) {
          musicData.fall();
        }
        let index = 0;
        let bottom = cur.fall(index);
        while (want(bottom, matrixState)) {
          bottom = cur.fall(index);
          index++;
        }
        let matrix = matrixState;
        bottom = cur.fall(index - 2);
        dispatch(changeCur(bottom));
        const shape = bottom.shape;
        const xy = bottom.xy;
        shape.forEach((m, k1) =>
          m.forEach((n, k2) => {
            if (n && xy[0] + k1 >= 0) {
              // 竖坐标可以为负
              let line = matrix[xy[0] + k1];
              line[xy[1] + k2] = 1;
              matrix[xy[0] + k1] = line;
            }
          }),
        );
        dispatch(changeDrop(true));
        setTimeout(() => {
          dispatch(changeDrop(false));
        }, 100);
        states.nextAround(matrix);
      } else {
        states.start();
      }
    },
  });
};

const up = () => {
  store.dispatch(changeKeyDrop(false));
  event.up({
    key: "space",
  });
};

export default {
  down,
  up,
};
