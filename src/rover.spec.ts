import { Planet } from "./Planet"
import { Rover } from "./Rover"

describe("when rover is placed", () => {
    it('should be able to move forward', () => {
        const rover = new Rover({ x: 0, y: 0, looking: 'north' })

        rover.receiveCommands(['⬆'])

        expect(rover.isAt).toEqual({ x: 0, y: 1 })
    })

    it('should be able to move backward', () => {
        const rover = new Rover({ x: 0, y: 0, looking: 'north' })

        rover.receiveCommands(['⬇', '⬇'])

        expect(rover.isAt).toEqual({ x: 0, y: -2 })
    })

    it('should be able to move forward and backward', () => {
        const rover = new Rover({ x: 5, y: 5, looking: 'south' })

        rover.receiveCommands(['⬆', '⬆', '⬇', '⬆'])

        expect(rover.isAt).toEqual({ x: 5, y: 3 })
    })


    it('should be able to change direction', () => {
        const rover = new Rover({ x: 0, y: 0, looking: 'north' })

        rover.receiveCommands(['⬇', '⬅', '⬆', '➡', '⬆'])

        expect(rover.isAt).toEqual({ x: -1, y: 0 })
    })

    it('should be able to change direction in more complex cases', () => {
        const rover = new Rover({ x: 0, y: 0, looking: 'north' })

        rover.receiveCommands(['⬇', '➡', '⬇', '⬇', '⬇', '⬇', '➡', '⬆', '⬇', '➡', '⬇'])

        expect(rover.isAt).toEqual({ x: -3, y: -1 })
    })

    describe("on a planet", () => {
        it('should come back after reaching the planet end', () => {
            const mars = new Planet({ size: 10 })
            const rover = new Rover({ x: 0, y: 0, looking: 'north', on: mars })

            rover.receiveCommands(Array(mars.size + 1).fill('⬆'))

            expect(rover.isAt).toEqual({ x: 0, y: 0 })
        })
    
        it('should return positive result based on a planet size', () => {
            const mars = new Planet({ size: 10 })
            const rover = new Rover({ x: 0, y: 0, looking: 'north', on: mars })

            rover.receiveCommands(['⬇', '➡', '⬇'])

            expect(rover.isAt).toEqual({x: 10, y: 10})
        })

        // todo: mb cover if [10, 10] to be the same as [3,3] since it's not a square...
        it('should cover edge of the map from both sides', () => {
            const mars = new Planet({ size: 10 })
            const rover = new Rover({ x: 0, y: 0, looking: 'north', on: mars })
            const moveForward = Array(mars.size + 1).fill('⬆')

            rover.receiveCommands(['➡', ...moveForward, '⬅', ...moveForward])

            expect(rover.isAt).toEqual({ x: 0, y: 0 })
        })

        it('should report when obstacles happen', () => {
            const expectedObstacle = { x: 2, y: 2 }
            const mars = new Planet({ size: 10, obstacles: [
                { x: 0, y: 0 },
                expectedObstacle,
                { x: 3, y: 0 },
                { x: 4, y: 0 }
            ]})

            const rover = new Rover({ x: 1, y: 1, looking: 'east', on: mars })

            const result = rover.receiveCommands([
                '⬆', '⬅',  // before an obstacle
                '⬆'     ,  // oops
                '⬅', '⬆'  // this should not matter as we already bumped into an obstacle
            ])

            expect(rover.isAt).toEqual({ x: 2, y: 1 })
            expect((result as any).detectedObstacle).toEqual(expectedObstacle)
        })
    })
})