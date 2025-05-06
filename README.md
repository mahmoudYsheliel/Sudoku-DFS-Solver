# Sudoku DFS Solver
  sudoku is one of the most popular games world wide. In this project, we try to solve the game in fastest way possible.

![Screencast from 05-06-2025 04-36-28 PM](https://github.com/user-attachments/assets/68fff0e5-2f0e-4512-8b9c-5d8b3a27ebd9)


## Problem Complexity
- Sudoku is 9 * 9 grid with 81 elements
- Each Cell can be a number between 1 and 9
- In medium problem difficulity, 50 cells are empty
- This makes the number of possible solutions  9^50
- Given that fastest processor can handle 3* 10^9 process per second
- This means we need at least 5 * 10^30 years to test all cases

## How it Works
- First, use some methodologies to reduce the count of empty cells (naked single, hiden single, naked pairs, naked trible, naked quads, pointing pairs, claiming pairs)
- Then, use DFS with some modification:
  - After adding new cell, check if this breaks any if the rules
  - if yes, try another number
  - if no, continue
 
## Algorithm Enhancment Level:
this reduces the total time from 5 * 10^30 years to 5 seconds
