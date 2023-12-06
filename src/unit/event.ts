import { Timeout } from "ahooks/lib/useRequest/src/types";
const eventName: { [key: string]: Timeout | undefined } = {};

const down = (o: { callback: (arg0: { (): void; (): void }) => void; key: string | number; once: boolean; begin: number; interval: number }) => {
  const keys = Object.keys(eventName);
  keys.forEach((i) => {
    clearTimeout(eventName[i]);
    eventName[i] = undefined;
  });
  if (!o.callback) {
    return;
  }
  const clear = () => {
    clearTimeout(eventName[o.key]);
  };
  o.callback(clear);
  if (o.once === true) {
    return;
  }
  let begin = o.begin || 100;
  const interval = o.interval || 50;
  const loop = () => {
    eventName[o.key] = setTimeout(() => {
      begin = 0;
      loop();
      o.callback(clear);
    }, begin || interval);
  };
  loop();
};
const up = (o: { key: string | number; callback: () => void }) => {
  clearTimeout(eventName[o.key]);
  eventName[o.key] = undefined;
  if (!o.callback) {
    return;
  }
  o.callback();
};
const clearAll = () => {
  const keys = Object.keys(eventName);
  keys.forEach((i) => {
    clearTimeout(eventName[i]);
    eventName[i] = undefined;
  });
};
export default {
  up,
  down,
  clearAll,
};
