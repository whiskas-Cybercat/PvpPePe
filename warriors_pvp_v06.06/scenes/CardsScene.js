export default class CardsScene extends Phaser.Scene {
  constructor() {
    super('CardsScene'); // Уникальный ключ сцены
  }

  preload() {
    // Загружаем однотонный фон
    this.load.image('defaultBG', 'assets/backgroundBASIC.png');
  }

  create() {
    const { width: screenW, height: screenH } = this.scale;
    const centerX = screenW / 2;

    // 🎨 Устанавливаем фоновое изображение
    this.add.image(centerX, screenH / 2, 'defaultBG')
      .setOrigin(0.5)
      .setDepth(0);

    // 📦 Секция пассивных карточек
    const passiveTitleY = 220; // Отступ заголовка от верха
    const cardSpacing = 90;    // Расстояние между карточками
    const cardWidth = 320;
    const cardHeight = 80;

    // Заголовок пассивов
    this.add.text(centerX, passiveTitleY, 'Passive Cards', {
      fontSize: '28px',
      fontFamily: 'MOLOT',
      color: '#000'
    }).setOrigin(0.5);

    // Карточки пассивов
    for (let i = 0; i < 3; i++) {
      const cardY = passiveTitleY + 50 + i * cardSpacing;
      this.add.rectangle(centerX, cardY, cardWidth, cardHeight, 0x2e2e2e)
        .setStrokeStyle(2, 0xffffff);
      this.add.text(centerX, cardY, `Passive Card ${i + 1}`, {
        fontSize: '20px',
        fontFamily: 'MOLOT',
        color: '#ffffff'
      }).setOrigin(0.5);
    }

    // ⚔️ Секция активных карточек
    const skillTitleY = passiveTitleY + 50 + 3 * cardSpacing + 40;

    this.add.text(centerX, skillTitleY, 'Skill Cards', {
      fontSize: '28px',
      fontFamily: 'MOLOT',
      color: '#000'
    }).setOrigin(0.5);

    for (let i = 0; i < 3; i++) {
      const skillCardY = skillTitleY + 50 + i * cardSpacing;
      this.add.rectangle(centerX, skillCardY, cardWidth, cardHeight, 0x2e2e2e)
        .setStrokeStyle(2, 0xffffff);
      this.add.text(centerX, skillCardY, `Skill Card ${i + 1}`, {
        fontSize: '20px',
        fontFamily: 'MOLOT',
        color: '#ffffff'
      }).setOrigin(0.5);
    }

    // 🔙 Кнопка возврата в главное меню
    const backBtn = this.add.text(centerX, screenH - 80, 'BACK', {
      fontSize: '24px',
      fontFamily: 'MOLOT',
      backgroundColor: '#ffd400',
      color: '#000000'
    }).setPadding(10)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    backBtn.on('pointerdown', () => {
      this.scene.start('MenuScene'); // Возврат в основное меню
    });
  }
}
