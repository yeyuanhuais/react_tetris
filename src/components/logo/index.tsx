import cn from "classnames";
import propTypes from "prop-types";
import React from "react";

import { CreateOptions, i18nData, lan } from "@/unit/const";
import style from "./index.module.less";

type Constructor = { reset: boolean; cur: boolean };
type Props = Readonly<CreateOptions<Constructor, "cur">>;
type State = {
  style: string;
  display: string;
};
export default class Logo extends React.Component<Required<Props>, State> {
  static timeout: NodeJS.Timeout;
  constructor(props: Constructor) {
    super(props);
    this.state = {
      style: style.r1,
      display: "none",
    };
  }
  componentDidMount() {
    this.animate(this.props);
  }
  componentDidUpdate(prevProps: Constructor) {
    if (
      // 只有在游戏进入开始, 或结束时 触发改变
      ([this.props.cur, prevProps.cur].indexOf(false) !== -1 && this.props.cur !== prevProps.cur) ||
      this.props.reset !== prevProps.reset
    ) {
      this.animate(prevProps);
    }
  }
  shouldComponentUpdate({ cur, reset }: Constructor) {
    return cur !== this.props.cur || reset !== this.props.reset || !cur;
  }
  animate({ cur, reset }: Constructor) {
    clearTimeout(Logo.timeout);
    this.setState({
      style: style.r1,
      display: "none",
    });
    if (cur || reset) {
      this.setState({ display: "none" });
      return;
    }

    let m = "r"; // 方向
    let count = 0;

    const set = (func: () => void, delay: number) => {
      if (!func) {
        return;
      }
      Logo.timeout = setTimeout(func, delay);
    };

    const show = (func: () => void) => {
      // 显示
      set(() => {
        this.setState({
          display: "block",
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const hide = (func: () => void) => {
      // 隐藏
      set(() => {
        this.setState({
          display: "none",
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const eyes = (func: () => void, delay1: number, delay2: number) => {
      // 龙在眨眼睛
      set(() => {
        this.setState({ style: style[m + 2] });
        set(() => {
          this.setState({ style: style[m + 1] });
          if (func) {
            func();
          }
        }, delay2);
      }, delay1);
    };

    const run = (func: () => void) => {
      // 开始跑步啦！
      set(() => {
        this.setState({ style: style[m + 4] });
        set(() => {
          this.setState({ style: style[m + 3] });
          count++;
          if (count === 10 || count === 20 || count === 30) {
            m = m === "r" ? "l" : "r";
          }
          if (count < 40) {
            run(func);
            return;
          }
          this.setState({ style: style[m + 1] });
          if (func) {
            set(func, 4000);
          }
        }, 100);
      }, 100);
    };

    const dra = () => {
      count = 0;
      eyes(
        () => {
          eyes(
            () => {
              eyes(
                () => {
                  this.setState({ style: style[m + 2] });
                  run(dra);
                },
                150,
                150,
              );
            },
            150,
            150,
          );
        },
        1000,
        1500,
      );
    };

    show(() => {
      // 忽隐忽现
      hide(() => {
        show(() => {
          hide(() => {
            show(() => {
              dra(); // 开始运动
            });
          });
        });
      });
    });
  }
  render() {
    if (this.props.cur) {
      return null;
    }
    return (
      <div className={style.logo} style={{ display: this.state.display }}>
        <div className={cn({ bg: true, [style.dragon]: true, [this.state.style]: true })} />
        <p dangerouslySetInnerHTML={{ __html: i18nData.titleCenter[lan] }} />
      </div>
    );
  }
}
