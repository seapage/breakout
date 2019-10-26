import {ball_blueprint} from "../blueprints/blu_ball.js";
import {create_brick} from "../blueprints/blu_brick.js";
import {paddle_blueprint} from "../blueprints/blu_paddle.js";
import {shake} from "../components/com_shake.js";
import {Game} from "../game.js";

export function world_stage(game: Game) {
    game.World = [];

    let col_count = 5;
    let row_count = 5;
    let brick_width = 100;
    let brick_height = 20;
    let padding = 10;

    let top_left_x = (game.ViewportWidth - brick_width * col_count - padding * (col_count - 1)) / 2;
    let top_left_y = 100;

    let bricks = [];
    for (let row = 0; row < row_count; row++) {
        let y = top_left_y + row * (brick_height + padding) + brick_height / 2;
        for (let col = 0; col < col_count; col++) {
            let x = top_left_x + col * (brick_width + padding) + brick_width / 2;
            bricks.push({
                Translation: [x, y] as [number, number],
                ...create_brick(brick_width, brick_height),
            });
        }
    }

    game.Camera = game.Add({
        Using: [shake()],
        Children: [
            {
                Translation: [game.ViewportWidth / 2, game.ViewportHeight - 20],
                ...paddle_blueprint,
            },
            {
                Translation: [game.ViewportWidth / 2, game.ViewportHeight - 100],
                ...ball_blueprint,
            },
            ...bricks,
        ],
    });
}
