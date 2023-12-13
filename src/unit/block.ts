import { CurType } from "@/store/cur";
import { blockShape, origin } from "./const";

export default class Block {
  type: CurType;
  rotateIndex: number;
  timeStamp: number;
  shape: number[][];
  xy: number[] = [0, 0];
  constructor(option: { type: CurType; rotateIndex?: number; timeStamp?: number; shape?: number[][]; xy?: number[] }) {
    this.type = option.type;
    this.rotateIndex = option.rotateIndex ?? 0;
    this.timeStamp = option.timeStamp ?? Date.now();
    this.shape = option.shape ?? blockShape[option.type].map((e) => e);
    if (!option.xy) {
      switch (option.type) {
        case "I":
          this.xy = [0, 3];
          break;
        case "L":
          this.xy = [-1, 4];
          break;
        case "J":
          this.xy = [-1, 4];
          break;
        case "Z":
          this.xy = [-1, 4];
          break;
        case "S":
          this.xy = [-1, 4];
          break;
        case "O":
          this.xy = [-1, 4];
          break;
        case "T":
          this.xy = [-1, 4];
          break;

        default:
          break;
      }
    } else {
      this.xy = option.xy;
    }
  }
  rotate() {
    const shape = this.shape;
    let result: number[][] = [];
    shape.forEach((m: number[]) =>
      m.forEach((n: number, k: number) => {
        const index = m.length - k - 1;
        const arrayAtIndex = result[index] || [];
        arrayAtIndex.push(n);
        const tempK: number[] = arrayAtIndex;
        result[index] = tempK;
      }),
    );
    console.log("%c origin", "font-size:13px; background:pink; color:#bf2c9f;", origin);
    const originTypeList = origin[this.type];
    const nextXy = [this.xy[0] + originTypeList[this.rotateIndex][0], this.xy[1] + originTypeList[this.rotateIndex][1]];
    const nextRotateIndex = this.rotateIndex + 1 >= originTypeList.length ? 0 : this.rotateIndex + 1;
    return {
      shape: result,
      type: this.type,
      xy: nextXy,
      rotateIndex: nextRotateIndex,
      timeStamp: this.timeStamp,
    };
  }
  fall(n = 1) {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0] ?? 0 + n, this.xy[1]],
      rotateIndex: this.rotateIndex,
      timeStamp: Date.now(),
    };
  }
  right() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0], this.xy[1] ?? 0 + 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp,
    };
  }
  left() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0], this.xy[1] ?? 0 - 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp,
    };
  }
}
