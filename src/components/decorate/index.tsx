import classNames from "classnames";
import style from "./index.less";
import { i18nData, lan } from "@/unit/const";
export default () => {
  return (
    <div className={style.decorate}>
      <div className={style.topBorder}>
        <span className={classNames(["l", style.mr])} style={{ width: 40 }} />
        <span className={classNames(["l", style.mr])} />
        <span className={classNames(["l", style.mr])} />
        <span className={classNames(["l", style.mr])} />
        <span className={classNames(["l", style.mr])} />
        <span className={classNames(["l", style.mr])} style={{ width: 40 }} />
        <span className={classNames(["l", style.mr])} />
        <span className={classNames(["l", style.mr])} />
        <span className={classNames(["l", style.mr])} />
        <span className={classNames(["l", style.mr])} />
      </div>
      <h1>{i18nData.title[lan]}</h1>
      <div className={style.view}>
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <b className="c" />
        <div className="clear" />
        <em />
        <b className="c" />
        <p />
        <em />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <b className="c" />
        <div className="clear" />
        <em />
        <b className="c" />
        <p />
        <b className="c" />
        <b className="c" />
        <b className="c" />
        <b className="c" />
        <p />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <p />
        <b className="c" />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <p />
        <em />
        <b className="c" />
        <div className="clear" />
        <em />
        <b className="c" />
        <div className="clear" />
        <em />
        <b className="c" />
        <div className="clear" />
        <em />
        <b className="c" />
      </div>
      <div className={classNames([style.view, style.l])}>
        <em />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <p />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <p />
        <b className="c" />
        <b className="c" />
        <b className="c" />
        <b className="c" />
        <p />
        <em />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <b className="c" />
        <div className="clear" />
        <em />
        <b className="c" />
        <p />
        <b className="c" />
        <b className="c" />
        <div className="clear" />
        <em />
        <b className="c" />
        <div className="clear" />
        <em />
        <b className="c" />
        <p />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
        <div className="clear" />
        <b className="c" />
      </div>
    </div>
  );
};
