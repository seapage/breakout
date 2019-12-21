import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {normalize} from '../math/vec2.js';

const QUERY = Has.Move;

export function sys_move(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let directionVector = <Vec2>[0,0];
    const move = game.World.Move[entity]
    let moveVector = move.Vector;
    normalize(directionVector, moveVector);

    let speed = move.speed;

    let transform = game.World.Transform2D[entity];
    transform.Translation[0] += directionVector[0] * speed * delta;
    transform.Translation[1] += directionVector[1] * speed * delta;
    transform.Dirty = true;
}
