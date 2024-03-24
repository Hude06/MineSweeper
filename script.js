let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let squareSize = 60
let RealGridSize = 10
let mouseX;
let mouseY;
let currentSquare = {x:1,y:0}
class Square {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.w = squareSize-10
        this.h = squareSize-10
        this.number = 0;
        this.numVisable = false;
    }
    draw() {
        let bombCount = 0; // Initialize bomb count

        for (let i = 0; i < bombs.length; i++) {
            if (Math.abs(this.x - bombs[i].x) <= 1 && Math.abs(this.y - bombs[i].y) <= 1) {
                // If adjacent to a bomb, increment bomb count
                bombCount++;
            }
        }
        
        // Set number based on bomb count
        switch(bombCount) {
            case 1:
                this.number = 1;
                break;
            case 2:
                this.number = 2;
                break;
            case 3:
                this.number = 3;
                break;
            default:
                // If not adjacent to any bombs or adjacent to more than 3 bombs, keep the number as 0
                this.number = 0;
        }

        if (this.numVisable === false) {
            ctx.fillStyle = "black";
            ctx.fillRect(this.x * squareSize + 1, this.y * squareSize + 1, this.w, this.h);
        } else {
            ctx.font = "50px Georgia";
            ctx.fillText(this.number, this.x * squareSize + 17, this.y * squareSize + 41);
        }
}
}
class Bomb {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.w = squareSize-10
        this.h = squareSize-10
    }
    draw() {
        ctx.fillStyle = ""
        ctx.fillRect((this.x*squareSize+1)+3,(this.y*squareSize)+3,this.w,this.h)
    }
}
document.getElementById("body").addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    mouseX = mouseX - ((window.innerWidth - canvas.width) / 2)
    mouseY = mouseY - ((window.innerHeight - canvas.height) / 2)
});
canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    console.log("Right Click")
    ctx.fillStyle = 'blue'
    ctx.fillRect(currentSquare,currentSquare,currentSquare,currentSquare)
})
canvas.addEventListener('click', function(event) {
    if (mouseX > squareSize * currentSquare.x) {
        currentSquare.x = Math.floor(mouseX / squareSize)
    } else if (mouseX < squareSize * currentSquare.x) {
        currentSquare.x = Math.floor(mouseX / squareSize)
    }

    if (mouseY > squareSize * currentSquare.y) {
        currentSquare.y = Math.floor(mouseY / squareSize)
    } else if (mouseY < squareSize * currentSquare.y) {
        currentSquare.y = Math.floor(mouseY / squareSize)
    }
    for (let i = 0; i < squares.length; i++) {
        if (currentSquare.x === squares[i].x && currentSquare.y === squares[i].y) {
            squares[i].numVisable = true
            console.log("CLICKED NOT A BOMB ")
        }
    }
    for (let i = 0; i < bombs.length; i++) {
        if (currentSquare.x === bombs[i].x && currentSquare.y === bombs[i].y) {
            alert("You Clicked a bomb")
            location.reload();
        }
    }
});
let bombs = []
let squares = [];
function makeSquares() {
    for (let i = 0; i < 10; i++) {
        for (let y = 0; y < 10; y++) {
            let isBomb = false;
            for (let b = 0; b < bombs.length; b++) {
                if (i === bombs[b].x && y === bombs[b].y) {
                    isBomb = true;
                    break; // Once a bomb is found, no need to continue checking
                }
            }
            if (!isBomb) {
                squares.push(new Square(i,y));
            }
        }
    }
}

function CreateBomb() {
    let rando1 = Math.floor((Math.random()*10)+1)
    let rando2 = Math.floor((Math.random()*10)+1)

    for (let i = 0; i < bombs.length; i++) {
        if (rando1 === bombs[i].x) {
             rando1 = Math.floor((Math.random()*10)+1)
        }
        if (rando2 === bombs[i].y) {
            rando2 = Math.floor((Math.random()*10)+1)
       }
    }
    bombs.push(new Bomb(rando1,rando2))
}
function update() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for (let i = 0; i < bombs.length; i++) {
        bombs[i].draw();
    }
    for (let i = 0; i < squares.length; i++) {
        squares[i].draw();
    }
    for (let i = 0; i < 10; i++) {
        for (let y = 0; y < 10; y++) {
            for (let i = 0; i < bombs.length; i++) {
            }
            ctx.strokeRect(i*squareSize,y*squareSize,squareSize,squareSize);
        }
    }
    requestAnimationFrame(update)
}
for (let i = 0; i < RealGridSize; i++) {
    CreateBomb();
}
makeSquares();
update();