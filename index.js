let screenWidth = 800;
let screenHeight = 600;
let tileSize = 32;
let gravityY = 500;

var config = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: gravityY },
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
    cursors = this.input.keyboard.createCursorKeys();

    this.add.image(400, 300, 'sky');

    ground = this.add.tileSprite(tileSize/2, screenHeight - (tileSize/2), 1600, 32, 'ground');

    platforms.add(ground);
    //platforms.create(tileSize, screenHeight - tileSize, 'ground');
    player = this.physics.add.sprite(100, 400, 'megaMan');
    player.setBounce(0);
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('megaMan', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'idle',
        frames: [{ key: 'megaMan', frame: 0 }],
        frameRate: 20
    });
    player.body.setGravityY(gravityY);

    this.physics.add.collider(player, platforms);
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('run', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('run', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('idle');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
    }

    if (player.velocityY < 0) {
        player.setGravityY(gravityY * 2);
        console.log('fast drop');
        console.log('player gravity:', player.gravityY);
    }
    else {
        player.setGravityY(gravityY);
    }
}