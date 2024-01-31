import { CreateOptions, Filter, transform } from "@/unit/const";
import cn from "classnames";
import React from "react";
import style from "./index.module.less";

type Constructor = {
  color: string;
  size: string;
  top: number;
  left: number;
  label: string;
  position: boolean;
  arrow: string;
  active: boolean;
};
type Props = Readonly<CreateOptions<Constructor, "position" | "arrow">>;
type State = object;
export default class Button extends React.Component<Required<Props>, State> {
  static defaultProps: Required<Filter<Props>> = {
    position: false,
    arrow: "none",
  };
  dom: HTMLElement | null | undefined;
  shouldComponentUpdate(nextProps: Constructor) {
    return nextProps.active !== this.props.active;
  }
  render() {
    const { active, color, size, top, left, label, position, arrow } = this.props;
    return (
      <div className={cn({ [style.button]: true, [style[color]]: true, [style[size]]: true })} style={{ top, left }}>
        <i
          className={cn({ [style.active]: active })}
          ref={(c) => {
            this.dom = c;
          }}
        />
        {size === "s1" && (
          <em
            style={{
              [transform]: `${arrow} scale(1,2)`,
            }}
          />
        )}
        <span className={cn({ [style.position]: position })}>{label}</span>
      </div>
    );
  }
}
