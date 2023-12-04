interface MusicProps{
  killStart:()=>void
  start:()=>void
}
const hasWebAudioAPI = {
  // 使用 Web Audio API
  data: !!AudioContext && location.protocol.indexOf("http") !== -1,
};

const music:MusicProps ;
(() => {
  if (!hasWebAudioAPI.data) {
    return;
  }
  const url = "./music.mp3";
  const context=new AudioContext();
  const req=new XMLHttpRequest();
  req.open("GET",url,true);
  req.responseType="arraybuffer";
  req.onload=()=>{
    context.decodeAudioData(req.response,(buffer)=>{
      // 将拿到的audio解码转为buffer
      const getSource=()=>{
        // 创建source源
        const source=context.createBufferSource();
        source.buffer=buffer;
        source.connect(context.destination);
        return source;
      }
      music.killStart=()=>{
        // 游戏开始的音乐只播放一次
        music.start=()=>{}
      }
      music.start=()=>{
        music.killStart();
        if(!store.getState().get(music)){
          return
        }
      }
    }
  }
})();
module.exports = {
  music,
};
