const enum Component {
    Collide,
    ControlPaddle,
    ControlBall,
    Draw,
    Transform2D,
    Move
}

export const enum Has {
    Collide = 1 << Component.Collide,
    ControlPaddle = 1 << Component.ControlPaddle,
    ControlBall = 1 << Component.ControlBall,
    Draw = 1 << Component.Draw,
    Transform2D = 1 << Component.Transform2D,
    Move = 1 << Component.Move,
}
