import { CreateOptions, Filter } from '@/unit/const';
import cn from 'classnames';
import React from 'react';
import style from './index.module.less';

type Constructor = { data: boolean };
type Props = Readonly<CreateOptions<Constructor, "data">>;
export default class Music extends React.Component<Required<Props>, {}> {
  static defaultProps: Required<Filter<Props>> = {
    data: false,
  };
  shouldComponentUpdate({ data }:Constructor) {
    return data !== this.props.data;
  }
  render() {
    return (
      <div
        className={cn(
          {
            bg: true,
            [style.music]: true,
            [style.c]: !this.props.data,
          }
        )}
      />
    );
  }
}

