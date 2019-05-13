let screenWidth = 800;
let screenHeight = 600;
let tileSize = 32;
let gravityY = 500;
let throwForce = 300;
let horMov = 0;

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

let jumpIsReady = true;

function preload() {
    this.load.image('sky', './Art/backGrounds/sky.png');
    this.load.image('ground', './Art/tiles/PlaceHolder/testTile.png')
    this.load.spritesheet('megaMan', './Art/sprites/Placeholder/megaManRun.png',
        {frameWidth: 24, frameHeight: 24});
}

function create() {
    
    Qkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    Ekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    platforms = this.physics.add.staticGroup();
    cursors = this.input.keyboard.createCursorKeys();

    this.add.image(400, 300, 'sky');

    ground = this.add.tileSprite(tileSize/2, screenHeight - (tileSize/2), 1600, 32, 'ground');

    platforms.add(ground);
    //platforms.create(tileSize, screenHeight - tileSize, 'ground');
    player = this.physics.add.sprite(100, 400, 'megaMan');
    player2 = this.physics.add.sprite(150,400, 'megaMan');    
    currentPlayer = player;
    otherPlayer = player2;
    
    player.setBounce(0);
    player.setCollideWorldBounds(true);

    player2.setBounce(0);
    player2.setCollideWorldBounds(true);

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
    player2.body.setGravityY(gravityY);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player2, platforms);
}

function update() {

    // console.log('currentplayer is player1?', currentPlayer == player);    

    //This is testing the switch ability that will be important in this game...the player won't have much control over switching other than it'll automatically switch when a character is thrown
    if (Phaser.Input.Keyboard.JustDown(Qkey))
    {
        if(currentPlayer == player)
        {
            currentPlayer = player2;
            otherPlayer = player;
            full_stop(player);
        }
        else
        {
            currentPlayer = player;
            otherPlayer = player2;
            full_stop(player2);
        }
        console.log('QUEUE');
    }
    //end switch test 

    //this is testing the throw ability...currently only throwing at a 45 degree angle up and to the right
    if(Phaser.Input.Keyboard.JustDown(Ekey))
    {
        console.log('finna throw');
        set_Throw_Mode(otherPlayer);
        otherPlayer.setVelocity(.707 * throwForce, .707 * -throwForce)
    }
    //end throw test.

    //this is a sequence of conditionals that moves the player left and riht
    if (cursors.left.isDown) {
        // horMov = -1;
        currentPlayer.setVelocityX(-160);
        currentPlayer.anims.play('run', true);
        currentPlayer.flipX = true;
    }
    else if (cursors.right.isDown) {
        // horMov = 1;
        currentPlayer.setVelocityX(160);
        currentPlayer.anims.play('run', true);
        currentPlayer.flipX = false;
    }
    else {
        // horMov = 0;
        currentPlayer.setVelocityX(0);
        currentPlayer.anims.play('idle');
    }
    //end moving left and right

    //this allows the player to jump under certiain conditions.
    if (cursors.up.isDown && currentPlayer.body.touching.down && jumpIsReady) {
        jumpIsReady = false;
        currentPlayer.setVelocityY(-300);
    }

    //this makes the player let go of jump button before being able to jump again.
    if(!cursors.up.isDown && currentPlayer.body.touching.down){
        jumpIsReady = true;
    }

    //this set of conditionals determines the players fall speed...after the apex of the jump gravity doubles, to make the jump more mario-y
    if (currentPlayer.body.velocity.y > 0) {
        currentPlayer.body.setGravityY(gravityY * 2);
    }
    else {
        currentPlayer.setGravityY(gravityY);
    }

    //this is a rough test that goes along with the throw...attempting to take away gravity after being thrown until the thrown player runs into something.
    if(otherPlayer.body.onWall() || otherPlayer.body.onCeiling()){
        console.log('otherplayer is onwall');
        set_Regular_Mode(otherPlayer);
    }
}

//this will fully stop the player...used when switching between players...will likely eventually go away.
function full_stop(playerToStop){
    playerToStop.setVelocityX(0);

}

//set gravity to 0 so the throwee can fly
function set_Throw_Mode(otherPlayer){
    console.log('setting throw mode');
    otherPlayer.body.setAllowGravity(false);
}

//set the gravity back to normal so the throwee can land.
function set_Regular_Mode(otherPlayer){
    console.log('setting regular mode');
    otherPlayer.body.setAllowGravity(true);
}