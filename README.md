# Mars Rover Kata

[Original link](https://kata-log.rocks/mars-rover-kata)

## Your Task
You’re part of the team that explores Mars by sending remotely controlled vehicles to the surface of the planet. Develop an API that translates the commands sent from earth to instructions that are understood by the rover.

## Requirements
 - [x] You are given the initial starting point (x,y) of a rover and the direction (N, - S,E,W) it is facing.
 - [x] The rover receives a character array of commands.
 - [x] Implement commands that move the rover forward/backward (f,b).
 - [x] Implement commands that turn the rover left/right (l,r).
 - [x] Implement wrapping at edges. But be careful, planets are spheres.
 - [x] Connect the x edge to the other x edge, so (1,1) for x-1 to (5,1), but connect vertical edges towards themselves in inverted coordinates, so (1,1) for y-1 connects to (5,1).
 - [x] Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle.

## Rules
 - Hardcore TDD. No Excuses!
 - Change roles (driver, navigator) after each TDD cycle.
 - No red phases while refactoring.
 - Be careful about edge cases and exceptions. We can not afford to lose a mars rover, just because the developers overlooked a null pointer.