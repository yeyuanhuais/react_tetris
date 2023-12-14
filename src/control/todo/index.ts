import down from "./down";
import left from "./left";
import music from "./music";
import pause from "./pause";
import reset from "./reset";
import right from "./right";
import rotate from "./rotate";
import space from "./space";

export default {
  left,
  down,
  rotate,
  right,
  space,
  reset,
  pause,
  music,
} as { [key: string]: { down: () => void; up: () => void } };
