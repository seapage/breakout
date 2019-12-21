import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";

export interface Draw {
    Height: number;
    Width: number;
    Color: string;
}


export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export function draw_rect(Height: number, Width: number = Height, Color: string = getRandomColor()) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Draw;
        game.World.Draw[entity] = <Draw>{
            Height,
            Width,
            Color,
        };
    };
}
