export default class ShopScene extends Phaser.Scene {
  constructor() {
    super('ShopScene');
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
  
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

   

    // Заголовок
    this.add.text(centerX, 120, 'SHOP', {
      fontSize: '64px',
      fontFamily: 'MOLOT',
      color: '#000'
    }).setOrigin(0.5);

    // Пример бустеров
    const items = [
      { name: 'XP Booster', price: '30 Gems' },
      { name: 'Speed Buff', price: '100 Coins' },
      { name: 'PENIS PABLO', price: ' 100 BTC' },
      { name: 'pass premium', price: '777 TON' }
    ];

    items.forEach((item, i) => {
      const y = 400 + i * 100;
      this.add.text(centerX - 160, y, item.name, {
        fontSize: '32px',
        fontFamily: 'MOLOT',
        color: '#000'
      }).setOrigin(0, 0.5);

      this.add.text(centerX + 80, y, item.price, {
        fontSize: '32px',
        fontFamily: 'MOLOT',
        color: '#000'
      }).setOrigin(0, 0.5);
    });

    // Кнопка возврата
    const backBtn = this.add.text(centerX, 1000, 'BACK', {
      fontSize: '24px',
      fontFamily: 'MOLOT',
      backgroundColor: '#ffd400',
      color: '#000'
    }).setPadding(10).setOrigin(0.5).setInteractive({ useHandCursor: true });

    backBtn.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}
