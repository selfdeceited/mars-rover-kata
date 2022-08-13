import { Command, CommandsResult, Coordinates, MovementCommand } from "./types"
import { Direction, turns } from "./turn"
import { isMovementCommand, isTurnCommand } from "./guards"

import { Planet } from "./Planet"
import { movements } from "./movement"

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
      } else if (isTurnCommand(command)) {
        this.#direction = turns[command](this.#direction)
      }
    })

    return detectedObstacle ? { detectedObstacle } : "success"
  }

  #handleMovement(command: MovementCommand, detectedObstacle?: Coordinates): Coordinates | undefined {
    const move = movements[command](this.#direction)
    let { x, y } = move({ x: this.#x, y: this.#y })

    const planetValidation = this.#validatePlanet({ x, y })
    if (planetValidation.success) {
      this.#x = planetValidation.coordinates.x
      this.#y = planetValidation.coordinates.y
    } else {
      detectedObstacle = planetValidation.coordinates
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
