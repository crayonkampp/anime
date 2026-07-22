/**
 * Save System
 * Manages game saving and loading using LocalStorage
 */

class SaveManager {
    constructor() {
        this.saveKey = 'pixel_legends_save';
    }

    /**
     * Create a new save file
     * @param {Object} gameData - Game data to save
     */
    saveGame(gameData) {
        try {
            const saveData = {
                timestamp: Date.now(),
                version: '1.0',
                player: {
                    x: gameData.player.x,
                    y: gameData.player.y,
                    level: gameData.player.level,
                    exp: gameData.player.exp,
                    hp: gameData.player.hp,
                    maxHp: gameData.player.maxHp,
                    mana: gameData.player.mana,
                    maxMana: gameData.player.maxMana,
                    gold: gameData.player.gold,
                    currentMap: gameData.player.currentMap
                },
                inventory: gameData.inventory || [],
                equipment: gameData.equipment || {},
                quests: gameData.quests || [],
                completedQuests: gameData.completedQuests || []
            };

            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            console.log('Game saved successfully');
            return true;
        } catch (error) {
            console.error('Failed to save game:', error);
            return false;
        }
    }

    /**
     * Load a save file
     * @returns {Object|null} Saved game data or null
     */
    loadGame() {
        try {
            const data = localStorage.getItem(this.saveKey);
            if (data) {
                const saveData = JSON.parse(data);
                console.log('Game loaded successfully');
                return saveData;
            }
            return null;
        } catch (error) {
            console.error('Failed to load game:', error);
            return null;
        }
    }

    /**
     * Check if save exists
     * @returns {boolean}
     */
    hasSave() {
        return localStorage.getItem(this.saveKey) !== null;
    }

    /**
     * Delete save file
     */
    deleteSave() {
        try {
            localStorage.removeItem(this.saveKey);
            console.log('Save file deleted');
            return true;
        } catch (error) {
            console.error('Failed to delete save:', error);
            return false;
        }
    }

    /**
     * Get save metadata
     * @returns {Object|null}
     */
    getSaveInfo() {
        const save = this.loadGame();
        if (save) {
            return {
                timestamp: new Date(save.timestamp),
                level: save.player.level,
                gold: save.player.gold,
                map: save.player.currentMap
            };
        }
        return null;
    }
}

const saveManager = new SaveManager();