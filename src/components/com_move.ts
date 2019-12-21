import {Entity, Game} from "../game.js";
import {Mat2D, Rad, Vec2} from "../math/index.js";
import {create} from "../math/mat2d.js";
import {Has} from "./com_index.js";

export interface MoveInterface {
    /** Absolute matrix relative to the world. */
    World: Mat2D;
    /** World to self matrix. */
    Self: Mat2D;
    /** Vector of move */
    Vector: Vec2;
    /** isMoving */
    isMoving: boolean;

    speed: number;
}

export function controll_move(Vector: Vec2 = [0, 0], speed:number = 300) {
    const isMoving = Vector[0] === 0 && Vector[1] === 0 ? false : true;
    return (game: Game, EntityId: Entity) => {
        game.World.Mask[EntityId] |= Has.Move;
        game.World.Move[EntityId] = <MoveInterface>{
            EntityId,
            World: create(),
            Self: create(),
            Vector,
            isMoving,
            speed
        };
    };
}
