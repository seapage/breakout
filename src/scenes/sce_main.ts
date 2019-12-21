import {control_paddle} from "../components/com_control_paddle.js";
import {control_ball} from "../components/com_control_ball.js";
import {controll_move} from "../components/com_move.js";
import {transform2d} from "../components/com_transform2d.js";
import {draw_rect} from "../components/com_draw.js";
import {collide} from "../components/com_collide.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_main(game: Game) {
    game.World = new World();

    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight - 40],
        Using: [collide([200, 30]), controll_move([0,0], 1000), control_paddle(), draw_rect(200, 30, 'blue')],
    });

    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight / 2],
        Using: [collide([50, 50]), controll_move([1,1], 20), control_ball(), draw_rect(50, 50, 'wokay')],
    });

    // for(let i=0; i<1; i++){

    //     game.Add({
    //         Translation: [250, 250],
    //         Using: [collide([100, 100]), controll_move([Math.random(),Math.random()], 20), control_ball(), draw_rect(100, 100, 'wokay')],
    //     });
    // }
}
