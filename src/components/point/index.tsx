import { CreateOptions, i18nData, lan } from "@/unit/const";
import React from "react";
import Number from "../number";

const DF = i18nData.point[lan];
const ZDF = i18nData.highestScore[lan];
const SLDF = i18nData.lastRound[lan];

type Constructor = { cur: boolean; max: number; point: number };
type Props = Readonly<CreateOptions<Constructor, "cur">>;
type State = {
  label: string;
  number: number;
};
export default class Point extends React.Component<Required<Props>, State> {
  static timeout: NodeJS.Timeout;
  constructor(props: Constructor) {
    super(props);
    this.state = {
      label: "",
      number: 0,
    };
  }
  componentDidMount() {
    this.onChange(this.props);
  }
  componentDidUpdate(prevProps: Constructor) {
    this.onChange(prevProps);
  }
  shouldComponentUpdate({ cur, point, max }: Constructor) {
    const props = this.props;
    return cur !== props.cur || point !== props.point || max !== props.max || !props.cur;
  }
  onChange({ cur, point, max }: Constructor) {
    clearInterval(Point.timeout);
    if (cur) {
      // 在游戏进行中
      this.setState({
        label: point >= max ? ZDF : DF,
        number: point,
      });
    } else {
      // 游戏未开始
      const toggle = () => {
        // 最高分与上轮得分交替出现
        this.setState({
          label: SLDF,
          number: point,
        });
        Point.timeout = setTimeout(() => {
          this.setState({
            label: ZDF,
            number: max,
          });
          Point.timeout = setTimeout(toggle, 3000);
        }, 3000);
      };

      if (point !== 0) {
        // 如果为上轮没玩, 也不用提示了
        toggle();
      } else {
        this.setState({
          label: ZDF,
          number: max,
        });
      }
    }
  }
  render() {
    return (
      <div>
        <p>{this.state.label}</p>
        <Number number={this.state.number} />
      </div>
    );
  }
}
