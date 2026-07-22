/**
 * Map System
 * Manages world maps, tiles, and collision layers
 */

class MapManager {
    constructor(scene) {
        this.scene = scene;
        this.currentMap = 'village';
        this.maps = {};
        this.collisionLayers = {};
    }

    /**
     * Create village map
     */
    createVillageMap() {
        const graphics = this.scene.make.graphics({ x: 0, y: 0, add: false });

        // Ground
        graphics.fillStyle(0x2d5016, 1);
        graphics.fillRect(0, 0, 1600, 1200);

        // Paths
        graphics.fillStyle(0x8b7355, 1);
        graphics.fillRect(700, 0, 200, 1200);
        graphics.fillRect(0, 500, 1600, 150);

        // Houses
        graphics.fillStyle(0xd2691e, 1);
        graphics.fillRect(200, 200, 200, 200);
        graphics.fillRect(1200, 200, 200, 200);
        graphics.fillRect(200, 800, 200, 200);
        graphics.fillRect(1200, 800, 200, 200);

        // Trees
        graphics.fillStyle(0x228b22, 1);
        for (let i = 0; i < 10; i++) {
            graphics.fillRect(100 + i * 150, 100, 50, 50);
        }

        graphics.generateTexture('villageMap', 1600, 1200);
        graphics.destroy();

        // Add as background
        this.scene.add.image(800, 600, 'villageMap').setDepth(0);
    }

    /**
     * Create collision layer for village
     */
    createVillageCollisions() {
        // House collisions
        const houses = [
            { x: 200, y: 200, w: 200, h: 200 },
            { x: 1200, y: 200, w: 200, h: 200 },
            { x: 200, y: 800, w: 200, h: 200 },
            { x: 1200, y: 800, w: 200, h: 200 }
        ];

        houses.forEach(house => {
            const rect = this.scene.add.rectangle(house.x + house.w / 2, house.y + house.h / 2, house.w, house.h);
            rect.setVisible(false);
            this.scene.physics.add.existing(rect, true);
            this.scene.physics.add.collider(this.scene.player, rect);
        });
    }

    /**
     * Create forest map
     */
    createForestMap() {
        const graphics = this.scene.make.graphics({ x: 0, y: 0, add: false });

        // Ground
        graphics.fillStyle(0x1b4d2d, 1);
        graphics.fillRect(0, 0, 1600, 1200);

        // Trees scattered
        graphics.fillStyle(0x228b22, 1);
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 1600;
            const y = Math.random() * 1200;
            graphics.fillRect(x, y, 40, 40);
        }

        // River
        graphics.fillStyle(0x4169e1, 1);
        graphics.fillRect(0, 400, 1600, 100);

        graphics.generateTexture('forestMap', 1600, 1200);
        graphics.destroy();

        this.scene.add.image(800, 600, 'forestMap').setDepth(0);
    }

    /**
     * Load village
     */
    loadVillage() {
        this.currentMap = 'village';
        this.createVillageMap();
        this.createVillageCollisions();
    }

    /**
     * Load forest
     */
    loadForest() {
        this.currentMap = 'forest';
        this.createForestMap();
    }

    /**
     * Get current map name
     * @returns {string}
     */
    getCurrentMap() {
        return this.currentMap;
    }
}