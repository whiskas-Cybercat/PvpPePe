export default class BattlePassScene extends Phaser.Scene {
  constructor() {
    super('BattlePassScene');
  }
 preload() {
   this.load.image('defaultBG', 'assets/backgroundBASIC.png');

  }
  create() {
    const { width, height } = this.scale;

    // 🎨 Background
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'defaultBG')
   .setOrigin(0.5)
   .setDepth(0);


    // 🏷️ Title
    this.add.text(width / 2, 50, 'BATTLE PASS', {
      fontFamily: 'Comic Sans MS',
      fontSize: '42px',
      color: '#ffcc00',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // 🧱 Level
    this.add.text(width / 2, 120, 'Level: 5', {
      fontFamily: 'Comic Sans MS',
      fontSize: '28px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // 📊 Progress Bar
    this.add.rectangle(width / 2 - 100, 160, 200, 14, 0x444444).setOrigin(0, 0.5);
    this.add.rectangle(width / 2 - 100, 160, 120, 14, 0xffcc00).setOrigin(0, 0.5); // 60%

    // 🎁 Rewards
    const rewards = [
      '💎 100 Gems',
      '🪙 1000 Coins',
      '🎴 Unit Card',
      '🧪 XP Booster',
      '🔥 Unique Skin'
    ];

    this.add.text(width / 2, 210, 'REWARDS', {
      fontFamily: 'Comic Sans MS',
      fontSize: '26px',
      color: '#ffffff',
      underline: true
    }).setOrigin(0.5);

    for (let i = 0; i < rewards.length; i++) {
      this.add.text(60, 250 + i * 44, `• ${rewards[i]}`, {
        fontFamily: 'Comic Sans MS',
        fontSize: '22px',
        color: '#ffffff'
      });
    }

    // 🔙 Back Button
    const back = this.add.text(width / 2, height - 50, 'Back', {
      fontFamily: 'Comic Sans MS',
      fontSize: '26px',
      backgroundColor: '#333',
      padding: { x: 12, y: 8 },
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive();

    back.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}
