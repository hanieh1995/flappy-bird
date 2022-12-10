var cvs = document.getElementById("mycanvas");
var ctx = cvs.getContext("2d");

var frames = 0;
var sprite = new Image();
sprite.src = "img/sprite.png";

var state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
}

function clickHandler() {
    switch (state.current) {
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            bird.flap();
            break;
        default:
            bird.speed = 0;
            state.current = state.getReady;
            break;
    }
}

document.addEventListener("click", clickHandler)
document.addEventListener("keydown", function (e) {
    if (e.which == 32) {
        clickHandler();
    }
})

var bg = {
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y: cvs.height - 226,
    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }

}

var fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,
    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }

}

var getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width / 2 - 173 / 2,
    y: 80,
    draw: function () {
        if (state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }

}

var gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width / 2 - 225 / 2,
    y: 90,
    draw: function () {
        if (state.current == state.over) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }

}

var bird = {
    animation: [
        { sX: 276, sY: 112 },
        { sX: 276, sY: 139 },
        { sX: 276, sY: 164 },
        { sX: 276, sY: 139 },
    ],
    w: 34,
    h: 26,
    x: 50,
    y: 150,
    speed: 0,
    gravity: 0.25,
    animationIndex: 0,
    jump: 4.6,
    draw: function () {
        let bird = this.animation[this.animationIndex];
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    },
    update: function () {
        let period = state.current == state.getReady ? 10 : 5;
        this.animationIndex += frames % period == 0 ? 1 : 0;
        this.animationIndex = this.animationIndex % this.animation.length;
        if (state.current == state.getReady) {
            this.y = 150;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;
        }

        if (this.y + this.h / 2 >= cvs.height - fg.h) {
            this.y = cvs.height - fg.h -this.h/2;
            if(state.current == state.game){
                state.current = state.over;
            }
        }
    },
    flap: function () {
        this.speed = -this.jump;
    }

}

function update() {
    bird.update();
}

function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.clientWidth, cvs.height);
    bg.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
}

function animate() {
    update();
    draw();
    frames++;
    requestAnimationFrame(animate)
}
animate();

