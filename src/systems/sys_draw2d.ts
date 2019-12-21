import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Draw;

export function sys_draw2d(game: Game, delta: number) {
    game.Context2D.resetTransform();
    game.Context2D.fillStyle = game.ClearColor;
    game.Context2D.fillRect(0, 0, game.ViewportWidth, game.ViewportHeight);

    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            let transform = game.World.Transform2D[i];
            game.Context2D.setTransform(
                transform.World[0],
                transform.World[1],
                transform.World[2],
                transform.World[3],
                transform.World[4],
                transform.World[5]
            );

            draw_rect(game, i);
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function draw_rect(game: Game, entity: Entity, random?: Boolean) {
    let draw = game.World.Draw[entity];


    const {Space: isSpace} = game.InputState;


    const image = new Image();
    let pat;
    switch(draw.Color){
        case 'wokay':
            const size = draw.Height;
            image.src = `./images/${size}x${size}.png`;
            pat = game.Context2D.createPattern(image, "repeat");
            game.Context2D.fillStyle = pat;
            game.Context2D.fillRect(-size / 2 - size/2, -size / 2- size/2, size, size);
            break;
        default: 

            game.Context2D.fillStyle = (random || isSpace) ? getRandomColor(): draw.Color;
            game.Context2D.fillRect(-draw.Height / 2, -draw.Width / 2, draw.Height, draw.Width);
    }




}

