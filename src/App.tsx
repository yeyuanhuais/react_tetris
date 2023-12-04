import "@/App.css";
import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { useResize } from "@/hook/useResize";
import { StoreReducer } from "@/store";
import { useEffect, useState } from "react";
import { changeFocus } from "./store/focus";
import { isFocus, visibilityChangeEvent } from "./unit";
import { lastRecord, speeds } from "./unit/const";
import { states } from "./control/state";

function App(props) {
  const [count, setCount] = useState(0);
  const music = useAppSelector((state: StoreReducer) => state.music.value);
  const dispatch = useAppDispatch();
  const [width, height] = useResize();
  useEffect(() => {
    if (visibilityChangeEvent) {
      document.addEventListener(
        visibilityChangeEvent,
        () => {
          dispatch(changeFocus(isFocus()));
        },
        false
      );
    }
    if (lastRecord) {
      // 读取记录
      if (lastRecord.cur && !lastRecord.pause) {
        // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
        const speedRun = props.speedRun;
        // 继续时, 给予当前下落速度一半的停留时间
        let timeout = speeds[speedRun - 1] / 2;
        // 停留时间不小于最快速的速度
        timeout = speedRun < speeds[speeds.length - 1] ? speeds[speeds.length - 1] : speedRun;
        states.auto(timeout);
      }
      if (!lastRecord.cur) {
        states.overStart();
      } else {
        states.overEnd();
      }
    }
    return document.removeEventListener(
      visibilityChangeEvent,
      () => {
        dispatch(changeFocus(isFocus()));
      },
      false
    );
  }, []);
  return <></>;
}

export default App;
