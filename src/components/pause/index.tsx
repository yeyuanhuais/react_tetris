import { CreateOptions, Filter } from "@/unit/const";
import cn from "classnames";
import React from "react";
import style from "./index.module.less";

type Constructor = { data: boolean };
type Props = Readonly<CreateOptions<Constructor, "data">>;
type State = {
  showPause: boolean;
};
export default class Pause extends React.Component<Required<Props>, State> {
  static defaultProps: Required<Filter<Props>> = {
    data: false,
  };
  static timeout: NodeJS.Timeout | null;
  constructor(props: Constructor) {
    super(props);
    this.state = {
      // 控制显示状态
      showPause: false,
    };
  }
  componentDidMount() {
    this.setShake(this.props.data);
  }
  componentWillReceiveProps({ data }: Constructor) {
    this.setShake(data);
  }
  shouldComponentUpdate({ data }: Constructor) {
    if (data) {
      // 如果暂停了, 不会有太多的dispatch, 考虑到闪烁效果, 直接返回true
      return true;
    }
    return data !== this.props.data;
  }
  setShake(bool: boolean) {
    // 根据props显示闪烁或停止闪烁
    if (bool && !Pause.timeout) {
      Pause.timeout = setInterval(() => {
        this.setState({
          showPause: !this.state.showPause,
        });
      }, 250);
    }
    if (!bool && Pause.timeout) {
      clearInterval(Pause.timeout);
      this.setState({
        showPause: false,
      });
      Pause.timeout = null;
    }
  }
  render() {
    return (
      <div
        className={cn({
          bg: true,
          [style.pause]: true,
          [style.c]: this.state.showPause,
        })}
      />
    );
  }
}
