# LogoHunt 🎮

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Game](https://img.shields.io/badge/Type-Logo%20Puzzle-FF6B6B)

LogoHunt is a fun and interactive logo puzzle game where players solve shuffled logo images by rearranging the pieces into the correct order. The game is designed to be simple, fast, and engaging, with a focus on puzzle-solving, competition, and leaderboard tracking.

## About the Game

LogoHunt challenges players to rebuild famous or custom logos by dragging and dropping puzzle pieces. Each round has a countdown timer, and players progress through multiple logo puzzles while trying to improve their score. The game also includes a leaderboard so players can compare their performance.

## Features

* Interactive puzzle gameplay
* Dynamic piece movement
* Countdown timer and progress tracking
* Home, Start, Puzzle, Completion, and Leaderboard screens
* Player name input and score tracking
* Local leaderboard persistence using browser storage
* Responsive UI built with React

## Technologies Used

* React
* Vite
* JavaScript
* HTML
* CSS
* react-dnd
* localStorage

## Project Structure

```bash
src/
├── assets/
│   ├── logohunt.png
│   ├── publicassetshome.png
│   ├── publicassetsstart.png
│   ├── publicassetspuzzle.png
│   ├── publicassetscompleted.png
│   └── publicassetsleaderboard.png
├── App.jsx
├── main.jsx
├── App.css
├── index.css
public/
├── logos/
│   ├── logo1.jpg
│   ├── logo2.jpg
│   └── ...
├── favicon.svg
index.html
package.json
vite.config.js
eslint.config.js
```

## Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center"><img src="./src/assets/publicassetshome.png" alt="Home Page" width="400" /></td>
      <td align="center"><img src="./src/assets/publicassetsstart.png" alt="Start Page" width="400" /></td>
    </tr>
    <tr>
      <td align="center"><img src="./src/assets/publicassetspuzzle.png" alt="Puzzle Page" width="400" /></td>
      <td align="center"><img src="./src/assets/publicassetscompleted.png" alt="Completed Page" width="400" /></td>
    </tr>
    <tr>
      <td align="center" colspan="2"><img src="./src/assets/publicassetsleaderboard.png" alt="Leaderboard Page" width="800" /></td>
    </tr>
  </table>
</div>

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed

Check your versions:

```bash
node -v
npm -v
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Sradha-Sivadas/logohunt.git
```

Go into the project folder:

```bash
cd logohunt
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal in your browser.

## Build for Production

To create a production build:

```bash
npm run build
```

To preview the built app:

```bash
npm run preview
```

## How to Play

1. Open the Home screen and click Start.
2. Enter your name on the Start page.
3. Click Start to begin the puzzle challenge.
4. Drag and drop the shuffled pieces to rebuild the logo.
5. Complete the puzzle before the timer runs out.
6. Solve several logos to progress through the game.
7. View your final result and check the leaderboard.

## Gameplay Overview

- Users begin on the Home page
- They enter their name before starting
- Each puzzle is a shuffled logo image broken into tiles
- Players drag and arrange the tiles into the correct layout
- A timer adds challenge and urgency to each round
- Players earn progress as they complete more puzzles
- The game ends with a completion screen and a leaderboard entry

## Author

Sradha S
