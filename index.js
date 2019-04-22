var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        gravity: { y: 500 },
        debug: false
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', './Art/backGrounds/sky.png');
    this.load.spritesheet('megaMan', './Art/sprites/Placeholder/megaManRun.png',
        {frameWidth: 24, frameHeight: 24});
}

function create() {
    this.add.image(400, 300, 'sky');
}

function update() {
}