import { states } from "@/control/states";
import { CurState } from "@/store/cur";
import { areArraysEqual, isClear } from "@/unit";
import { CreateOptions, blankLine, fillLine } from "@/unit/const";
import classnames from "classnames";
import React from "react";
import style from "./index.module.less";

const t = setTimeout;

type Constructor = { matrix: number[][]; cur: CurState; reset: boolean };
type Props = Readonly<CreateOptions<Constructor, "cur">>;
type State = {
  clearLines: false | number[];
  animateColor: number;
  isOver: boolean;
  overState: number[][] | null;
};
export default class Matrix extends React.Component<Required<Props>, State> {
  constructor(props: Constructor) {
    super(props);
    this.state = {
      clearLines: false,
      animateColor: 2,
      isOver: false,
      overState: null,
    };
  }
  static getDerivedStateFromProps(prevProps: Constructor) {
    const clears = isClear(prevProps.matrix);
    const overs = prevProps.reset;
    return {
      clearLines: clears,
      isOver: overs,
    };
  }
  componentDidUpdate(prevProps: Constructor): void {
    console.log("%c prevProps", "font-size:13px; background:pink; color:#bf2c9f;", prevProps);
    const clears = isClear(prevProps.matrix);
    const overs = prevProps.reset;
    if (clears && !this.state.clearLines) {
      this.clearAnimate();
    }
    if (!clears && overs && !this.state.isOver) {
      this.over(prevProps);
    }
  }
  shouldComponentUpdate(nextProps: Constructor) {
    // 使用Immutable 比较两个List 是否相等
    const props = this.props;
    return (
      !(
        areArraysEqual(nextProps.matrix, props.matrix) &&
        areArraysEqual(nextProps.cur && nextProps.cur.shape, props.cur && props.cur.shape) &&
        areArraysEqual(nextProps.cur && nextProps.cur.xy, props.cur && props.cur.xy)
      ) ||
      !!this.state.clearLines ||
      !!this.state.isOver
    );
  }
  getResult(props = this.props) {
    const cur = props.cur;
    const shape = cur && cur.shape;
    const xy = (cur && cur.xy) ?? [];

    const matrix = props.matrix;
    const clearLines = this.state.clearLines;
    if (clearLines) {
      const animateColor = this.state.animateColor;
      clearLines.forEach((index) => {
        matrix[index] = [animateColor, animateColor, animateColor, animateColor, animateColor, animateColor, animateColor, animateColor, animateColor, animateColor];
      });
    } else if (shape) {
      shape.forEach((m: number[], k1: number) =>
        m.forEach((n: number, k2: number) => {
          if (n && xy[0] + k1 >= 0) {
            // 竖坐标可以为负
            const line = matrix[xy[0] + k1];
            let color;
            if (line[xy[1] + k2] === 1 && !clearLines) {
              // 矩阵与方块重合
              color = 2;
            } else {
              color = 1;
            }
            line[xy[1] + k2] = color;
            matrix[xy[0] + k1] = line;
          }
        }),
      );
    }
    return matrix;
  }
  clearAnimate() {
    const anima = (callback: () => void) => {
      t(() => {
        this.setState({
          animateColor: 0,
        });
        t(() => {
          this.setState({
            animateColor: 2,
          });
          if (typeof callback === "function") {
            callback();
          }
        }, 100);
      }, 100);
    };
    anima(() => {
      anima(() => {
        anima(() => {
          t(() => {
            states.clearLines(this.props.matrix, this.state.clearLines || []);
          }, 100);
        });
      });
    });
  }
  over(nextProps: Constructor) {
    const overState = this.getResult(nextProps);
    this.setState({
      overState,
    });

    const exLine = (index: number) => {
      if (index <= 19) {
        overState[19 - index] = fillLine;
      } else if (index >= 20 && index <= 39) {
        overState[index - 20] = blankLine;
      } else {
        states.overEnd();
        return;
      }
      this.setState({
        overState,
      });
    };

    for (let i = 0; i <= 40; i++) {
      t(exLine.bind(null, i), 40 * (i + 1));
    }
  }
  render() {
    let matrix;
    if (this.state.isOver) {
      matrix = this.state.overState;
    } else {
      matrix = this.getResult();
    }
    return (
      <div className={style.matrix}>
        {matrix &&
          matrix.map((p, k1) => (
            <p key={k1}>
              {p.map((e, k2) => (
                <b
                  className={classnames({
                    c: e === 1,
                    d: e === 2,
                  })}
                  key={k2}
                />
              ))}
            </p>
          ))}
      </div>
    );
  }
}
