import { CurType } from "@/store/cur";
import { blockType } from "./const";

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
 * @description 对比两个对象是否相等
 */
export function areObjectsEqual(obj1: Record<string, any> | null, obj2: Record<string, any> | null, cache = new Map()): boolean {
  if (obj1 === obj2) {
    return true;
  }

  const cacheKey = `${obj1},${obj2}`;
  if (cache.has(cacheKey)) {
    return true; // 已经比较过的对象，直接返回结果
  }

  if (!obj1 || !obj2) {
    const result = obj1 === obj2;
    cache.set(cacheKey, result);
    return result;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    const result = false;
    cache.set(cacheKey, result);
    return result;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 === val2) {
      continue;
    }

    if ((val1 === null || val1 === undefined) && (val2 === null || val2 === undefined)) {
      continue;
    }

    if (val1 instanceof Date && val2 instanceof Date) {
      if (val1.getTime() !== val2.getTime()) {
        const result = false;
        cache.set(cacheKey, result);
        return result;
      }
    } else if (typeof val1 === "object" && typeof val2 === "object") {
      if (!areObjectsEqual(val1, val2, cache)) {
        const result = false;
        cache.set(cacheKey, result);
        return result;
      }
    } else if (val1 !== val2) {
      if (!(val1 === undefined || val2 === undefined) && typeof val1 !== "function" && typeof val2 !== "function") {
        const result = false;
        cache.set(cacheKey, result);
        return result;
      }
    }
  }

  const result = true;
  cache.set(cacheKey, result);
  return result;
}

/**
 * @description 对比两个数组是否相等
 */
export function areArraysEqual(arr1: any[] | null, arr2: any[] | null, cache = new Map()): boolean {
  if (arr1 === arr2) {
    return true;
  }

  const cacheKey = `${arr1},${arr2}`;
  if (cache.has(cacheKey)) {
    return true; // 已经比较过的数组，直接返回结果
  }

  if (!arr1 || !arr2) {
    const result = arr1 === arr2;
    cache.set(cacheKey, result);
    return result;
  }

  if (arr1.length !== arr2.length) {
    const result = false;
    cache.set(cacheKey, result);
    return result;
  }

  for (let i = 0; i < arr1.length; i++) {
    const elem1 = arr1[i];
    const elem2 = arr2[i];

    if (elem1 === elem2) {
      continue;
    }

    if ((elem1 === null || elem1 === undefined) && (elem2 === null || elem2 === undefined)) {
      continue;
    }

    if (elem1 instanceof Date && elem2 instanceof Date) {
      if (elem1.getTime() !== elem2.getTime()) {
        const result = false;
        cache.set(cacheKey, result);
        return result;
      }
    } else if (Array.isArray(elem1) && Array.isArray(elem2)) {
      if (!areArraysEqual(elem1, elem2, cache)) {
        const result = false;
        cache.set(cacheKey, result);
        return result;
      }
    } else if (typeof elem1 === "object" && typeof elem2 === "object") {
      if (!areObjectsEqual(elem1, elem2, cache)) {
        const result = false;
        cache.set(cacheKey, result);
        return result;
      }
    } else if (elem1 !== elem2) {
      if (!(elem1 === undefined || elem2 === undefined) && typeof elem1 !== "function" && typeof elem2 !== "function") {
        const result = false;
        cache.set(cacheKey, result);
        return result;
      }
    }
  }

  const result = true;
  cache.set(cacheKey, result);
  return result;
}
/**
 * @description 阻止原生点击事件
 */
export function stopPropagation() {
  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
    },
    true,
  );

  // 解决issue: https://github.com/chvin/react-tetris/issues/24
  document.addEventListener(
    "touchend",
    (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
    },
    true,
  );

  // 阻止双指放大
  document.addEventListener("gesturestart", (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
  });

  document.addEventListener(
    "mousedown",
    (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
    },
    true,
  );
}
