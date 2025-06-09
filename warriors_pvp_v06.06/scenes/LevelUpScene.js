export default class LevelUpScene extends Phaser.Scene {
  constructor() {
    super('LevelUpScene');
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
    const screenW = this.scale.width;
    const screenH = this.scale.height;

    

    const textStyle = {
      fontFamily: 'MOLOT',
      fontSize: '24px',
      color: '#000'
    };

    // Модификаторы атаки и здоровья (чуть ниже)
    const modifierY = 120;
    this.add.text(30, modifierY, 'Attack Bonus: x22 (8000)', textStyle);
    this.add.text(30, modifierY + 30, 'Health Bonus: x1.6 (626)', textStyle);

    // Только 3 юнита: Warrior, Archer, Warlord
    const units = [
      { name: 'Warrior', power: '750' },
      { name: 'Archer', power: '670' },
      { name: 'Warlord', power: '1200' }
    ];

    const startY = modifierY + 100;
    const spacingY = 100;

    for (let i = 0; i < units.length; i++) {
      const y = startY + i * spacingY;
      this.add.text(screenW / 2 - 100, y, `${units[i].name}`, textStyle).setOrigin(0.5);
      this.add.text(screenW / 2 + 80, y, `Damage: ${units[i].power}`, textStyle).setOrigin(0.5);
    }

    // Нижняя информация
    this.add.text(screenW / 2, screenH - 400, 'Food Production: +12/min', textStyle).setOrigin(0.5);
    this.add.text(screenW / 2, screenH - 60, 'Base HP: 10,000', textStyle).setOrigin(0.5);
  }
}
