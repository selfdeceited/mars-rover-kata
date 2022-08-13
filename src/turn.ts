import { TurnCommand } from "./types"

export type Direction = 'north' | 'south' | 'east' | 'west'

const turnClockwise: Record<Direction, Direction> = {
    north: "east",
    south: "west",
    east: "south",
    west: "north"
}

const turnCounterclockwise: Record<Direction, Direction> = {
    north: "west",
    south: "east",
    east: "north",
    west: "south"
}

export const turns: Record<TurnCommand, (direction: Direction) => Direction> = {
    ['⬅']: direction => turnCounterclockwise[direction],
    ['➡']: direction => turnClockwise[direction]
}
