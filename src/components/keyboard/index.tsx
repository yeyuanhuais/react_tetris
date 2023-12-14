import todo from "@/control/todo";
import { KeyboardState } from "@/store/keyboard";
import { areObjectsEqual, stopPropagation } from "@/unit";
import { i18nData, lan } from "@/unit/const";
import React from "react";
import Button from "./button";
import style from "./index.module.less";

type Constructor = { keyboard: KeyboardState; filling: number };
type Props = Readonly<Constructor>;
type State = {
  showPause: boolean;
};
export default class Keyboard extends React.Component<Required<Props>, State> {
  static propTypes: { filling: number; keyboard: KeyboardState };
  dom_rotate: Button | null;
  dom_down: Button | null;
  dom_left: Button | null;
  dom_right: Button | null;
  dom_space: Button | null;
  dom_reset: Button | null;
  dom_music: Button | null;
  dom_pause: Button | null;
  constructor(props: Props) {
    super(props);
    this.dom_rotate = null;
    this.dom_down = null;
    this.dom_left = null;
    this.dom_right = null;
    this.dom_space = null;
    this.dom_reset = null;
    this.dom_music = null;
    this.dom_pause = null;
  }
  componentDidMount() {
    const touchEventCatch: Record<string, boolean> = {}; // 对于手机操作, 触发了touchstart, 将作出记录, 不再触发后面的mouse事件

    // 在鼠标触发mousedown时, 移除元素时可以不触发mouseup, 这里做一个兼容, 以mouseout模拟mouseup
    const mouseDownEventCatch: Record<string, boolean> = {};
    stopPropagation();
    Object.keys(todo).forEach((key) => {
      (this as any)[`dom_${key}`].dom.addEventListener(
        "mousedown",
        () => {
          if (touchEventCatch[key] === true) {
            return;
          }
          todo[key].down();
          mouseDownEventCatch[key] = true;
        },
        true,
      );
      (this as any)[`dom_${key}`].dom.addEventListener(
        "mouseup",
        () => {
          if (touchEventCatch[key] === true) {
            touchEventCatch[key] = false;
            return;
          }
          todo[key].up();
          mouseDownEventCatch[key] = false;
        },
        true,
      );
      (this as any)[`dom_${key}`].dom.addEventListener(
        "mouseout",
        () => {
          if (mouseDownEventCatch[key] === true) {
            todo[key].up();
          }
        },
        true,
      );
      (this as any)[`dom_${key}`].dom.addEventListener(
        "touchstart",
        () => {
          touchEventCatch[key] = true;
          todo[key].down();
        },
        true,
      );
      (this as any)[`dom_${key}`].dom.addEventListener(
        "touchend",
        () => {
          todo[key].up();
        },
        true,
      );
    });
  }
  shouldComponentUpdate({ keyboard, filling }: Constructor) {
    return !areObjectsEqual(keyboard, this.props.keyboard) || filling !== this.props.filling;
  }
  render() {
    const keyboard = this.props.keyboard;
    return (
      <div
        className={style.keyboard}
        style={{
          marginTop: 20 + this.props.filling,
        }}
      >
        <Button
          color="blue"
          size="s1"
          top={0}
          left={374}
          label={i18nData.rotation[lan]}
          arrow="translate(0, 63px)"
          position
          active={keyboard.rotate}
          ref={(c) => {
            this.dom_rotate = c;
          }}
        />
        <Button
          color="blue"
          size="s1"
          top={180}
          left={374}
          label={i18nData.down[lan]}
          arrow="translate(0,-71px) rotate(180deg)"
          active={keyboard.down}
          ref={(c) => {
            this.dom_down = c;
          }}
        />
        <Button
          color="blue"
          size="s1"
          top={90}
          left={284}
          label={i18nData.left[lan]}
          arrow="translate(60px, -12px) rotate(270deg)"
          active={keyboard.left}
          ref={(c) => {
            this.dom_left = c;
          }}
        />
        <Button
          color="blue"
          size="s1"
          top={90}
          left={464}
          label={i18nData.right[lan]}
          arrow="translate(-60px, -12px) rotate(90deg)"
          active={keyboard.left}
          ref={(c) => {
            this.dom_right = c;
          }}
        />
        <Button
          color="blue"
          size="s0"
          top={100}
          left={52}
          label={`${i18nData.drop[lan]} (SPACE)`}
          active={keyboard.drop}
          ref={(c) => {
            this.dom_space = c;
          }}
        />
        <Button
          color="red"
          size="s2"
          top={0}
          left={196}
          label={`${i18nData.reset[lan]}(R)`}
          active={keyboard.reset}
          ref={(c) => {
            this.dom_reset = c;
          }}
        />
        <Button
          color="green"
          size="s2"
          top={0}
          left={106}
          label={`${i18nData.sound[lan]}(S)`}
          active={keyboard.music}
          ref={(c) => {
            this.dom_music = c;
          }}
        />
        <Button
          color="green"
          size="s2"
          top={0}
          left={16}
          label={`${i18nData.pause[lan]}(P)`}
          active={keyboard.pause}
          ref={(c) => {
            this.dom_pause = c;
          }}
        />
      </div>
    );
  }
}
