/**
 * UI System
 * Manages HUD, menus, and on-screen displays
 */

class UIManager {
    constructor(scene) {
        this.scene = scene;
        this.hudElement = null;
        this.inventoryOpen = false;
        this.questLogOpen = false;
        this.pauseOpen = false;
    }

    /**
     * Create HUD
     */
    createHUD() {
        this.hudElement = document.createElement('div');
        this.hudElement.className = 'hud';
        this.hudElement.innerHTML = `
            <div class="hud-stat">
                <span class="label">❤️ HP</span>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: 100%"></div>
                    <span class="stat-value">100/100</span>
                </div>
            </div>
            <div class="hud-stat">
                <span class="label">🔷 MP</span>
                <div class="stat-bar">
                    <div class="stat-bar-fill mana" style="width: 100%"></div>
                    <span class="stat-value">50/50</span>
                </div>
            </div>
            <div class="hud-stat">
                <span class="label">⭐ LVL</span>
                <span style="flex: 1;">1</span>
            </div>
            <div class="hud-stat">
                <span class="label">💰 GOLD</span>
                <span style="flex: 1;">0</span>
            </div>
        `;
        document.body.appendChild(this.hudElement);
    }

    /**
     * Update HUD with player stats
     * @param {Player} player - Player to display stats for
     */
    updateHUD(player) {
        if (!this.hudElement) return;

        const hpPercent = (player.hp / player.maxHp) * 100;
        const manaPercent = (player.mana / player.maxMana) * 100;

        const hpBar = this.hudElement.querySelector('.stat-bar-fill');
        const manaBar = this.hudElement.querySelectorAll('.stat-bar-fill')[1];
        const levelSpan = this.hudElement.querySelectorAll('span')[4];
        const goldSpan = this.hudElement.querySelectorAll('span')[7];

        hpBar.style.width = `${hpPercent}%`;
        manaBar.style.width = `${manaPercent}%`;
        hpBar.nextElementSibling.textContent = `${Math.floor(player.hp)}/${player.maxHp}`;
        manaBar.nextElementSibling.textContent = `${Math.floor(player.mana)}/${player.maxMana}`;
        levelSpan.textContent = player.level;
        goldSpan.textContent = player.gold;
    }

    /**
     * Show inventory menu
     * @param {Inventory} inventory - Player inventory
     */
    showInventory(inventory) {
        if (this.inventoryOpen) {
            this.hideInventory();
            return;
        }

        let container = document.querySelector('.menu-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'menu-container';
            document.body.appendChild(container);
        }

        let html = '<div class="menu-title">INVENTORY</div>';
        const items = inventory.getItems();

        if (items.length === 0) {
            html += '<div class="menu-item">Empty</div>';
        } else {
            items.forEach(item => {
                const qty = item.quantity > 1 ? ` (${item.quantity})` : '';
                html += `<div class="menu-item">${item.name}${qty}</div>`;
            });
        }

        container.innerHTML = html;
        container.classList.add('active');
        this.inventoryOpen = true;
    }

    /**
     * Hide inventory menu
     */
    hideInventory() {
        const container = document.querySelector('.menu-container');
        if (container) {
            container.classList.remove('active');
        }
        this.inventoryOpen = false;
    }

    /**
     * Show quest log
     * @param {QuestLog} questLog - Quest log to display
     */
    showQuestLog(questLog) {
        let container = document.querySelector('.menu-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'menu-container';
            document.body.appendChild(container);
        }

        let html = '<div class="menu-title">QUESTS</div>';
        const quests = questLog.getActiveQuests();

        if (quests.length === 0) {
            html += '<div class="menu-item">No active quests</div>';
        } else {
            quests.forEach(quest => {
                const progress = `${quest.progress}/${quest.maxProgress}`;
                html += `<div class="menu-item">${quest.title}<br><small>${progress}</small></div>`;
            });
        }

        container.innerHTML = html;
        container.classList.add('active');
    }

    /**
     * Show pause menu
     */
    showPauseMenu() {
        let pauseMenu = document.querySelector('.pause-menu');
        if (!pauseMenu) {
            pauseMenu = document.createElement('div');
            pauseMenu.className = 'pause-menu';
            pauseMenu.innerHTML = `
                <div class="pause-title">PAUSED</div>
                <div class="pause-buttons">
                    <button class="pause-btn" onclick="location.reload()">Resume</button>
                    <button class="pause-btn" onclick="location.href='/'">Menu</button>
                </div>
            `;
            document.body.appendChild(pauseMenu);
        }

        pauseMenu.classList.add('active');
        this.pauseOpen = true;
        this.scene.physics.pause();
    }

    /**
     * Hide pause menu
     */
    hidePauseMenu() {
        const pauseMenu = document.querySelector('.pause-menu');
        if (pauseMenu) {
            pauseMenu.classList.remove('active');
        }
        this.pauseOpen = false;
        this.scene.physics.resume();
    }

    /**
     * Show notification
     * @param {string} message - Notification message
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}