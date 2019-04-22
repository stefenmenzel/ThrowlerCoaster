let screenWidth = 800;
let screenHeight = 600;
let tileSize = 32;

var config = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
        debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


const game = new Phaser.Game(config);

let platforms;
let ground;

function preload() {
    this.load.image('sky', './Art/backGrounds/sky.png');
    this.load.image('ground', './Art/tiles/PlaceHolder/testTile.png')
    this.load.spritesheet('megaMan', './Art/sprites/Placeholder/megaManRun.png',
        {frameWidth: 24, frameHeight: 24});
}

function create() {
    platforms = this.physics.add.staticGroup();

    this.add.image(400, 300, 'sky');

    ground = this.add.tileSprite(tileSize/2, screenHeight - (tileSize/2), 1600, 32, 'ground');

    
    //platforms.create(tileSize, screenHeight - tileSize, 'ground');
}

function update() {
}