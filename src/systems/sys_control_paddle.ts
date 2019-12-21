import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {Direction, Move} from '../const/move.js';
import {add, normalize} from '../math/vec2.js';

const QUERY = Has.Transform2D | Has.ControlPaddle;

export function sys_control_paddle(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let direction = <Vec2>[0, 0];

    const {ArrowRight: isRight, ArrowLeft: isLeft, ArrowUp: isUp, ArrowDown: isDown} = game.InputState;



    if(isUp){
        add(direction, direction, Move[Direction.Down]);
    }
    if(isDown){
        add(direction, direction, Move[Direction.Up]);
    }
    if(isLeft){
        add(direction, direction, Move[Direction.Left]);
    }
    if(isRight){
        add(direction, direction, Move[Direction.Right]);
    }

    let move = game.World.Move[entity];
    move.Vector[0] = direction[0];
    move.Vector[1] = direction[1];
}
