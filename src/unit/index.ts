import { StoreReducer } from "@/store";
import { CurType } from "@/store/cur";
import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { StorageKey, blockType } from "./const";

/**
 * @description document[hiddenProperty] 可以判断页面是否失去焦点
 */
const hiddenProperty = ((): string => {
  let names = ["hidden", "webkitHidden", "mozHidden", "msHidden"];
  names = names.filter((e) => e in document);
  return names.length > 0 ? names[0] : "";
})();
export const visibilityChangeEvent = (() => {
  if (!hiddenProperty) {
    return "";
  }
  // 如果属性有前缀, 相应的事件也有前缀
  return hiddenProperty.replace(/hidden/i, "visibilitychange");
})();
export const isFocus = () => {
  // 如果不存在该特性，认为一直聚焦
  if (!hiddenProperty) {
    return true;
  }
  return !(document as any)[hiddenProperty];
};

/* 随机获取下一个方块类型 */
export const getNextType = (): CurType => {
  const len = blockType.length;
  return blockType[Math.floor(Math.random() * len)];
};
/* 方块是否能够移动到指定位置 */
export const want = (next: { xy: number[]; shape: number[][] }, matrix: number[][]) => {
  const { xy = [], shape } = next;
  const horizontal = shape[0].length;
  return shape.every((m: any[], k1: any) => {
    m.every((n: any, k2: any) => {
      if (xy[1] < 0) {
        // left
        return false;
      }
      if (xy[1] + horizontal > 10) {
        // right
        return true;
      }
      if (xy[0] + k1 < 0) {
        // bottom
        return false;
      }
      if (n) {
        if (matrix[xy[0] + k1][xy[1] + k2]) {
          return false;
        }
        return true;
      }
      return true;
    });
  });
};
/* 是否达到消除状态 */
export const isClear = (matrix: number[][]): number[] | false => {
  const cleatLines: number[] = [];
  matrix.forEach((m: number[], k: number) => {
    if (m.every((n: number) => !!n)) {
      cleatLines.push(k);
    }
  });
  if (cleatLines.length === 0) {
    return false;
  }
  return cleatLines;
};
/* 游戏是否结束，第一行落下方块为依据 */
export const isOver = (matrix: number[][]) => {
  return matrix[0].some((n: any) => !!n);
};
/* 将状态记录到local storage */
export const subscribeRecord = (store: ToolkitStore<StoreReducer, AnyAction, [ThunkMiddleware<StoreReducer, AnyAction>]>) => {
  store.subscribe(() => {
    let data = store.getState();
    if (data.lock) {
      // 状态为锁定时不记录
      return;
    }
    let dataJson = JSON.stringify(data);
    dataJson = encodeURIComponent(dataJson);
    dataJson = btoa(dataJson);
    localStorage.setItem(StorageKey, dataJson);
  });
};
/* 判断是否为移动端 */
export const isMobile = () => {
  const ua = navigator.userAgent;
  const android = /Android (\d+\.\d+)/.test(ua);
  const iphone = ua.indexOf("iPhone") > -1;
  const ipad = ua.indexOf("iPad") > -1;
  const ipod = ua.indexOf("iPod") > -1;
  const nokiaN = ua.indexOf("NokiaN") > -1;
  return android || iphone || ipad || ipod || nokiaN;
};
/**
 * @description 对比两个数组是否相等
 * @param { Boolean }
 * @return { Boolean }
 */
export function areArraysEqual<T>(arr1: T[] | null, arr2: T[] | null): boolean {
  if (arr1 === null && arr2 == null) {
    return true;
  } else if (arr1 === null || arr2 == null) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    const value1 = arr1[i];
    const value2 = arr2[i];
    if (Array.isArray(value1) && Array.isArray(value2)) {
      // 如果元素是数组，则递归比较
      if (!areArraysEqual(value1, value2)) {
        return false;
      }
    } else {
      // 否则直接比较元素值
      if (value1 !== value2) {
        return false;
      }
    }
  }

  return true;
}
