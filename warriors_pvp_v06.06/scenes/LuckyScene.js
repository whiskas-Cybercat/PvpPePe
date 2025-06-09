export default class LuckyScene extends Phaser.Scene {
  constructor() {
    super('LuckyScene');
  }

  preload() {
    this.load.image('luckyBg', 'assets/background.png');
    this.load.image('billboard', 'assets/builboard.png');
    this.load.image('pointer', 'assets/pointer.png');
    this.load.image('wheel', 'assets/wheel.png');
    this.load.image('base', 'assets/lag_of_wheel.png');
    this.load.image('tapBtn', 'assets/tapbutton.png');
  }

  create() {
    const screenW = this.scale.width;
    const screenH = this.scale.height;

    this.add.image(screenW / 2, screenH / 2, 'luckyBg').setOrigin(0.5).setDepth(0);

    const billboard = this.add.image(screenW / 2, 260, 'billboard')
      .setScale(0.7)
      .setAngle(-5) // Пример поворота таблички
      .setDepth(1);

    this.createBulbsAround(billboard);

    this.add.image(screenW / 2, screenH / 2 + 200, 'base').setDepth(1);

    const pointer = this.add.image(screenW / 2, screenH / 2 - 220, 'pointer')
      .setDepth(3).setScale(0.5);
    let pointerTween = null;

    const wheel = this.add.image(screenW / 2, screenH / 2, 'wheel')
      .setScale(0.5).setDepth(2);

    const sectorTexts = [];
    const segments = 9;
    const angleStep = 360 / segments;
    const radius = 130;

    for (let i = 0; i < segments; i++) {
      const angle = Phaser.Math.DegToRad(i * angleStep - 90);
      const tx = Math.cos(angle) * radius;
      const ty = Math.sin(angle) * radius;

      const text = this.add.text(wheel.x + tx, wheel.y + ty, `#${i + 1}`, {
        fontSize: '32px',
        color: '#000',
        fontFamily: 'Comic Sans MS'
      }).setOrigin(0.5).setDepth(3);

      sectorTexts.push({ text, angleOffset: angle });
    }

    const tapBtn = this.add.image(screenW / 2, screenH / 2 + 400, 'tapBtn')
      .setInteractive().setScale(1.1).setDepth(4);

    tapBtn.on('pointerdown', () => {
      tapBtn.disableInteractive();

      pointerTween = this.tweens.add({
        targets: pointer,
        angle: { from: -10, to: 10 },
        duration: 300,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      this.tweens.add({
        targets: tapBtn,
        scale: 1.25,
        duration: 100,
        yoyo: true,
        onComplete: () => {
          const rounds = Phaser.Math.Between(3, 5);
          const finalAngle = Phaser.Math.Between(0, 359);

          this.tweens.add({
            targets: wheel,
            angle: 360 * rounds + finalAngle,
            duration: 3000,
            ease: 'Cubic.easeOut',
            onUpdate: () => {
              sectorTexts.forEach((obj, i) => {
                const currentAngle = Phaser.Math.DegToRad((i * angleStep - 90) + wheel.angle);
                const tx = Math.cos(currentAngle) * radius;
                const ty = Math.sin(currentAngle) * radius;
                obj.text.setPosition(wheel.x + tx, wheel.y + ty);
              });
            },
            onComplete: () => {
              if (pointerTween) {
                pointerTween.stop();
                pointer.setAngle(0);
              }

              const landed = Math.floor(((360 - (wheel.angle % 360)) % 360) / angleStep);
              this.add.text(screenW / 2, screenH / 2, `You won!\nSector #${landed + 1}`, {
                fontSize: '20px',
                backgroundColor: '#ffffcc',
                color: '#000',
                align: 'center',
                padding: { x: 10, y: 10 }
              }).setOrigin(0.5).setDepth(5);

              this.time.delayedCall(2500, () => {
                this.scene.start('MenuScene');
              });
            }
          });
        }
      });
    });
  }

  createBulbsAround(billboard) {
    const spacing = 24;
    const radius = 5;
    const colors = [0xffcc66, 0xffe066, 0xff9966];

    const realWidth = 470;  // Чуть меньше 494
    const realHeight = 200; // Чуть меньше 266

    const width = realWidth * billboard.scaleX;
    const height = realHeight * billboard.scaleY;

    const angleRad = Phaser.Math.DegToRad(billboard.angle);
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);

    
    const offset = 35; // расстояние по нормали
   const angle = Phaser.Math.DegToRad(billboard.angle);
   const centerX = billboard.x + Math.sin(angle) * offset;
   const centerY = billboard.y + Math.cos(angle) * offset;


    const getRotatedPoint = (offsetX, offsetY) => ({
      x: centerX + offsetX * cos - offsetY * sin,
      y: centerY + offsetX * sin + offsetY * cos
    });

    const corners = [
      getRotatedPoint(-width / 2, -height / 2),
      getRotatedPoint(width / 2, -height / 2),
      getRotatedPoint(width / 2, height / 2),
      getRotatedPoint(-width / 2, height / 2)
    ];

    const placeBulbsBetween = (start, end) => {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.floor(distance / spacing);

      for (let i = 0; i <= steps; i++) {
        const x = start.x + (dx / steps) * i;
        const y = start.y + (dy / steps) * i;
        this.createAnimatedBulb(x, y, radius, colors);
      }
    };

    for (let i = 0; i < 4; i++) {
      placeBulbsBetween(corners[i], corners[(i + 1) % 4]);
    }
  }

  createAnimatedBulb(x, y, radius, colors) {
    const graphics = this.add.graphics({ x, y }).setDepth(2);
    const color = Phaser.Utils.Array.GetRandom(colors);

    graphics.fillStyle(color, 1);
    graphics.fillCircle(0, 0, radius);

    this.tweens.add({
      targets: graphics,
      alpha: 0.3,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }
}
