import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {normalize} from '../math/vec2.js';
import {compute_aabb} from '../systems/sys_collide.js'

const QUERY = Has.Transform2D | Has.ControlBall;

export function sys_control_ball(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {

    const { ShiftLeft_down: isShiftLeft, KeyW_down: isKeyW_down, KeyS_down: isKeyS_down} = game.InputEvent;

    let move = game.World.Move[entity];

    let draw = game.World.Draw[entity];
    let ballSize = draw.Height;
    if(isKeyS_down){
        ballSize -= 10;
        if(ballSize<30){
            ballSize = 30;
        }
    }
    if(isKeyW_down){
        ballSize += 10;
        if(ballSize>150){
            ballSize = 150;
        }
    }

    if(isKeyS_down || isKeyW_down){
        draw.Height = ballSize;
        draw.Width = ballSize;
        draw.Color = `wokay`;

        const transform = game.World.Transform2D[entity];
        const collistion = game.World.Collide[entity];
        compute_aabb(transform, collistion);
    }

    let ballPosition = game.World.Transform2D[entity].Translation;
    let { ViewportHeight, ViewportWidth}  = game;
    if(ballPosition[0] > ViewportWidth || ballPosition[0]-ballSize < 0){
        move.Vector[0] *= -1
    }
    if(ballPosition[1] > ViewportHeight || ballPosition[1]-ballSize < 0){
        move.Vector[1] *= -1
    }

    const collisions = game.World.Collide[entity].Collisions;
    if(collisions.length>0){
        let transform = game.World.Transform2D[entity];
        if(collisions[0].Hit[0]){
            transform.Translation[0] += collisions[0].Hit[0];
            move.Vector[0]  *= -1;
        }
        
        if(collisions[0].Hit[1]){
            transform.Translation[1] += collisions[0].Hit[1];
            move.Vector[1] *= -1;
        }
        
    }

    if(isShiftLeft){
        move.speed = Math.random() * 1000;
    }
}
