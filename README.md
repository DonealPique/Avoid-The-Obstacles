# **Avoid the Obstacles**

## **Overview**

"Avoid the Obstacles" is a simple yet engaging game developed using the Phaser framework. The objective is to control a green player circle, dodging incoming obstacles while surviving for as long as possible. Collect the green power-up ball to gain temporary powers, which allow you to destroy enemies while they try to avoid you.

This game is lightweight, fully playable in a browser, and perfect for testing reflexes and quick decision-making skills.

---

## **How to Play**

1. **Objective**:
   - Avoid red obstacles for as long as possible.
   - Collect green power-up balls to temporarily destroy enemies and increase your score.

2. **Controls**:
   - **Arrow Keys**:
     - Move Up: `↑`
     - Move Down: `↓`
     - Move Left: `←`
     - Move Right: `→`

3. **Power-Up Features**:
   - A green ball will appear every 10 seconds.
   - Collect it to:
     - Temporarily grow larger.
     - Push enemies away or destroy them on contact.
   - The power-up lasts for 5 seconds.

4. **Difficulty**:
   - The game gets harder over time:
     - Enemies spawn every 8 seconds, with up to 3 spawning at a time.
     - Enemies follow the player, requiring you to continuously dodge.

---

## **Scoring**

- **Score**:
  - The score increases as time passes.
  - Collecting power-ups and surviving longer results in higher scores.

- **High Score**:
  - Your highest score and longest survival time are saved in your browser.
  - Even if you refresh or close the game, your high scores are preserved.

---

## **How to Play Online**

1. Open the game URL hosted on **GitHub Pages**:
   [Play Avoid the Obstacles](https://donealpique.github.io/Avoid-The-Obstacles/)

2. The game is fully playable in any modern browser, including:
   - Chrome
   - Firefox
   - Edge
   - Safari

---

## **Technologies Used**

- **Phaser**: Game development framework.
- **TypeScript**: For strongly typed, clean, and maintainable code.
- **GitHub Pages**: For easy hosting and accessibility.
- **HTML5 & CSS**: For seamless rendering across devices.

---

## **How to Run Locally**

If you'd like to run or modify the game locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/DonealPique/Avoid-The-Obstacles.git
   cd Avoid-The-Obstacles
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed, then run:

   ```bash
   npm install
   ```

3. **Build the Game**:

   ```bash
   npm run build
   ```

4. **Run the Game**:
   Start a development server to play the game locally:

   ```bash
   npm start
   ```

5. **Open in Browser**:
   - Navigate to `http://localhost:8080` in your browser to play.

---
