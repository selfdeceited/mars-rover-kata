export type MovementCommand = '⬆' | '⬇'
export type TurnCommand = '⬅' | '➡'

export type Command = MovementCommand | TurnCommand
export type Coordinates = { x: number, y: number }
export type CommandsResult = 'success' | { detectedObstacle: Coordinates }
