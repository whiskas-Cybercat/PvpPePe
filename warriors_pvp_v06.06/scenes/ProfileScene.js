export default class ProfileScene extends Phaser.Scene {
  constructor() {
    super('ProfileScene');
  }

  preload() {
    this.load.image('defaultBG', 'assets/backgroundBASIC.png');
  }

  create() {
    // 🎨 Background
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'defaultBG')
   .setOrigin(0.5)
   .setDepth(0);
    const screenW = this.scale.width;
    const screenH = this.scale.height;

    const { width, height } = this.scale;


    this.add.text(width / 2, 150, 'My Profile', {
      fontFamily: 'Comic Sans MS',
      fontSize: '64px',
      color: '#f2c849'
    }).setOrigin(0.5).setDepth(1);

    this.add.text(width / 2, 250, 'Name: FroggyWarrior', {
      fontSize: '32px',
      color: '#f2c849'
    }).setOrigin(0.5).setDepth(1);

    this.add.text(width / 2, 290, 'Level: 12', {
      fontSize: '32px',
      color: '#3b2f1c'
    }).setOrigin(0.5).setDepth(1);

    this.add.text(width / 2, 340, 'Achievements:', {
      fontSize: '32px',
      color: '#3b2f1c'
    }).setOrigin(0.5).setDepth(1);

    const achievements = ['🐸 First Catch', '🔥 Fire Dodge', '👑 PvP Victor'];
    achievements.forEach((ach, index) => {
      this.add.text(width / 2, 400 + index * 40, ach, {
        fontSize: '32px',
        color: '#3b2f1c'
      }).setOrigin(0.5).setDepth(1);
    });

    // ✅ Примечание: Навигация осуществляется через UIScene.switchScene()
    // Кнопки навигации находятся в UIScene и автоматически переключают сцены
  }
}