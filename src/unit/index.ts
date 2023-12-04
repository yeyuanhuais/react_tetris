import { StorageKey, blockType } from "./const";

/**
 * @description document[hiddenProenty] 可以判断页面是否失去焦点
 */
const hiddenProperty = (() => {
  let names = ["hidden", "webkitHidden", "mozHidden", "msHidden"];
  names = names.filter((e) => e in document);
  return names.length > 0 ? names[0] : false;
})();
export const visibilityChangeEvent = (() => {
  if (!hiddenProperty) {
    return false;
  }
  // 如果属性有前缀, 相应的事件也有前缀
  return hiddenProperty.replace(/hidden/i, "visibilitychange");
})();
export const isFocus = () => {
  // 如果不存在该特性，认为一直聚焦
  if (!hiddenProperty) {
    return true;
  }
  return !document[hiddenProperty];
};

/* 随机获取下一个方块类型 */
export const getNextType = () => {
  const len = blockType.length;
  return blockType[Math.floor(Math.random() * len)];
};
/* 方块是否能够移动到指定位置 */
export const want = (
  next: { xy: any; shape: any },
  matrix: { get: (arg0: any) => { (): any; new (): any; get: { (arg0: any): any; new (): any } } }
) => {
  const { xy, shape } = next;
  const horizontal = shape.get(0).size;
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
        if (matrix.get(xy[0] + k1).get(xy[1] + k2)) {
          return false;
        }
        return true;
      }
      return true;
    });
  });
};
/* 是否达到消除状态 */
export const isClear = (matrix: any[]) => {
  const cleatLines: any[] = [];
  matrix.forEach((m: any[], k: any) => {
    if (m.every((n: any) => !!n)) {
      cleatLines.push(k);
    }
  });
  if (cleatLines.length === 0) {
    return false;
  }
  return cleatLines;
};
/* 游戏是否结束，第一行落下方块为依据 */
export const isOver = (matrix: { get: (arg0: number) => any[] }) => {
  return matrix.get(0).some((n: any) => !!n);
};
/* 将状态记录到local storage */
export const subscribeRecord = (store) => {
  store.subscribe(() => {
    let data = store.getState().toJS();
    if (data.lock) {
      // 状态为锁定时不记录
      return;
    }
    data = JSON.stringify(data);
    data = encodeURIComponent(data);
    data = btoa(data);
    localStorage.setItem(StorageKey, data);
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
