import { StoreReducer } from "@/store";
import { CurType } from "@/store/cur";
import i18n from "../../i18n.json";

export const StorageKey = "REACT_TETRIS";
export const clearPoints = [100, 300, 700, 1500];
/* 最高分 */
export const maxPoint = 999999;
export const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
export const blockShape: { [key in CurType]: number[][] } = {
  I: [[1, 1, 1, 1]],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
};
export const blockType = Object.keys(blockShape) as CurType[];
export const origin = {
  I: [
    [-1, 1],
    [1, -1],
  ],
  L: [[0, 0]],
  J: [[0, 0]],
  Z: [[0, 0]],
  S: [[0, 0]],
  O: [[0, 0]],
  T: [
    [0, 0],
    [1, 0],
    [-1, 1],
    [0, -1],
  ],
};

export const speeds = [800, 650, 500, 370, 250, 160];

export const delays = [50, 60, 70, 80, 90, 100];

export const fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export const eachLines = 20; // 每消除eachLines行, 增加速度
/*  上一把的状态 */
export const lastRecord = ((): StoreReducer | false => {
  try {
    let data = localStorage.getItem(StorageKey);
    if (!data) {
      return false;
    }
    data = atob(data);
    data = decodeURIComponent(data);
    data = JSON.parse(data);
    return data as unknown as StoreReducer;
  } catch (error) {
    if (window.console) {
      window.console.error("读取记录错误", error);
    }
    return false;
  }
})();
export const blankMatrix = (() => {
  const matrix = [];
  for (let i = 0; i < 20; i++) {
    matrix.push(blankLine);
  }
  return matrix;
})();
type lanType = "cn" | "en" | "fr" | "fa";
export const getParm = (param: string): string => {
  const r = new RegExp(`\\?(?:.+&)?${param}=(.*?)(?:&.*)?$`);
  const m = window.location.toString().match(r);
  return m ? decodeURI(m[1]) : i18n.default;
};
export const lan = ((): lanType => {
  let l = getParm("len").toLowerCase();
  l = i18n.lan.indexOf(l) === -1 ? i18n.default : l;
  return l as lanType;
})();
export const i18nData: { [key: string]: { [key: string]: string } } = i18n.data;
document.title = i18n.data.title[lan];

export type TransForm = "transform" | "webkitTransform" | "msTransform" | "mozTransform" | "oTransform";
export const transform = (function () {
  const trans = ["transform", "webkitTransform", "msTransform", "mozTransform", "oTransform"];
  const body = document.body;
  return trans.filter((e: any) => body.style[e] !== undefined)[0] as TransForm;
})();

export type Filter<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]: T[K];
};
/**
 * @description 将必选转换成可选
 * type DocumentOption = CreateOptions<Document, 'status'|'author'|'date'|'readCount'>;
 */
export type CreateOptions<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
