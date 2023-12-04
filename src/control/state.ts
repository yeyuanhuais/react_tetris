import { music } from "@/unit/music";

const states = {
  //自动下落setTimeout变量
  fallInterval: null,
  // 游戏开始
  start: () => {
    if (music.start) {
      music.start();
    }
  },
};
