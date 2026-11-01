# LogoHunt 🎮

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

LogoHunt is a browser-based logo puzzle game where players rearrange shuffled image pieces to recreate a logo before time runs out.

## About the Game

LogoHunt turns logo recognition into a fast, fun puzzle challenge. Players enter their name, start a round, and drag pieces into the correct position to complete each logo. The game tracks time, progress, and leaderboard scores for a simple competitive experience.

## Features

- Drag-and-drop logo puzzles
- Countdown timer for each round
- Multiple levels of gameplay
- Home, start, puzzle, completion, and leaderboard screens
- Leaderboard saved in the browser
- Simple, responsive UI

## Tech Stack

- React
- Vite
- JavaScript
- HTML
- CSS
- react-dnd
- localStorage

## Project Structure

```bash
src/
├── App.jsx
├── main.jsx
├── App.css
├── index.css
├── assets/
public/
├── logos/
README.md
package.json
vite.config.js
index.html
```

## Screenshots

### Home Page
<img src="./src/assets/publicassetshome.png" alt="Home Page" width="800" />

### Start Page
<img src="./src/assets/publicassetsstart.png" alt="Start Page" width="800" />

### Puzzle Page
<img src="./src/assets/publicassetspuzzle.png" alt="Puzzle Page" width="800" />

### Completed Page
<img src="./src/assets/publicassetscompleted.png" alt="Completed Page" width="800" />

### Leaderboard Page
<img src="./src/assets/publicassetsleaderboard.png" alt="Leaderboard Page" width="800" />

## Prerequisites

Make sure you have:

- Node.js
- npm

Check with:

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

Start the app:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## How to Play

1. Open the Home page and click Start.
2. Enter your name.
3. Start the puzzle round.
4. Drag and drop the shuffled pieces to rebuild the logo.
5. Finish before the timer runs out.
6. Complete more rounds to improve your score.
7. Check the leaderboard after finishing.

## Author

Sradha S
