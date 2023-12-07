import store from "@/store";
import { changeMusic } from "@/store/music";

interface MusicProps {
  clear: () => void;
  fall: () => void;
  gameOver: () => void;
  rotate: () => void;
  move: () => void;
  killStart: () => void;
  start: () => void;
}
// 使用 Web Audio API
export let hasWebAudioAPI = !!AudioContext && location.protocol.indexOf("http") !== -1;

export const music = (): MusicProps | undefined => {
  let data: MusicProps;
  const { music: musicState } = store.getState();
  if (!hasWebAudioAPI) {
    return;
  }
  const url = "./public/music/music.mp3";
  const context = new AudioContext();
  const req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "arraybuffer";
  req.onload = () => {
    context.decodeAudioData(
      req.response,
      (buffer) => {
        // 将拿到的audio解码转为buffer
        const getSource = () => {
          // 创建source源
          const source = context.createBufferSource();
          source.buffer = buffer;
          source.connect(context.destination);
          return source;
        };
        data.killStart = () => {
          // 游戏开始的音乐只播放一次
          data.start = () => {};
        };
        // 游戏开始
        data.start = () => {
          data.killStart();
          if (!musicState) {
            return;
          }
          getSource().start(0, 3.7202, 3.6224);
        };
        // 消除方块
        data.clear = () => {
          if (!musicState) {
            return;
          }
          getSource().start(0, 0, 0.7675);
        };
        // 立即下落
        data.fall = () => {
          if (!musicState) {
            return;
          }
          getSource().start(0, 1.2558, 0.3546);
        };
        // 游戏结束
        data.gameOver = () => {
          if (!musicState) {
            return;
          }
          getSource().start(0, 8.1276, 1.1437);
        };
        // 旋转
        data.rotate = () => {
          if (!musicState) {
            return;
          }
          getSource().start(0, 2.2471, 0.0807);
        };
        // 移动
        data.move = () => {
          if (!musicState) {
            return;
          }
          getSource().start(0, 2.9088, 0.1437);
        };
      },
      (error) => {
        if (window.console) {
          window.console.error(`音频：${url} 读取错误`, error);
          hasWebAudioAPI = false;
        }
      },
    );
  };
  req.send();
};
(() => {
  if (!hasWebAudioAPI) {
    store.dispatch(changeMusic(false));
  }
})();
