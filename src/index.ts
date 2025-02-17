import Phaser from 'phaser';
import StartScreen from './StartScreen';
import GameScene from './GameScene';
import EndScreen from './EndScreen';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.RESIZE, 
    autoCenter: Phaser.Scale.CENTER_BOTH, 
    width: window.innerWidth, 
    height: window.innerHeight, 
  },
  scene: [StartScreen, GameScene, EndScreen], 
  physics: {
    default: 'arcade',
    arcade: {
      debug: false, 
    },
  },
};

new Phaser.Game(config);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((error) => console.error("Service Worker registration failed:", error));
}