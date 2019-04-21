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
    this.load.image('stefen', './Art/sprites/Stefen2.jpg');
}

function create() {
    this.add.image(400, 300, 'stefen');
}

function update() {
    console.log('blah');
}