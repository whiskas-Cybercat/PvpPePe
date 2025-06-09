export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: false });
  }

  preload() {
    this.load.image('topBar', 'assets/top bar.png');
    this.load.image('downBar', 'assets/down bar.png');
    this.load.image('iconProfile', 'assets/profile.png');

    this.load.image('btnLevelUp', 'assets/levelupstatic.png');
    this.load.image('btnCards', 'assets/cardsstatic.png');
    this.load.image('btnBattle', 'assets/fightstatic.png');
    this.load.image('btnPortal', 'assets/portalstatic.png');
    this.load.image('btnShop', 'assets/shopstatic.png');

    this.load.image('iconCoins', 'assets/coins.png');
    this.load.image('iconGems', 'assets/gems.png');
  }

  create() {
    const screenW = this.scale.width;
    const screenH = this.scale.height;

    // 🧱 Верхняя панель (TopBar)
    this.add.image(screenW / 2, 30, 'topBar')
      .setScale(1)
      .setDepth(100);

    // 👤 Кнопка профиля
    const profileBtn = this.add.image(screenW - 300, 42, 'iconProfile')
      .setInteractive({ useHandCursor: true })
      .setScale(0.5)
      .setDepth(101);

    profileBtn.on('pointerdown', () => {
      this.goToScene('ProfileScene');
    });

    // 💰 Валюта
    const currencyY = 50;
    const iconScale = 1.3;
    const coinsX = screenW - 550;
    const gemsX = screenW - 90;

    this.add.image(coinsX, currencyY, 'iconCoins')
      .setScale(iconScale)
      .setOrigin(0.5)
      .setDepth(100);

    this.add.text(coinsX + 35, currencyY, '12m', {
      fontFamily: 'MOLOT',
      fontSize: '26px',
      color: '#ffffff'
    }).setOrigin(0, 0.5).setDepth(101);

    this.add.image(gemsX, currencyY, 'iconGems')
      .setScale(iconScale)
      .setOrigin(0.5)
      .setDepth(100);

    this.add.text(gemsX + 35, currencyY, '80', {
      fontFamily: 'MOLOT',
      fontSize: '26px',
      color: '#ffffff'
    }).setOrigin(0, 0.5).setDepth(101);

    // ⬇️ Нижняя панель
    const bottomY = screenH - 32;
    this.add.image(screenW / 2, bottomY, 'downBar').setScale(0.85).setDepth(100);

    // 🔘 Кнопки нижнего бара
    const buttons = [
      { key: 'btnPortal', scene: 'PortalScene' },
      { key: 'btnLevelUp', scene: 'LevelUpScene' },
      { key: 'btnBattle', scene: 'MenuScene' },
      { key: 'btnCards', scene: 'CardsScene' },
      { key: 'btnShop', scene: 'ShopScene' },
    ];

    const spacing = screenW / buttons.length;
    const startX = spacing / 2;

    this.buttonRefs = [];

    buttons.forEach((btn, index) => {
      const x = startX + index * spacing;

      const image = this.add.image(x, bottomY, btn.key)
        .setInteractive({ useHandCursor: true })
        .setScale(1.0)
        .setDepth(101);

      image.originalY = bottomY;

      image.on('pointerdown', () => {
        this.setActiveButton(image);
        this.goToScene(btn.scene);
      });

      this.buttonRefs.push(image);
    });
  }

  /**
   * 🔼 Поднимает активную кнопку, остальные возвращает
   */
  setActiveButton(activeImage) {
    this.buttonRefs.forEach(image => {
      const targetY = image === activeImage
        ? image.originalY - 32  // поднимаем на 32px (примерно 20%)
        : image.originalY;

      this.tweens.add({
        targets: image,
        y: targetY,
        duration: 150,
        ease: 'Sine.easeOut'
      });
    });
  }

  /**
   * 🚀 Переключение между сценами
   */
  goToScene(targetKey) {
    const allScenes = [
      'MenuScene',
      'LuckyScene',
      'BattlePassScene',
      'SettingsScene',
      'ShopScene',
      'CardsScene',
      'LevelUpScene',
      'PortalScene',
      'ProfileScene'
    ];

    allScenes.forEach(scene => {
      if (this.scene.isActive(scene) && scene !== targetKey) {
        this.scene.stop(scene);
      }
    });

    if (!this.scene.isActive(targetKey)) {
      this.scene.launch(targetKey);
    }

    this.scene.bringToTop('UIScene');
  }
}
