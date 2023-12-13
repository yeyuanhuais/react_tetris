import { CurType } from "@/store/cur";
import { blockShape } from "@/unit/const";

import React from "react";
import style from "./index.module.less";

const xy = {
  // 方块在下一个中的坐标
  I: [1, 0],
  L: [0, 0],
  J: [0, 0],
  Z: [0, 0],
  S: [0, 0],
  O: [0, 1],
  T: [0, 0],
};

const empty = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

type Constructor = { data: CurType };
type Props = Readonly<Constructor>;
type State = {
  block: number[][];
};
export default class Next extends React.Component<Required<Props>, State> {
  constructor(props: Constructor) {
    super(props);
    this.state = {
      block: empty,
    };
  }
  componentDidMount() {
    this.build(this.props.data);
  }
  componentDidUpdate(prevProps: Constructor) {
    this.build(prevProps.data);
  }
  shouldComponentUpdate(nextProps: Constructor) {
    return nextProps.data !== this.props.data;
  }
  build(type: CurType) {
    const shape = blockShape[type];
    const block: number[][] = empty.map((e) => [...e]);
    shape.forEach((m, k1) => {
      m.forEach((n, k2) => {
        if (n) {
          block[k1 + xy[type][0]][k2 + xy[type][1]] = 1;
        }
      });
    });
    this.setState({ block });
  }
  render() {
    return (
      <div className={style.next}>
        {this.state.block.map((arr, k1) => (
          <div key={k1}>
            {arr.map((e, k2) => (
              <b className={e ? "c" : ""} key={k2} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
