export default class PortalScene extends Phaser.Scene {
  constructor() {
    super('PortalScene');
  }

  preload() {
    this.load.image('defaultBG', 'assets/backgroundBASIC.png');
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'defaultBG')
      .setOrigin(0.5)
      .setDepth(0);

    this.add.text(this.scale.width / 2, 600, 'Still Cooking for you', {
      fontSize: '32px',
      color: '#000',
      fontFamily: 'MOLOT'
    }).setOrigin(0.5);
  }
}
