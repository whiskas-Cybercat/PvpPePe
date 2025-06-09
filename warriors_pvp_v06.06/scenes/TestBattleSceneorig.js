export default class TestBattleScene extends Phaser.Scene {
  constructor() {
    super('TestBattleScene');
  }

  preload() {
    this.load.image('battleBg', 'assets/location.png');
    this.load.image('foodButton', 'assets/FOODBUTTON.png');
    this.load.image('downbarBattle', 'assets/downbar_buttle.png');
    this.load.image('dailyQuestPanel', 'assets/dailyquest_butlle.png');
    this.load.image('topBar', 'assets/top bar.png');
    this.load.image('speed', 'assets/speed.png');
    this.load.image('iconProfile', 'assets/profile.png');
    this.load.image('iconCoins', 'assets/coins.png');
    this.load.image('iconGems', 'assets/gems.png');
    this.load.image('Button', 'assets/unit_button.png');
    this.load.image('baseLeft', 'assets/bazes/CAVE/caveL_1_part.png');
    this.load.image('baseLeft2', 'assets/bazes/CAVE/caveL_2_part.png');
    this.load.image('baseLeft3', 'assets/bazes/CAVE/caveL_3_part.png');
    this.load.image('baseRight', 'assets/bazes/CAVE/caveR_1_part.png');
    this.load.image('baseRight2', 'assets/bazes/CAVE/caveR_2_part.png');
    this.load.image('baseRight3', 'assets/bazes/CAVE/caveR_3_part.png');
  }

  create() {
    const screenW = this.scale.width;
    const screenH = this.scale.height;

    this.scene.stop('UIScene');

    this.meat = 0;
    this.maxMeat = 500;

    // Фон и нижняя панель
    this.add.image(screenW / 2, screenH / 2, 'battleBg').setOrigin(0.5).setDepth(0);
    this.add.image(screenW / 2, screenH - 32, 'downbarBattle').setOrigin(0.5).setScale(1.3).setDepth(5);

    // Кнопка мяса и счетчик
    this.foodBtn = this.add.image(60, screenH - 70, 'foodButton')
      .setScale(0.08).setInteractive({ useHandCursor: true }).setDepth(10);
    this.meatText = this.add.text(60, screenH - 20, `${this.meat}`, {
      fontFamily: 'MOLOT', fontSize: '22px', color: '#000000'
    }).setOrigin(0.5).setDepth(11);

    // Верхняя панель
    this.add.image(screenW / 2, 30, 'topBar').setDepth(100);
    this.add.image(80, 160, 'speed').setScale(1.4).setDepth(101);
    this.add.image(screenW - 300, 45, 'iconProfile').setScale(0.5).setDepth(101);

    // Деньги и кристаллы
    const coinsX = screenW - 540, gemsX = screenW - 60, currencyY = 50;
    this.add.image(coinsX, currencyY, 'iconCoins').setScale(1.2).setDepth(101);
    this.add.text(coinsX + 20, currencyY, '12m', {
      fontSize: '22px', fontFamily: 'MOLOT', color: '#fff'
    }).setOrigin(0, 0.5).setDepth(101);
    this.add.image(gemsX, currencyY, 'iconGems').setScale(1.2).setDepth(101);
    this.add.text(gemsX + 20, currencyY, '80', {
      fontSize: '22px', fontFamily: 'MOLOT', color: '#fff'
    }).setOrigin(0, 0.5).setDepth(101);

    // Панель квестов
    this.add.image(screenW / 2 + 100, 140, 'dailyQuestPanel')
      .setOrigin(0.5).setScale(0.9).setDepth(2);
    this.add.text(screenW / 2 + 100, 140, 'хочешь покажу пенис?\nРазмер пениса: 3 см', {
      fontFamily: 'MOLOT', fontSize: '18px', color: '#ffffff', align: 'center'
    }).setOrigin(0.5).setDepth(3);

    // Мясной бар
    this.meatBarWidth = 110;
    this.meatBarHeight = 200;
    this.meatBarBg = this.add.graphics().setDepth(8);
    this.meatBarFill = this.add.graphics().setDepth(9);
    this.meatBarBg.fillStyle(0x000000, 0.5);
    this.meatBarBg.fillRect(0, screenH - 120, this.meatBarWidth, this.meatBarHeight);

    this.animateMeatBar = () => {
      let progress = { value: 0 };
      this.tweens.add({
        targets: progress,
        value: this.meatBarWidth,
        duration: 1000,
        ease: 'Linear',
        onUpdate: () => {
          this.meatBarFill.clear();
          this.meatBarFill.fillStyle(0xCCCCCC, 1);
          this.meatBarFill.fillRect(5, screenH - 120, progress.value, this.meatBarHeight);
        },
        onComplete: () => {
          if (this.meat < this.maxMeat) {
            this.meat++;
            this.meatText.setText(`${this.meat}`);
          }
          this.animateMeatBar();
        }
      });
    };
    this.animateMeatBar();

    // Игровая зона с базами
    this.setupBattleArea();

    // Кнопки вызова юнитов
    const buttonY = screenH - 130;
    const startX = 200;
    const spacing = 130;
    for (let i = 0; i < 3; i++) {
      const unitBtn = this.add.image(startX + i * spacing, buttonY, 'Button')
        .setScale(1)
        .setInteractive({ useHandCursor: true })
        .setDepth(10);

      unitBtn.on('pointerdown', () => unitBtn.setScale(0.88));
      unitBtn.on('pointerup', () => {
        unitBtn.setScale(0.89);
        console.log(`Юнит ${i + 1} вызван`);
      });
      unitBtn.on('pointerout', () => unitBtn.setScale(1));
    }
  }

  setupBattleArea() {
    const screenW = this.scale.width;
    const screenH = this.scale.height;

    const battleArea = { x: 0, y: 560, width: 590, height: 150 };
    const roadLengthInUnits = 24;
    const roadWidthInUnits = 6;
    const unitByLength = battleArea.width / roadLengthInUnits;
    const unitByWidth = battleArea.height / roadWidthInUnits;
    const unitSize = Math.min(unitByLength, unitByWidth);

    const PLAYER_BASE_X = 1;
    const PLAYER_BASE_Y = 2.5;
    const BASE_SIZE_UNITS = 3;
    const PLAYER_CAVE_X = 0.5;
    const PLAYER_CAVE_Y = 2.5;
    const ENEMY_CAVE_X = roadLengthInUnits - PLAYER_CAVE_X - 1;
    const ENEMY_CAVE_Y = PLAYER_CAVE_Y;
    const ENEMY_BASE_X = roadLengthInUnits - PLAYER_BASE_X - 1;
    const ENEMY_BASE_Y = PLAYER_BASE_Y;
    const baseRadius = (unitSize * BASE_SIZE_UNITS) / 2;
    const caveRadius = (unitSize * 1.5) / 2;
    const offsetX = (battleArea.width - roadLengthInUnits * unitSize) / 2;
    const offsetY = (battleArea.height - roadWidthInUnits * unitSize) / 2;

    const px = (ux) => battleArea.x + offsetX + ux * unitSize + unitSize / 2;
    const py = (uy) => battleArea.y + offsetY + uy * unitSize + unitSize / 2;

    const pBaseX = px(PLAYER_BASE_X);
    const pBaseY = py(PLAYER_BASE_Y);
    const eBaseX = px(ENEMY_BASE_X);
    const eBaseY = py(ENEMY_BASE_Y);
    const pCaveX = px(PLAYER_CAVE_X);
    const pCaveY = py(PLAYER_CAVE_Y);
    const eCaveX = px(ENEMY_CAVE_X);
    const eCaveY = py(ENEMY_CAVE_Y);

    // Отрисовка пещер
    this.cavesGraphics = this.add.graphics().setDepth(9);
    this.cavesGraphics.fillStyle(0x003366, 0.3).fillCircle(pCaveX, pCaveY, caveRadius);
    this.cavesGraphics.lineStyle(2, 0x0066ff, 0.5).strokeCircle(pCaveX, pCaveY, caveRadius);
    this.cavesGraphics.fillStyle(0x660000, 0.3).fillCircle(eCaveX, eCaveY, caveRadius);
    this.cavesGraphics.lineStyle(2, 0xff3333, 0.5).strokeCircle(eCaveX, eCaveY, caveRadius);

    // Отрисовка баз
    this.basesGraphics = this.add.graphics().setDepth(10);
    this.basesGraphics.fillStyle(0x0066ff, 0.2).fillCircle(pBaseX, pBaseY, baseRadius);
    this.basesGraphics.lineStyle(3, 0x0066ff, 0.6).strokeCircle(pBaseX, pBaseY, baseRadius);
    this.basesGraphics.fillStyle(0xff3333, 0.2).fillCircle(eBaseX, eBaseY, baseRadius);
    this.basesGraphics.lineStyle(3, 0xff3333, 0.6).strokeCircle(eBaseX, eBaseY, baseRadius);

    // Базы
    this.baseLeft = this.add.image(pBaseX, pBaseY, 'baseLeft').setOrigin(0.5).setScale(1).setDepth(11);
    this.baseLeft = this.add.image(pBaseX, pBaseY - 10, 'baseLeft2').setOrigin(0.5).setScale(1).setDepth(12);
    this.baseLeft = this.add.image(pBaseX, pBaseY - 20, 'baseLeft3').setOrigin(0.5).setScale(1).setDepth(13);
    this.baseRight = this.add.image(eBaseX, eBaseY, 'baseRight').setOrigin(0.5).setScale(1).setDepth(11);
    this.baseRight = this.add.image(eBaseX, eBaseY - 10, 'baseRight2').setOrigin(0.5).setScale(1).setDepth(12);
    this.baseRight = this.add.image(eBaseX, eBaseY - 20, 'baseRight3').setOrigin(0.5).setScale(1).setDepth(13);


    // HP-бары
    const drawHpBar = (base, x, y) => {
      const w = 60, h = 8;
      base.hpBarBg.clear().fillStyle(0x000000, 0.5).fillRect(x - w / 2, y, w, h);
      const percent = base.hp / base.maxHp;
      const color = percent > 0.6 ? 0x00ff00 : percent > 0.3 ? 0xffff00 : 0xff0000;
      base.hpBar.clear().fillStyle(color, 1).fillRect(x - w / 2, y, w * percent, h);
    };

    this.baseLeft.hp = this.baseLeft.maxHp = 500;
    this.baseRight.hp = this.baseRight.maxHp = 500;
    this.baseLeft.hpBarBg = this.add.graphics().setDepth(12);
    this.baseLeft.hpBar = this.add.graphics().setDepth(13);
    this.baseRight.hpBarBg = this.add.graphics().setDepth(12);
    this.baseRight.hpBar = this.add.graphics().setDepth(13);
    drawHpBar(this.baseLeft, pBaseX, pBaseY - baseRadius - 15);
    drawHpBar(this.baseRight, eBaseX, eBaseY - baseRadius - 15);

    this.baseLeft.takeDamage = (amount) => {
      this.baseLeft.hp = Math.max(0, this.baseLeft.hp - amount);
      drawHpBar(this.baseLeft, pBaseX, pBaseY - baseRadius - 15);
    };
    this.baseRight.takeDamage = (amount) => {
      this.baseRight.hp = Math.max(0, this.baseRight.hp - amount);
      drawHpBar(this.baseRight, eBaseX, eBaseY - baseRadius - 15);
    };

    // Текст и рамка зоны
    this.areaGraphics = this.add.graphics().setDepth(5);
    this.areaGraphics.lineStyle(3, 0xffffff, 0.5).strokeRect(battleArea.x, battleArea.y, battleArea.width, battleArea.height);
    this.add.text(battleArea.x + 10, battleArea.y - 45, `Игровая область: ${battleArea.width}x${battleArea.height}px`, {
      fontSize: '14px', fontFamily: 'Arial', color: '#ffffff'
    }).setDepth(101);
    this.add.text(battleArea.x + 10, battleArea.y - 30, `Базы: (${PLAYER_BASE_X},${PLAYER_BASE_Y}) -> (${ENEMY_BASE_X},${ENEMY_BASE_Y})`, {
      fontSize: '14px', fontFamily: 'Arial', color: '#ffffff'
    }).setDepth(101);
    this.add.text(battleArea.x + 10, battleArea.y - 15, `Размеры: база ${BASE_SIZE_UNITS}ед, пещера 1.5ед`, {
      fontSize: '14px', fontFamily: 'Arial', color: '#ffffff'
    }).setDepth(101);
  }
}

