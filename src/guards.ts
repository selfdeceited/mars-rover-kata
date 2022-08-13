import { Command, CommandsResult, Coordinates, MovementCommand, TurnCommand } from "./types"

import { UnionToArray } from "./helpers/union"

export function isTurnCommand(command: Command): command is TurnCommand {
    const turnCommands: UnionToArray<TurnCommand> = ['⬅', '➡']
    return (turnCommands as Command[]).includes(command)
}

export function isMovementCommand(command: Command): command is MovementCommand {
    const movementCommands: UnionToArray<MovementCommand> = ['⬆', '⬇']
    return (movementCommands as Command[]).includes(command)
}
