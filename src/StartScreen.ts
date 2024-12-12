import Phaser from 'phaser';

export default class StartScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScreen' });
  }

  create() {
    const { width, height } = this.scale;

    
    this.add.text(width / 2, height / 3, 'Avoid the Obstacles', {
      fontSize: '40px',
      color: '#ffffff',
    }).setOrigin(0.5);

    
    this.add.text(width / 2, height / 2, 'Use arrow keys to move and dodge enemies.', {
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 40, 'Collect the green ball for power-ups.', {
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    
    const startButton = this.add.text(width / 2, height / 1.5, 'Start Game', {
      fontSize: '30px',
      color: '#00ff00',
    })
      .setOrigin(0.5)
      .setInteractive();

    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    
    this.scale.on('resize', this.resize, this);
  }

  private resize(gameSize: Phaser.Structs.Size) {
    const width = gameSize.width;
    const height = gameSize.height;

    
    this.children.each((child) => {
      if (child instanceof Phaser.GameObjects.Text) {
        const text = child as Phaser.GameObjects.Text;

        
        if (text.text === 'Avoid the Obstacles') {
          text.setPosition(width / 2, height / 3);
        } else if (text.text.includes('Use arrow keys')) {
          text.setPosition(width / 2, height / 2);
        } else if (text.text.includes('Collect the green ball')) {
          text.setPosition(width / 2, height / 2 + 40);
        } else if (text.text === 'Start Game') {
          text.setPosition(width / 2, height / 1.5);
        }
      }
    });
  }
}
