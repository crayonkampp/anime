/**
 * Combat System
 * Handles real-time combat between player and enemies
 */

class CombatManager {
    constructor(scene) {
        this.scene = scene;
        this.enemies = [];
        this.damageNumbers = [];
    }

    /**
     * Add enemy to combat
     * @param {Enemy} enemy - Enemy to add
     */
    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    /**
     * Remove enemy from combat
     * @param {Enemy} enemy - Enemy to remove
     */
    removeEnemy(enemy) {
        this.enemies = this.enemies.filter(e => e !== enemy);
    }

    /**
     * Get all enemies
     * @returns {Array} Enemies
     */
    getEnemies() {
        return this.enemies;
    }

    /**
     * Player attacks enemy at position
     * @param {Player} player - Player
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {Enemy|null} Hit enemy or null
     */
    playerAttackAt(player, x, y) {
        const attackRange = 50;
        let hitEnemy = null;

        for (let enemy of this.enemies) {
            const distance = Phaser.Math.Distance.Between(x, y, enemy.x, enemy.y);
            if (distance < attackRange) {
                hitEnemy = enemy;
                break;
            }
        }

        if (hitEnemy) {
            const damage = this.calculateDamage(player.attack);
            hitEnemy.takeDamage(damage);
            this.showDamageNumber(hitEnemy.x, hitEnemy.y, damage, 'damage');
            return hitEnemy;
        }

        return null;
    }

    /**
     * Enemy attacks player
     * @param {Enemy} enemy - Enemy
     * @param {Player} player - Player
     */
    enemyAttackPlayer(enemy, player) {
        const attackRange = 30;
        const distance = Phaser.Math.Distance.Between(enemy.x, enemy.y, player.x, player.y);

        if (distance < attackRange && enemy.attack()) {
            const damage = this.calculateDamage(enemy.attack);
            player.takeDamage(damage);
            this.showDamageNumber(player.x, player.y, damage, 'damage');
        }
    }

    /**
     * Calculate damage with variance
     * @param {number} baseDamage - Base damage value
     * @returns {number} Calculated damage
     */
    calculateDamage(baseDamage) {
        const variance = 0.2; // 20% variance
        const min = baseDamage * (1 - variance);
        const max = baseDamage * (1 + variance);
        return Math.floor(Phaser.Math.Between(min, max));
    }

    /**
     * Show damage number on screen
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} amount - Damage amount
     * @param {string} type - 'damage' or 'heal'
     */
    showDamageNumber(x, y, amount, type = 'damage') {
        const numElement = document.createElement('div');
        numElement.className = `damage-number ${type}`;
        numElement.textContent = Math.floor(amount);
        numElement.style.left = `${x}px`;
        numElement.style.top = `${y}px`;
        document.body.appendChild(numElement);

        // Animate and remove
        setTimeout(() => {
            numElement.style.transition = 'all 1s ease-out';
            numElement.style.top = `${y - 50}px`;
            numElement.style.opacity = '0';
            setTimeout(() => numElement.remove(), 1000);
        }, 10);
    }

    /**
     * Update combat system
     * @param {Player} player - Player
     */
    update(player) {
        this.enemies.forEach(enemy => {
            enemy.update(player);
            this.enemyAttackPlayer(enemy, player);
        });
    }
}