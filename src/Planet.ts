import { Coordinates } from "./types"

export class Planet {
    #size: number
    #obstacles?: Array<Coordinates>

    constructor(_: {size: number, obstacles?: Array<Coordinates>}){
        this.#size = _.size
        this.#obstacles = _.obstacles
    }

    public get size(): number {
        return this.#size
    }

    public validateMapEdges(moveAttempt: Coordinates): Coordinates {
        let { x, y } = moveAttempt
    
        if (x < 0) { x = this.#size }
        if (y < 0) { y = this.#size }
        if (x > this.#size) { x = 0 }
        if (y > this.#size) { y = 0 }
    
        return { x, y }
    }

    public detectObstacles(_: Coordinates): boolean {
        if (!this.#obstacles)
            return false

        return this.#obstacles.some(o => o.x === _.x && o.y === _.y)
    }
}