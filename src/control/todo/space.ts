import { want } from '@/unit';
import event from '@/unit/event';
import {states} from '../states';
import { music } from '@/unit/music';
import { useAppDispatch, useAppSelector } from '@/hook/storeHook';
import { StoreReducer } from '@/store';
import { changeKeyDrop } from '@/store/keyboard';
import { changeDrop } from '@/store/drop';
import { changeCur } from '@/store/cur';

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
  dispatch(changeKeyDrop(true));
  event.down({
    key: 'space',
    once: true,
    callback: () => {
      if (lockState) {
        return;
      }
      const cur = curState;
      if (cur !== null) { // 置底
        if (pauseState) {
          states.pause(false);
          return;
        }
        if (music.fall) {
          music.fall();
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
        shape.forEach((m, k1) => (
          m.forEach((n, k2) => {
            if (n && xy[0] + k1 >= 0) { // 竖坐标可以为负
              let line = matrix.get(xy[0] + k1);
              line = line.set(xy[1] + k2, 1);
              matrix = matrix.set(xy[0] + k1, line);
            }
          })
        ));
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

const up = (store) => {
  dispatch(changeKeyDrop(false));
  event.up({
    key: 'space',
  });
};

export default {
  down,
  up,
};