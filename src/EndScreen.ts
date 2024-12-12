import Phaser from 'phaser';

export default class EndScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScreen' });
  }

  create(data: { score: number; time: number; highestScore: number; highestTime: number }) {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 3 - 50, 'Game Over', {
      fontSize: '40px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 3, `Score: ${data.score}`, {
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 3 + 40, `Time: ${data.time}s`, {
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 3 + 80, `Highest Score: ${data.highestScore}`, {
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 3 + 120, `Longest Time: ${data.highestTime}s`, {
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const replayButton = this.add.text(width / 2, height / 1.5, 'Play Again', {
      fontSize: '30px',
      color: '#00ff00',
    })
      .setOrigin(0.5)
      .setInteractive();

    replayButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    const quitButton = this.add.text(width / 2, height / 1.5 + 50, 'Quit', {
      fontSize: '30px',
      color: '#ff0000',
    })
      .setOrigin(0.5)
      .setInteractive();

    quitButton.on('pointerdown', () => {
      this.scene.start('StartScreen');
    });
  }
}
