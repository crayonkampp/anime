/**
 * Main Game Entry Point
 * Initializes Phaser and starts the game
 */

// Game configuration
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
        min: {
            width: 320,
            height: 240
        },
        max: {
            width: 1920,
            height: 1440
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [GameScene],
    parent: 'game-container',
    backgroundColor: '#0f3460'
};

// Create game instance
const game = new Phaser.Game(config);

// Initialize audio manager
audioManager.init();

// Check for saved game on load
window.addEventListener('load', () => {
    if (saveManager.hasSave()) {
        const saveData = saveManager.loadGame();
        console.log('Save file found:', saveData);
    }
});

// Handle page visibility for pausing
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (game.scene.isActive('GameScene')) {
            game.scene.pause('GameScene');
        }
    } else {
        if (game.scene.isSleeping('GameScene')) {
            game.scene.resume('GameScene');
        }
    }
});