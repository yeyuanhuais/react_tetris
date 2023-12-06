import style from "@/App.module.less";
import Decorate from "@/components/decorate";
import Guide from "@/components/guide";
import Keyboard from "@/components/keyboard";
import Logo from "@/components/logo";
import Matrix from "@/components/matrix";
import Music from "@/components/music";
import Next from "@/components/next";
import Number from "@/components/number";
import Pause from "@/components/pause";
import Point from "@/components/point";
import { states } from "@/control/states";
import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { useResize } from "@/hook/useResize";
import { StoreReducer } from "@/store";
import { changeFocus } from "@/store/focus";
import { isFocus, visibilityChangeEvent } from "@/unit";
import { i18nData, lan, lastRecord, speeds } from "@/unit/const";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
interface CssProps {
  transform?: string;
  paddingTop?: number;
  paddingBottom?: number;
  marginTop?: number;
}
function App() {
  const [filling, setFilling] = useState(0);
  const [cssStyle, setCssStyle] = useState({});
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
    drop: dropState,
    keyboard: keyboardState,
    music: musicState,
  } = useAppSelector((state: StoreReducer) => state);
  const dispatch = useAppDispatch();
  const [width, height] = useResize();
  const handleVisibilityChange = () => {
    dispatch(changeFocus(isFocus()));
  };
  useEffect(() => {
    if (visibilityChangeEvent) {
      document.addEventListener(visibilityChangeEvent, handleVisibilityChange, false);
    }
    if (lastRecord) {
      // 读取记录
      if (lastRecord.cur && !lastRecord.pause) {
        // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
        const speedRun = speedRunState;
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
    return document.removeEventListener(visibilityChangeEvent as keyof DocumentEventMap, handleVisibilityChange, false);
  }, []);
  useEffect(() => {
    const w = width;
    const h = height;
    const ratio = w / h;
    let scale;
    let css: CssProps = {};
    if (ratio < 1.5) {
      scale = h / 960;
    } else {
      scale = w / 640;
      setFilling((h - 960 * scale) / scale / 3);
    }
    css.transform = `scale(${scale})`;
    setCssStyle(css);
  }, [width, height]);
  useEffect(() => {
    let css: CssProps = {};
    css = {
      paddingTop: Math.floor(filling) + 42,
      paddingBottom: Math.floor(filling),
      marginTop: Math.floor(-480 - filling * 1.5),
    };
    setCssStyle(css);
  }, [filling]);
  return (
    <div className={style.app} style={cssStyle}>
      <div className={classnames({ [style.react]: true, [style.drop]: dropState })}>
        <Decorate />
        <div className={style.screen}>
          <div className={style.panel}>
            <Matrix matrix={matrixState} cur={curState} reset={resetState} />
            <Logo cur={!!curState} reset={resetState} />
            <div className={style.state}>
              <Point cur={!!curState} point={pointsState} max={maxState} />
              <p>{curState ? i18nData.cleans[lan] : i18nData.startLine[lan]}</p>
              <Number number={curState ? clearLinesState : startLinesState} />
              <p>{i18nData.level[lan]}</p>
              <Number number={curState ? speedRunState : speedStartState} length={1} />
              <p>{i18nData.next[lan]}</p>
              <Next data={nextState} />
              <div className={style.bottom}>
                <Music data={musicState} />
                <Pause data={pauseState} />
                <Number time />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Keyboard filling={filling} keyboard={keyboardState} />
      <Guide />
    </div>
  );
}

export default React.memo(App);
