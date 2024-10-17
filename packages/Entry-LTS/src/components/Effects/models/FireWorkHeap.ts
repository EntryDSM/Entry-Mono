// models/FireWorkHeap.ts
import { Firework } from './Firework';

export class FireWorkHeap {
  storage: Firework[];
  onStageNodeCnt: number;
  removalStaged: number;

  constructor() {
    this.storage = [];
    this.onStageNodeCnt = 0;
    this.removalStaged = 0;
  }

  peek(): Firework | null {
    if (this.storage.length === 0) {
      return null;
    } else {
      return this.storage[0];
    }
  }

  add(firework: Firework): void {
    this.storage.push(firework);
    this.onStageNodeCnt++;
    this._bubbleUp();
  }

  remove(): void {
    if (this.storage.length === 0) return;
    if (this.storage.length === 1 && !this.storage[0].root) {
      this.storage.pop();
    } else {
      this.storage[0] = this.storage.pop()!;
      this._bubbleDown();
    }
    this.onStageNodeCnt--;
    this.removalStaged--;
  }

  removeStagedData(): void {
    this.storage = this.storage.slice(this.removalStaged);
    this._bubbleDown();
    this.onStageNodeCnt -= this.removalStaged;
    this.removalStaged = 0;
  }

  onStageRemoval(): void {
    this._bubbleDown();
    this.removalStaged++;
  }

  private _bubbleDown(): void {
    let idx = 0;
    const cnt = this.storage.length;
    while (this._getLeftIdx(idx) < cnt) {
      const leftIdx = this._getLeftIdx(idx);
      const rightIdx = this._getRightIdx(idx);
      const smallerChildNodeIdx =
        rightIdx < cnt &&
        this.storage[rightIdx].lifespan < this.storage[leftIdx].lifespan
          ? rightIdx
          : leftIdx;

      if (
        this._compare(
          this.storage[idx].lifespan,
          this.storage[smallerChildNodeIdx].lifespan,
        ) >= 0
      ) {
        this._swap(idx, smallerChildNodeIdx);
        idx = smallerChildNodeIdx;
      } else {
        break;
      }
    }
  }

  private _bubbleUp(): void {
    let lastIdx = this.storage.length - 1;
    while (lastIdx > 0) {
      const parentIdx = Math.floor((lastIdx - 1) / 2);
      if (
        this._compare(
          this.storage[parentIdx].lifespan,
          this.storage[lastIdx].lifespan,
        ) >= 0
      ) {
        this._swap(parentIdx, lastIdx);
        lastIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  private _getLeftIdx = (idx: number): number => idx * 2 + 1;
  private _getRightIdx = (idx: number): number => idx * 2 + 2;
  private _swap = (a: number, b: number): void => {
    [this.storage[a], this.storage[b]] = [this.storage[b], this.storage[a]];
  };
  private _compare = (a: number, b: number): number => a - b;
}
