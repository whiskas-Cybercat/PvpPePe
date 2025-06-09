export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super('SettingsScene');
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.add.rectangle(centerX, centerY, 400, 500, 0x000000, 0.6).setOrigin(0.5).setDepth(0);
    this.add.text(centerX, 100, 'Settings', {
      fontSize: '32px',
      fontFamily: 'Comic Sans MS',
      color: '#ffffff'
    }).setOrigin(0.5);

    const options = ['Sound', 'Music', 'Vibration', 'Graphics'];
    this.settings = {
      Sound: true,
      Music: true,
      Vibration: false,
      Graphics: true
    };

    options.forEach((opt, i) => {
      const y = 180 + i * 70;
      const label = this.add.text(centerX - 100, y, opt, {
        fontSize: '24px',
        fontFamily: 'Comic Sans MS',
        color: '#ffffff'
      }).setOrigin(0, 0.5);

      const toggle = this.add.text(centerX + 100, y, this.settings[opt] ? 'ON' : 'OFF', {
        fontSize: '24px',
        fontFamily: 'Comic Sans MS',
        color: this.settings[opt] ? '#00ff00' : '#ff0000',
        backgroundColor: '#333',
        padding: { x: 10, y: 5 }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      toggle.on('pointerdown', () => {
        this.settings[opt] = !this.settings[opt];
        toggle.setText(this.settings[opt] ? 'ON' : 'OFF');
        toggle.setColor(this.settings[opt] ? '#00ff00' : '#ff0000');
      });
    });

    const backBtn = this.add.text(centerX, 500, 'BACK', {
      fontSize: '24px',
      fontFamily: 'Comic Sans MS',
      backgroundColor: '#ffd400',
      color: '#000'
    }).setPadding(10).setOrigin(0.5).setInteractive({ useHandCursor: true });

    backBtn.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}
