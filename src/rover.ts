import { Command, CommandsResult, Coordinates, MovementCommand } from "./types"
import { Direction, directionMap } from "./direction"
import { isDirectionCommand, isMovementCommand } from "./guards"

import { Planet } from "./Planet"
import { movementCommandMap } from "./movement"

type RoverStartInput = Coordinates & { looking: Direction, on?: Planet }

export class Rover {
  #x: number
  #y: number
  #direction: Direction
  #planet: Planet | undefined

  constructor({ x, y, looking, on }: RoverStartInput) {
    this.#x = x
    this.#y = y
    this.#direction = looking
    this.#planet = on
  }

  get isAt(): Coordinates {
    return { x: this.#x, y: this.#y }
  }

  receiveCommands(commands: Command[]): CommandsResult {
    let detectedObstacle: Coordinates

    commands.forEach((command) => {
      if (isMovementCommand(command)) {
        if (detectedObstacle)
            return

        detectedObstacle = this.#handleMovement(command, detectedObstacle)
      } else if (isDirectionCommand(command)) {
        this.#direction = directionMap[command](this.#direction)
      }
    })

    return detectedObstacle ? { detectedObstacle } : "success"
  }

  #handleMovement(command: MovementCommand, detectedObstacle?: Coordinates): Coordinates | undefined {
    let { x, y } = movementCommandMap[command]({ x: this.#x, y: this.#y }, this.#direction)

    const planetValidationResult = this.#validatePlanet({ x, y })
    if (planetValidationResult.success) {
      this.#x = planetValidationResult.coordinates.x
      this.#y = planetValidationResult.coordinates.y
    } else {
      detectedObstacle = planetValidationResult.coordinates
      return detectedObstacle
    }
  }

  #validatePlanet(coordinates: Coordinates): { success: boolean, coordinates: Coordinates } {
    if (!this.#planet) {
        return { success: true, coordinates }
    }

    let { x, y } = this.#planet.validateMapEdges(coordinates)

    if (this.#planet.detectObstacles({ x, y })) {
      return { success: false, coordinates: { x, y } }
    }

    return { success: true, coordinates: { x, y } }
  }
}
