import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Arc;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private powerUp!: Phaser.GameObjects.Arc | null;
  private hasPowerUp: boolean = false;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private timer: number = 0;
  private highestScore: number = 0;
  private highestTime: number = 0;
  private direction: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
  private bgMusic!: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private gameOverSound!: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private powerUpSound!: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private powerUpEvent!: Phaser.Time.TimerEvent;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.audio('bgMusic', 'assets/8-bit-bg.mp3');
    this.load.audio('gameOverSound', 'assets/game-over-sfx.mp3');
    this.load.audio('powerUpSound', 'assets/pick-up-sfx.mp3');
  }

  create() {
    const savedHighestScore = localStorage.getItem('highestScore');
    this.highestScore = savedHighestScore ? parseInt(savedHighestScore, 10) : 0;

    const savedHighestTime = localStorage.getItem('highestTime');
    this.highestTime = savedHighestTime ? parseInt(savedHighestTime, 10) : 0;

    
    this.bgMusic = this.sound.add('bgMusic', { loop: true }) as Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    this.bgMusic.play();

    this.gameOverSound = this.sound.add('gameOverSound') as Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    this.powerUpSound = this.sound.add('powerUpSound') as Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

    this.timer = 0;
    this.score = 0;
    this.hasPowerUp = false;

    
    this.player = this.add.circle(this.scale.width / 2, this.scale.height / 2, 20, 0x00ff00);
    this.physics.add.existing(this.player);
    (this.player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    
    this.obstacles = this.physics.add.group();

    
    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', color: '#ffffff' });
    this.timerText = this.add.text(10, 40, 'Time: 0s', { fontSize: '20px', color: '#ffffff' });

    
    this.physics.add.overlap(
      this.player,
      this.obstacles,
      this.handleCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    
    this.time.addEvent({
      delay: 8000,
      callback: this.spawnEnemies,
      callbackScope: this,
      loop: true,
    });

    
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timer += 1;
        this.timerText.setText(`Time: ${this.timer}s`);
      },
      callbackScope: this,
      loop: true,
    });

    
    this.powerUpEvent = this.time.addEvent({
      delay: 10000,
      callback: this.managePowerUp,
      callbackScope: this,
      loop: true,
    });

    if (this.input?.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }

  update() {
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.left?.isDown) this.direction.set(-1, 0);
    if (this.cursors.right?.isDown) this.direction.set(1, 0);
    if (this.cursors.up?.isDown) this.direction.set(0, -1);
    if (this.cursors.down?.isDown) this.direction.set(0, 1);

    playerBody.setVelocity(this.direction.x * 200, this.direction.y * 200);

    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);

    this.updateObstaclesBehavior();
  }

  private spawnEnemies() {
    for (let i = 0; i < 3; i++) {
      const side = Phaser.Math.Between(0, 3);
      let x = 0, y = 0;

      if (side === 0) {
        x = Phaser.Math.Between(0, this.scale.width);
        y = 0;
      } else if (side === 1) {
        x = Phaser.Math.Between(0, this.scale.width);
        y = this.scale.height;
      } else if (side === 2) {
        x = 0;
        y = Phaser.Math.Between(0, this.scale.height);
      } else {
        x = this.scale.width;
        y = Phaser.Math.Between(0, this.scale.height);
      }

      const obstacle = this.add.circle(x, y, 15, 0xff0000);
      this.physics.add.existing(obstacle);
      const obstacleBody = obstacle.body as Phaser.Physics.Arcade.Body;
      obstacleBody.setCollideWorldBounds(true);

      this.obstacles.add(obstacle);
    }
  }

  private managePowerUp() {
    if (!this.powerUp) {
      this.spawnPowerUp();
    } else {
      this.repositionPowerUp();
    }
  }

  private spawnPowerUp() {
    const x = Phaser.Math.Between(50, this.scale.width - 50);
    const y = Phaser.Math.Between(50, this.scale.height - 50);

    this.powerUp = this.add.circle(x, y, 15, 0x00ff00);
    this.physics.add.existing(this.powerUp);

    this.physics.add.overlap(
      this.player,
      this.powerUp,
      this.collectPowerUp as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );
  }

  private repositionPowerUp() {
    if (this.powerUp) {
      this.powerUp.x = Phaser.Math.Between(50, this.scale.width - 50);
      this.powerUp.y = Phaser.Math.Between(50, this.scale.height - 50);
    }
  }

  private collectPowerUp(player: Phaser.GameObjects.GameObject, powerUp: Phaser.GameObjects.GameObject) {
    powerUp.destroy();
    this.powerUp = null;
    this.hasPowerUp = true;

    this.player.setScale(1.5);
    this.powerUpSound.play();
    this.bgMusic.setDetune(-500); 

    this.time.delayedCall(5000, () => {
      this.hasPowerUp = false;
      this.player.setScale(1);
      this.bgMusic.setDetune(0); 
    });
  }

  private handleCollision(player: Phaser.GameObjects.GameObject, obstacle: Phaser.GameObjects.GameObject) {
    if (this.hasPowerUp) {
      obstacle.destroy();
      return;
    }

    this.bgMusic.stop();
    this.gameOverSound.play();

    if (this.score > this.highestScore) {
      this.highestScore = this.score;
      localStorage.setItem('highestScore', this.highestScore.toString()); 
    }

    if (this.timer > this.highestTime) {
      this.highestTime = this.timer;
      localStorage.setItem('highestTime', this.highestTime.toString()); 
    }

    this.scene.start('EndScreen', {
      score: this.score,
      time: this.timer,
      highestScore: this.highestScore,
      highestTime: this.highestTime,
    });
  }

  private updateObstaclesBehavior() {
    this.obstacles.getChildren().forEach((obstacle) => {
      const obstacleBody = (obstacle as Phaser.GameObjects.Arc).body as Phaser.Physics.Arcade.Body;

      if (this.hasPowerUp) {
        const dx = obstacleBody.x - this.player.x;
        const dy = obstacleBody.y - this.player.y;
        const angle = Math.atan2(dy, dx);

        obstacleBody.setVelocity(Math.cos(angle) * 20, Math.sin(angle) * 20);
      } else {
        const dx = this.player.x - obstacleBody.x;
        const dy = this.player.y - obstacleBody.y;
        const angle = Math.atan2(dy, dx);

        obstacleBody.setVelocity(Math.cos(angle) * 40, Math.sin(angle) * 40);
      }
    });
  }
}
