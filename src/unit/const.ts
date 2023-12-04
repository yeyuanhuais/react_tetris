const StorageKey = "REACT_TETRIS";
/*  上一把的状态 */
export const lastRecord = (() => {
  let data = localStorage.getItem(StorageKey);
  if (!data) {
    return false;
  }
  try {
    data = atob(data);
    data = decodeURIComponent(data);
    data = JSON.parse(data);
  } catch (error) {
    if (window.console) {
      window.console.error("读取记录错误", error);
    }
    return false;
  }
  return data;
})();
