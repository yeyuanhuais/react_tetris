import { CurType } from "@/store/cur";
import { List } from "immutable";
import { blockShape, origin } from "./const";

export default class Block {
  type: CurType;
  rotateIndex: number;
  timeStamp: number;
  shape: List<List<number>>;
  xy: List<number> | undefined;
  constructor(option: { type: CurType; rotateIndex: number; timeStamp: number; shape: List<List<number>>; xy: List<number> }) {
    this.type = option.type;
    this.rotateIndex = option.rotateIndex ?? 0;
    this.timeStamp = option.timeStamp ?? Date.now();
    this.shape = option.shape ?? List(blockShape[option.type].map((e) => List(e)));
    if (!option.xy) {
      switch (option.type) {
        case "I":
          this.xy = List([0, 3]);
          break;
        case "L":
          this.xy = List([-1, 4]);
          break;
        case "J":
          this.xy = List([-1, 4]);
          break;
        case "Z":
          this.xy = List([-1, 4]);
          break;
        case "S":
          this.xy = List([-1, 4]);
          break;
        case "O":
          this.xy = List([-1, 4]);
          break;
        case "T":
          this.xy = List([-1, 4]);
          break;

        default:
          break;
      }
    } else {
      this.xy = List(option.xy);
    }
  }
  rotate() {
    const shape = this.shape;
    let result: List<List<number>> = List([]);
    shape.forEach((m: List<number>) =>
      m.forEach((n: number, k: number) => {
        const index = m.size - k - 1;
        if (result.get(index) === undefined) {
          result = result.set(index, List([]));
        }
        const tempK = result.get(index).push(n);
        result = result.set(index, tempK);
      }),
    );
    const nextXy = [this.xy?.get(0) + origin[this.type][this.rotateIndex][0], this.xy?.get(1) + origin[this.type][this.rotateIndex][1]];
    const nextRotateIndex = this.rotateIndex + 1 >= origin[this.type].length ? 0 : this.rotateIndex + 1;
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
      xy: [this.xy.get(0) + n, this.xy.get(1)],
      rotateIndex: this.rotateIndex,
      timeStamp: Date.now(),
    };
  }
  right() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy.get(0), this.xy.get(1) + 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp,
    };
  }
  left() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy.get(0), this.xy.get(1) - 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp,
    };
  }
}
