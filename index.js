const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#000",
    parent: "game-container",
    pixelArt: true,
    scene: DungeonScene,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    }
};