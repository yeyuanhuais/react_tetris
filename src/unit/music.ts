import { useAppSelector } from "@/hook/storeHook";
import { StoreReducer } from "@/store";

interface MusicProps {
  clear: () => void;
  fall: () => void;
  gameover: () => void;
  rotate: () => void;
  move: () => void;
  killStart: () => void;
  start: () => void;
}
export const hasWebAudioAPI = {
  // 使用 Web Audio API
  data: !!AudioContext && location.protocol.indexOf("http") !== -1,
};

export const music: MusicProps = {
  killStart: function (): void {
    throw new Error("Function not implemented.");
  },
  start: function (): void {
    throw new Error("Function not implemented.");
  },
  clear: function (): void {
    throw new Error("Function not implemented.");
  },
  fall: function (): void {
    throw new Error("Function not implemented.");
  },
  gameover: function (): void {
    throw new Error("Function not implemented.");
  },
  rotate: function (): void {
    throw new Error("Function not implemented.");
  },
  move: function (): void {
    throw new Error("Function not implemented.");
  },
};
(() => {
  const musicState = useAppSelector((state: StoreReducer) => state.music.value);
  if (!hasWebAudioAPI.data) {
    return;
  }
  const url = "./music.mp3";
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
        music.killStart = () => {
          // 游戏开始的音乐只播放一次
          music.start = () => {};
        };
        // 游戏开始
        music.start = () => {
          music.killStart();
          if (!musicState) {
            return;
          }
          getSource().start(0, 3.7202, 3.6224);
        };
        // 消除方块
        music.clear = () => {
          if (!musicState) {
            return;
          }
          getSource().start(0, 0, 0.7675);
        };
        // 立即下落
        music.fall = () => {
          if (!musicState) {
            return;
          }
          getSource().start(0, 1.2558, 0.3546);
        };
        // 游戏结束
        music.gameover = () => {
          if (!musicState) {
            return;
          }
          getSource().start(0, 8.1276, 1.1437);
        };
        // 旋转
        music.rotate = () => {
          if (!musicState) {
            return;
          }
          getSource().start(0, 2.2471, 0.0807);
        };
        // 移动
        music.move = () => {
          if (!musicState) {
            return;
          }
          getSource().start(0, 2.9088, 0.1437);
        };
      },
      (error) => {
        if (window.console) {
          window.console.error(`音频：${url} 读取错误`, error);
          hasWebAudioAPI.data = false;
        }
      }
    );
  };
  req.send();
})();
