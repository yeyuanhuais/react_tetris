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

export const music = async (): Promise<MusicProps | undefined> => {
  const data: MusicProps = {
    clear: function (): void {
      throw new Error("Function not implemented.");
    },
    fall: function (): void {
      throw new Error("Function not implemented.");
    },
    gameOver: function (): void {
      throw new Error("Function not implemented.");
    },
    rotate: function (): void {
      throw new Error("Function not implemented.");
    },
    move: function (): void {
      throw new Error("Function not implemented.");
    },
    killStart: function (): void {
      throw new Error("Function not implemented.");
    },
    start: function (): void {
      throw new Error("Function not implemented.");
    },
  };
  const { music: musicState } = store.getState();
  if (!hasWebAudioAPI) {
    return undefined;
  }
  return await new Promise<MusicProps>((resolve, reject) => {
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
          resolve(data);
        },
        (error) => {
          if (window.console) {
            window.console.error(`音频：${url} 读取错误`, error);
            hasWebAudioAPI = false;
          }
          reject(undefined);
        },
      );
    };
    req.send();
  });
};
(() => {
  if (!hasWebAudioAPI) {
    store.dispatch(changeMusic(false));
  }
})();
