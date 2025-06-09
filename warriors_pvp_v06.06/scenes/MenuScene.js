export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.image('background', 'assets/location.png');
    this.load.image('topBar', 'assets/top bar.png');
    this.load.image('speed', 'assets/speed.png');
    this.load.image('lucky', 'assets/lacky.png');
    this.load.image('battleBtn', 'assets/battle.png');
    this.load.image('downBar', 'assets/down bar.png');
    this.load.image('battlePassIcon', 'assets/skull1.png');
    this.load.image('bpBar', 'assets/skull.png');
    this.load.image('settings', 'assets/settings.png');

    // Валюты
    this.load.image('iconCoins', 'assets/coins.png');
    this.load.image('iconGems', 'assets/gems.png');

    // Кнопки даунбара
    this.load.image('btnLevelUp', 'assets/levelupstatic.png');
    this.load.image('btnCards', 'assets/cardsstatic.png');
    this.load.image('btnBattle', 'assets/fightstatic.png');
    this.load.image('btnPortal', 'assets/portalstatic.png');
    this.load.image('btnShop', 'assets/shopstatic.png');
  }

  create() {
    
    const screenW = this.scale.width;
    const screenH = this.scale.height;

    this.bg = this.add.tileSprite(0, 0, screenW, screenH, 'background')
      .setOrigin(0).setDepth(0);

    this.add.image(screenW / 2, 30, 'topBar').setScale(1).setDepth(1);

    const speedX = 80;
    const speedY = 160;
    this.add.image(speedX, speedY, 'speed').setScale(1.4).setDepth(1);
    this.add.text(speedX, speedY, '1.0.x', {
      fontFamily: 'MOLOT',
      fontSize: '18px',
      color: '#000000'
    }).setOrigin(0.5).setDepth(2);

    this.createButtonWithGlow(60, 240, 'settings', () => {
      this.scene.start('SettingsScene');
    }, 1.2, 2);

    // Валюты
    const currencyY = 50;
    const iconScale = 1.3;
    const coinsX = screenW - 190;
    const gemsX = screenW - 70;

    this.add.image(coinsX, currencyY, 'iconCoins')
      .setScale(iconScale)
      .setDepth(1.5)
      .setOrigin(0.5);

    this.add.text(coinsX + 35, currencyY, '12 M', {
      fontFamily:'MOLOT',
      fontSize: '26px',
      color: '#ffffff'
    }).setOrigin(0, 0.5).setDepth(2);

    this.add.image(gemsX, currencyY, 'iconGems')
      .setScale(iconScale)
      .setDepth(1.5)
      .setOrigin(0.5);

    this.add.text(gemsX + 35, currencyY, '80', {
      fontFamily: 'MOLOT',
      fontSize: '26px',
      color: '#ffffff'
    }).setOrigin(0, 0.5).setDepth(2);

    // Battle Pass
    const bpX = screenW - 80;
    const bpY = 200;

    this.battlePassBtn = this.createButtonWithGlow(bpX, bpY, 'battlePassIcon', () => {
      this.scene.start('BattlePassScene');
    }, 1.2, 2);

    const bpProgressY = bpY + 60;
    const bpBar = this.add.image(bpX, bpProgressY, 'bpBar')
      .setOrigin(0.5)
      .setScale(0.9)
      .setDepth(1);

    const barWidth = bpBar.displayWidth;
    const barHeight = bpBar.displayHeight;
    const current = 44;
    const max = 60;
    const progressRatio = current / max;
    const padding = 4;

    const progressGraphics = this.add.graphics().setDepth(2);
    progressGraphics.fillStyle(0xffd400, 1);
    progressGraphics.fillRoundedRect(
      bpX - barWidth / 2 + padding,
      bpProgressY - barHeight / 2 + padding,
      (barWidth - padding * 2) * progressRatio,
      barHeight - padding * 2,
      8
    );

    const maskShape = this.make.graphics({ x: 0, y: 0, add: false });
    maskShape.fillRect(
      bpX - barWidth / 2 + padding,
      bpProgressY - barHeight / 2 + padding,
      barWidth - padding * 2,
      barHeight - padding * 2
    );
    const mask = maskShape.createGeometryMask();
    progressGraphics.setMask(mask);

    this.add.text(bpX, bpProgressY + 25, `Lvl 5`, {
      fontFamily: 'MOLOT',
      fontSize: '16px',
      color: '#ffffff'
    }).setOrigin(0.5).setDepth(2);

    // Lucky
    this.luckyBtn = this.createButtonWithGlow(screenW - 80, 400, 'lucky', () => {
      this.scene.stop('MenuScene'); // 💥 остановить текущую
      this.scene.start('LuckyScene'); // ➡ перейти в новую

    }, 1.4, 2);

    // Battle
    this.battleBtn = this.createButtonWithGlow(
  screenW / 2, screenH / 2 + 200,
  'battleBtn',
  () => {
    this.scene.stop('MenuScene');         // остановим текущее меню
    this.scene.start('TestBattleScene');  // запустим бой
  },
  1.4, 2
);


    // Нижняя панель
    const bottomY = screenH - 32;
    this.add.image(screenW / 2, bottomY, 'downBar').setScale(0.85).setDepth(1);

    const keys = ['btnPortal', 'btnLevelUp', 'btnBattle', 'btnCards', 'btnShop'];
    const messages = ['Портал', 'Прокачка', 'Битва', 'Карты', 'Магазин'];

    const spacing = screenW / keys.length;
    const firstX = spacing / 2;

    for (let i = 0; i < keys.length; i++) {
      this.createDownBarButton(firstX + i * spacing, bottomY, keys[i], messages[i], 2);
    }
  }

  update() {
    this.bg.tilePositionX += 0.5;
  }

  createButtonWithGlow(x, y, key, callback, scale = 1.2, depth = 2) {
    const glow = this.add.graphics().setDepth(depth - 1);
    glow.fillStyle(0xffff66, 0.5);
    glow.fillCircle(x, y, 60);
    glow.setVisible(false);

    const btn = this.add.image(x, y, key)
      .setInteractive({ useHandCursor: true })
      .setScale(scale)
      .setDepth(depth);

    btn.on('pointerdown', () => {
      glow.setVisible(true);
      this.tweens.add({
        targets: btn,
        scale: scale * 1.1,
        duration: 100,
        yoyo: true,
        onComplete: () => {
          glow.setVisible(false);
          callback();
        }
      });
    });

    return btn;
  }

  createDownBarButton(x, y, key, message, depth = 2) {
    const glow = this.add.graphics().setDepth(depth - 1);
    glow.fillStyle(0xffff66, 0.5);
    glow.fillCircle(x, y, 60);
    glow.setVisible(false);

    const btn = this.add.image(x, y, key)
      .setInteractive({ useHandCursor: true })
      .setScale(1.0)
      .setDepth(depth);

    btn.on('pointerdown', () => {
      glow.setVisible(true);
      this.tweens.add({
        targets: btn,
        scale: 1.2,
        duration: 100,
        yoyo: true,
        onComplete: () => {
          glow.setVisible(false);

          // переключение сцен
          if (message === 'Магазин') {
            this.scene.start('ShopScene');
          } else if (message === 'Карты') {
            this.scene.start('CardsScene');
          } else if (message === 'Прокачка') {
            this.scene.start('LevelUpScene');
          } else if (message === 'Портал') {
            this.scene.start('PortalScene');
          } else {
            console.log(message);
          }
        }
      });
    });

    return btn;
  }
}
