import MenuScene from './scenes/MenuScene.js';
import LuckyScene from './scenes/LuckyScene.js';
import BattlePassScene from './scenes/BattlePassScene.js';
import SettingsScene from './scenes/SettingsScene.js';
import ShopScene from './scenes/ShopScene.js';
import CardsScene from './scenes/CardsScene.js';
import LevelUpScene from './scenes/LevelUpScene.js';
import UIScene from './scenes/UIScene.js';
import ProfileScene from './scenes/ProfileScene.js';
import PortalScene from './scenes/PortalScene.js';
import TestBattleScene from './scenes/TestBattleScene.js';


const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.RESIZE,           
    autoCenter: Phaser.Scale.CENTER_BOTH,   
  },
    scene: [
    UIScene,          
    MenuScene,
    LuckyScene,
    BattlePassScene,
    SettingsScene,
    ShopScene,
    CardsScene,
    LevelUpScene,
    ProfileScene,
    PortalScene,
    TestBattleScene
  ]
};

const game = new Phaser.Game(config);

// ✅ Запускаем основную сцену и UI поверх неё
window.onload = () => {
  game.scene.start('MenuScene');        // запускаем основную сцену
  game.scene.start('UIScene');          // запускаем UI
  game.scene.bringToTop('UIScene');     // поднимаем UI поверх
};
