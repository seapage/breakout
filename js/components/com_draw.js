export function draw_rect(Width, Height, Color) {
    return (game, entity) => {
        game.World[entity] |= 16 /* Draw */;
        game[4 /* Draw */][entity] = {
            Width,
            Height,
            Color,
        };
    };
}
//# sourceMappingURL=com_draw.js.map