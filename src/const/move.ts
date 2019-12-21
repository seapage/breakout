import { Vec2 } from "../math";

export enum Direction {
    Up,
    Left,
    Down,
    Right
}
export const Move = {
    [Direction.Up]: <Vec2>[0, 1],
    [Direction.Left]: <Vec2>[-1, 0],
    [Direction.Down]: <Vec2>[0, -1],
    [Direction.Right]: <Vec2>[1, 0],
}