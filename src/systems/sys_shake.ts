import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Shake;

export function sys_shake(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let shake = game[Get.Shake][entity];

    if (shake.Duration > 0) {
        shake.Duration -= delta;

        let transform = game[Get.Transform2D][entity];
        transform.Translation = [5 - Math.random() * 10, 5 - Math.random() * 10];
        transform.Dirty = true;

        if (shake.Duration <= 0) {
            shake.Duration = 0;
            transform.Translation = [0, 0];
        }
    }
}
