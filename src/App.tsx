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
import { useAppSelector } from "@/hook/storeHook";
import { useResize } from "@/hook/useResize";
import { StoreReducer } from "@/store";
import { isFocus, visibilityChangeEvent } from "@/unit/";
import { TransForm, i18nData, lan, speeds, transform } from "@/unit/const";
import classnames from "classnames";
import { memo, useCallback, useEffect, useState } from "react";

interface CssProps {
  paddingTop?: number;
  paddingBottom?: number;
  marginTop?: number;
  transform?: string;
  webkitTransform?: string;
  msTransform?: string;
  mozTransform?: string;
  oTransform?: string;
}
function App() {
  const speedRun = useAppSelector((state: StoreReducer) => state.speedRun);
  const pause = useAppSelector((state: StoreReducer) => state.pause);
  const music = useAppSelector((state: StoreReducer) => state.music);
  const drop = useAppSelector((state: StoreReducer) => state.drop);
  const cur = useAppSelector((state: StoreReducer) => state.cur);
  const matrix = useAppSelector((state: StoreReducer) => state.matrix);
  const reset = useAppSelector((state: StoreReducer) => state.reset);
  const points = useAppSelector((state: StoreReducer) => state.points);
  const max = useAppSelector((state: StoreReducer) => state.max);
  const clearLines = useAppSelector((state: StoreReducer) => state.clearLines);
  const speedStart = useAppSelector((state: StoreReducer) => state.speedStart);
  const startLines = useAppSelector((state: StoreReducer) => state.startLines);
  const keyboard = useAppSelector((state: StoreReducer) => state.keyboard);
  const next = useAppSelector((state: StoreReducer) => state.next);
  const [width, height] = useResize();
  const [filling, setFilling] = useState(0);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    if (visibilityChangeEvent) {
      // 将页面的焦点变换写入store
      document.addEventListener(
        visibilityChangeEvent,
        () => {
          states.focus(isFocus());
        },
        false,
      );
    }
  }, []);
  useEffect(() => {
    // 读取记录
    if (cur && !pause) {
      // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
      let timeout = speeds[speedRun - 1] / 2; // 继续时, 给予当前下落速度一半的停留时间
      // 停留时间不小于最快速的速度
      timeout = speedRun < speeds[speeds.length - 1] ? speeds[speeds.length - 1] : speedRun;
      states.auto(timeout);
    }
    if (!cur) {
      states.overStart();
    }
  }, [cur, pause, speedRun]);
  useEffect(() => {
    const w = width;
    const h = height;
    const ratio = h / w;
    let scale;
    if (ratio < 1.5) {
      scale = h / 960;
    } else {
      scale = w / 640;
      setFilling((h - 960 * scale) / scale / 2);
    }
    setScale(scale);
  }, [width, height]);
  const size = useCallback(() => {
    let css: CssProps | TransForm = {};
    css = {
      paddingTop: Math.floor(filling) + 42,
      paddingBottom: Math.floor(filling),
      marginTop: Math.floor(-480 - filling * 1.5),
    };
    css[transform] = `scale(${scale})`;
    return css;
  }, [filling, scale]);
  return (
    <div className={style.app} style={size()}>
      <div className={classnames({ [style.rect]: true, [style.drop]: drop })}>
        <Decorate />
        <div className={style.screen}>
          <div className={style.panel}>
            <Matrix matrix={matrix} cur={cur} reset={reset} />
            <Logo cur={!!cur} reset={reset} />
            <div className={style.state}>
              <Point cur={!!cur} point={points} max={max} />
              <p>{cur ? i18nData.cleans[lan] : i18nData.startLine[lan]}</p>
              <Number number={cur ? clearLines : startLines} />
              <p>{i18nData.level[lan]}</p>
              <Number number={cur ? speedRun : speedStart} length={1} />
              <p>{i18nData.next[lan]}</p>
              <Next data={next} />
              <div className={style.bottom}>
                <Music data={music} />
                <Pause data={pause} />
                <Number time />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Keyboard filling={filling} keyboard={keyboard} />
      <Guide />
    </div>
  );
}
export default memo(App);
