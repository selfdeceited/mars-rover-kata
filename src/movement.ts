import { Command, Coordinates } from "./types"

import { Direction } from "./direction"
import { UnionToArray } from "./helpers/union"

export type MovementCommand = '⬆' | '⬇'

export function isMovementCommand(command: Command): command is MovementCommand {
    const movementCommands: UnionToArray<MovementCommand> = ['⬆', '⬇']
    return (movementCommands as Command[]).includes(command)
}

const movementForwardMap: Record<Direction, (_: Coordinates) => Coordinates> = {
    north: ({x, y}) => ({x, y: y + 1}),
    south: ({x, y}) => ({x, y: y - 1}),
    east:  ({x, y}) => ({x: x + 1, y}),
    west:  ({x, y}) => ({x: x - 1, y}),
}

const movementBackwardMap: Record<Direction, (_: Coordinates) => Coordinates> = {
    north: ({x, y}) => ({x, y: y - 1}),
    south: ({x, y}) => ({x, y: y + 1}),
    east:  ({x, y}) => ({x: x - 1, y}),
    west:  ({x, y}) => ({x: x + 1, y}),
}


export const movementCommandMap: Record<MovementCommand, ({x, y}: Coordinates, direction: Direction) => Coordinates> = {
    ['⬆']: ({x, y}, direction) => movementForwardMap[direction]({x, y}),
    ['⬇']: ({x, y}, direction) => movementBackwardMap[direction]({x, y})
}
