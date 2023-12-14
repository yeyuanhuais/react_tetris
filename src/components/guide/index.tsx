import { isMobile } from "@/unit";
import { i18nData, lan, transform } from "@/unit/const";
import QRCode from "qrcode";
import React from "react";
import style from "./index.module.less";

type Constructor = {};
type Props = Readonly<Constructor>;
type State = {
  QRCode: string;
  isMobile: boolean;
};
export default class Guide extends React.Component<Required<Props>, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMobile: isMobile(),
      QRCode: "",
    };
  }
  shouldComponentUpdate(state: State) {
    if (state.isMobile) {
      return false;
    }
    QRCode.toDataURL(location.href, { margin: 1 }).then((dataUrl: string) => this.setState({ QRCode: dataUrl }));
    if (state.QRCode === this.state.QRCode) {
      return false;
    }
    return true;
  }
  render() {
    if (this.state.isMobile) {
      return null;
    }
    return (
      <div style={{ display: this.state.isMobile ? "none" : "block" }}>
        <div className={`${style.guide} ${style.right}`}>
          <div className={style.up}>
            <em style={{ [transform]: "translate(0,-3px) scale(1,2)" }} />
          </div>
          <div className={style.left}>
            <em style={{ [transform]: "translate(-7px,3px) rotate(-90deg) scale(1,2)" }} />
          </div>
          <div className={style.down}>
            <em style={{ [transform]: "translate(0,9px) rotate(180deg) scale(1,2)" }} />
          </div>
          <div className={style.right}>
            <em style={{ [transform]: "translate(7px,3px)rotate(90deg) scale(1,2)" }} />
          </div>
        </div>
        <div className={`${style.guide} ${style.left}`}>
          <div className={style.space}>SPACE</div>
        </div>
        {this.state.QRCode !== "" ? (
          <div className={`${style.guide} ${style.qr}`}>
            <img src={this.state.QRCode} alt={i18nData.QRCode[lan]} />
          </div>
        ) : null}
      </div>
    );
  }
}
