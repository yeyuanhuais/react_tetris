import { CreateOptions, Filter } from "@/unit/const";
import cn from "classnames";
import React from "react";
import style from "./index.module.less";

const render = (data: any[]) => (
  <div className={style.number}>
    {data.map((e, k) => (
      <span className={cn(["bg", style[`s_${e}`]])} key={k} />
    ))}
  </div>
);

const formate = (num: number) => (num < 10 ? `0${num}`.split("") : `${num}`.split(""));

type Constructor={ time: boolean; number: number; length: number }
type Props = Readonly<CreateOptions<Constructor,"time"|
"number"|"length">>;
type State = {
  timeCount: number;
  time: Date;
};

export default class Number extends React.Component<Required<Props>, State> {
  static defaultProps: Required<Filter<Props>> = {
    length: 6,
    time: false,
    number: 0,
  };
  static timeInterval: any;
  static timeCount: number;
  constructor(props: Constructor) {
    super(props);
    this.state = {
      timeCount: 0,
      time: new Date(),
    };
  }
  componentDidMount() {
    if (!this.props.time) {
      return;
    }
    const clock = () => {
      const count = +Number.timeInterval;
      Number.timeInterval = setTimeout(() => {
        this.setState({
          time: new Date(),
          timeCount: count, // 用来做 shouldComponentUpdate 优化
        });
        clock();
      }, 1000);
    };
    clock();
  }
  shouldComponentUpdate({ number=0 }) {
    if (this.props.time) {
      // 右下角时钟
      if (this.state.timeCount !== Number.timeCount) {
        if (this.state.timeCount ) {
          Number.timeCount = this.state.timeCount; // 记录clock上一次的缓存
        }
        return true;
      }
      return false; // 经过判断这次的时间已经渲染, 返回false
    }
    return this.props.number !== number;
  }
  componentWillUnmount() {
    if (!this.props.time) {
      return;
    }
    clearTimeout(Number.timeInterval);
  }
  render() {
    if (this.props.time) {
      // 右下角时钟
      const now = this.state.time;
      const hour = formate(now.getHours());
      const min = formate(now.getMinutes());
      const sec = now.getSeconds() % 2;
      const t = hour.concat(sec ? "d" : "d_c", min);
      return render(t);
    }

    const num = `${this.props.number}`.split("");
    for (let i = 0, len = this.props.length - num.length; i < len; i++) {
      num.unshift("n");
    }
    return render(num);
  }
}
