/**
 * Control System
 * Manages keyboard and game input
 */

class ControlManager {
    constructor(scene) {
        this.scene = scene;
        this.keys = {};
        this.setupControls();
    }

    /**
     * Setup keyboard controls
     */
    setupControls() {
        const input = this.scene.input.keyboard;

        // Movement
        this.keys.w = input.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.a = input.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.s = input.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.d = input.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Actions
        this.keys.space = input.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keys.e = input.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keys.i = input.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keys.esc = input.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Arrow keys as alternative
        this.keys.up = input.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keys.left = input.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keys.down = input.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keys.right = input.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    /**
     * Check if movement key is pressed
     * @returns {Object} Direction flags
     */
    getMovementInput() {
        return {
            up: this.keys.w.isDown || this.keys.up.isDown,
            down: this.keys.s.isDown || this.keys.down.isDown,
            left: this.keys.a.isDown || this.keys.left.isDown,
            right: this.keys.d.isDown || this.keys.right.isDown
        };
    }

    /**
     * Check if action key pressed (not held)
     * @param {string} action - Action key
     * @returns {boolean}
     */
    isActionJustPressed(action) {
        return this.keys[action] && this.keys[action].isDown;
    }

    /**
     * Check if key is held down
     * @param {string} key - Key name
     * @returns {boolean}
     */
    isKeyDown(key) {
        return this.keys[key] && this.keys[key].isDown;
    }

    /**
     * Show controls help
     */
    showControlsHelp() {
        let help = document.querySelector('.controls-help');
        if (!help) {
            help = document.createElement('div');
            help.className = 'controls-help';
            help.innerHTML = `
                <div style="color: #e94560; margin-bottom: 10px; text-align: center;">CONTROLS</div>
                <div class="control-item">
                    <span class="control-key">WASD</span>: Move
                </div>
                <div class="control-item">
                    <span class="control-key">ARROWS</span>: Move (Alt)
                </div>
                <div class="control-item">
                    <span class="control-key">SPACE</span>: Attack
                </div>
                <div class="control-item">
                    <span class="control-key">E</span>: Interact
                </div>
                <div class="control-item">
                    <span class="control-key">I</span>: Inventory
                </div>
                <div class="control-item">
                    <span class="control-key">ESC</span>: Pause
                </div>
            `;
            document.body.appendChild(help);
        }
    }
}