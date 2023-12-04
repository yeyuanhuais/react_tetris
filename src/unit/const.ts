interface LastRecordProps {
  music: boolean;
  points: number;
}
const StorageKey = "REACT_TETRIS";
/*  上一把的状态 */
export const lastRecord: LastRecordProps | boolean = (() => {
  let data = localStorage.getItem(StorageKey);
  if (!data) {
    return false;
  }
  try {
    data = atob(data);
    data = decodeURIComponent(data);
    data = JSON.parse(data);
    return data;
  } catch (error) {
    if (window.console) {
      window.console.error("读取记录错误", error);
    }
    return false;
  }
})();
/* 最高分 */
export const maxPoint = 999999;
export const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
