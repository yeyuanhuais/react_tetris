import store from "../store";
import todo from "./todo";

const keyboard: { [key: number]: string } = {
  37: "left",
  38: "rotate",
  39: "right",
  40: "down",
  32: "space",
  83: "music",
  82: "reset",
  80: "pause",
};

let keydownActive: string;

const boardKeys = Object.keys(keyboard).map((e) => parseInt(e, 10));

const keyDown = (e: { metaKey: boolean; keyCode: number }) => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return;
  }
  const type = keyboard[e.keyCode];
  if (type === keydownActive) {
    return;
  }
  keydownActive = type;
  todo[type].down(store);
};

const keyUp = (e: { metaKey: boolean; keyCode: number; }) => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return;
  }
  const type = keyboard[e.keyCode];
  if (type === keydownActive) {
    keydownActive = "";
  }
  todo[type].up(store);
};

document.addEventListener("keydown", keyDown, true);
document.addEventListener("keyup", keyUp, true);
