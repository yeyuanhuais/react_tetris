/**
 * @description document[hiddenProenty] 可以判断页面是否失去焦点
 */
const hiddenProperty = (() => {
  let names = ["hidden", "webkitHidden", "mozHidden", "msHidden"];
  names = names.filter(e => e in document);
  return names.length > 0 ? names[0] : false;
})();
const visibilityChangeEvent = (() => {
  if (!hiddenProperty) {
    return false;
  }
  // 如果属性有前缀, 相应的事件也有前缀
  return hiddenProperty.replace(/hidden/i, "visibilitychange");
})();