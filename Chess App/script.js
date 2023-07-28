const canvas = document.getElementById('chessCanvas');
const submit = document.getElementById('submitBTN');
const ctx = canvas.getContext('2d');
const bWidth = 100;
const bHeight = 100;

//Adding all images as DOM elements
//White
const wPawnImage = new Image();
wPawnImage.src="img/whitePawn.png";
wPawnImage.style.zIndex = "1";
const wRookImage = new Image();
wRookImage.src = "img/whiteRook.png";
wRookImage.style.zIndex = "1";
const wKnightImage = new Image();
wKnightImage.src = "img/whiteKnight.png";
wKnightImage.style.zIndex = "1";
const wBishopImage = new Image();
wBishopImage.src = "img/whiteBishop.png";
wBishopImage.style.zIndex = "1";
const wQueenImage = new Image();
wQueenImage.src = "img/whiteQueen.png";
wQueenImage.style.zIndex = "1";
const wKingImage = new Image();
wPawnImage.style.zIndex = "1";
wKingImage.src = "img/whiteKing.png";
//Black
const bPawnImage = new Image();
bPawnImage.src="img/blackPawn.png";
bPawnImage.style.zIndex = "1";
const bRookImage = new Image();
bRookImage.src = "img/blackRook.png";
bRookImage.style.zIndex = "1";
const bKnightImage = new Image();
bKnightImage.src = "img/blackKnight.png";
bKnightImage.style.zIndex = "1";
const bBishopImage = new Image();
bBishopImage.src = "img/blackBishop.png";
bBishopImage.style.zIndex = "1";
const bQueenImage = new Image();
bQueenImage.src = "img/blackQueen.png";
bQueenImage.style.zIndex = "1";
const bKingImage = new Image();
bPawnImage.style.zIndex = "1";
bKingImage.src = "img/blackKing.png";

// Template for the piece object
class Piece {
    constructor(type, image, positX, positY, name) {
        this.type = type; // To eventually be used for movement sets?
        this.image = image;
        this.positX = positX;
        this.positY = positY;
        this.name = name; // Mainly useful for debugging, console logging, etc.
    }
}

//Defining each piece as an object
//White
let p1 = new Piece("wPawn", wPawnImage, 0, 600, "white pawn 1");
let p2 = new Piece("wPawn", wPawnImage, 100, 600, "white pawn 2");
let p3 = new Piece("wPawn", wPawnImage, 200, 600, "white pawn 3");
let p4 = new Piece("wPawn", wPawnImage, 300, 600, "white pawn 4");
let p5 = new Piece("wPawn", wPawnImage, 400, 600, "white pawn 5");
let p6 = new Piece("wPawn", wPawnImage, 500, 600, "white pawn 6");
let p7 = new Piece("wPawn", wPawnImage, 600, 600, "white pawn 7");
let p8 = new Piece("wPawn", wPawnImage, 700, 600, "white pawn 8");
let r1 = new Piece("wRook", wRookImage, 0, 700, "white rook 1");
let r2 = new Piece("wRook", wRookImage, 700, 700, "white rook 2");
let n1 = new Piece("wKnight", wKnightImage, 100, 700, "white knight 1");
let n2 = new Piece("wKnight", wKnightImage, 600, 700, "white knight 2");
let b1 = new Piece("wBishop", wBishopImage, 200, 700, "white bishop 1");
let b2 = new Piece("wBishop", wBishopImage, 500, 700, "white bishop 2");
let q1 = new Piece("wQueen", wQueenImage, 300, 700, "white queen");
let k1 = new Piece("wKing", wKingImage, 400, 700, "white king");
let whitePieces = [p1, p2, p3, p4, p5, p6, p7 ,p8, r1, r2, n1, n2, b1, b2, q1, k1];
//Black
let pa = new Piece("bPawn", bPawnImage, 0, 100, "black pawn 1");
let pb = new Piece("bPawn", bPawnImage, 100, 100, "black pawn 2");
let pc = new Piece("bPawn", bPawnImage, 200, 100, "black pawn 3");
let pd = new Piece("bPawn", bPawnImage, 300, 100, "black pawn 4");
let pe = new Piece("bPawn", bPawnImage, 400, 100, "black pawn 5");
let pf = new Piece("bPawn", bPawnImage, 500, 100, "black pawn 6");
let pg = new Piece("bPawn", bPawnImage, 600, 100, "black pawn 7");
let ph = new Piece("bPawn", bPawnImage, 700, 100, "black pawn 8");
let ra = new Piece("bRook", bRookImage, 0, 0, "black rook 1");
let rb = new Piece("bRook", bRookImage, 700, 0, "black rook 2");
let na = new Piece("bKnight", bKnightImage, 100, 0, "black knight 1");
let nb = new Piece("bKnight", bKnightImage, 600, 0, "black knight 2");
let ba = new Piece("bBishop", bBishopImage, 200, 0, "black bishop 1");
let bb = new Piece("bBishop", bBishopImage, 500, 0, "black bishop 2");
let qa = new Piece("bQueen", bQueenImage, 300, 0, "black queen");
let ka = new Piece("bKing", bKingImage, 400, 0, "black king");
let blackPieces = [pa, pb, pc, pd, pe, pf, pg ,ph, ra, rb, na, nb, ba, bb, qa, ka];
let allPieces = [p1, p2, p3, p4, p5, p6, p7 ,p8, r1, r2, n1, n2, b1, b2, q1, k1, pa, pb, pc, pd, pe, pf, pg ,ph, ra, rb, na, nb, ba, bb, qa, ka]

// Rounds number to nearest 100
function findGrid(num){
    return Math.floor(num / 100)*100;
}

// Draw chess grid
// Blame the guy on Stackoverflow for the nested for loops (it needs to run through one loop for each square in a row, then do that for each row in the board)
function drawSquares() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            ctx.beginPath();
            ctx.fillStyle = ["#eeeed2", "#630"][(j + i) % 2];
            ctx.fillRect(i * 100, j * 100, 100, 100);
            ctx.closePath();
        }
    }
}

// Draw pieces onto the board
function drawPiece(piece) {
    ctx.drawImage(piece.image, piece.positX, piece.positY);
}
// Call drawPiece and drawSquares functions on page load
addEventListener("load", (event) => {
    drawSquares();
    whitePieces.forEach(element => {
        drawPiece(element);
    });
    blackPieces.forEach(element => {
        drawPiece(element);
    });
});

// Find a piece clicked on from mouse coordinate on board
// Mouse coordinates are supplied from getCursorPosition function
let pieceFound = false;
let isPieceSelected = false;
let selectedPiece = 0;
function findClickedPiece(x, y) {
    console.log(`X: ${x} Y: ${y}`);
    pieceFound = false;
    let i = 0;
    while(!pieceFound) { // Call checkPiece() on each array item until a piece is found
        checkPiece(x, y, i); // Done as a separate if statement function to improve efficiency.
        i++;
    }
}
function checkPiece(x, y, i) { // If provided piece is equal to the place clicked, coords privded by findClickedPiece(), select that piece.
    if (allPieces[i].positX == x && allPieces[i].positY == y) {
        pieceFound = true;
        isPieceSelected = true;
        selectedPiece = allPieces[i];
    }
}

// Deletes old image of a piece after creating a new one from moving
function fillOldTile(x, y) {
    if((((x/100) + (y/100))%2) == 0) { // Odd tiles are black. Need to convert from the 100s on mouse coords to single digits (on hundreds everything will always resolve to even)
        ctx.fillStyle = "#eeeed2";
        ctx.fillRect(selectedPiece.positX, selectedPiece.positY, 100, 100);
    } else {
        ctx.fillStyle = "#630";
        ctx.fillRect(selectedPiece.positX, selectedPiece.positY, 100, 100);
    }
}

// Pathfinding and collision detection starts here
// Find which direction the piece is moving in - moving up/left on the board is a movement by -100 on the grid.
function findDirectionX(startX, newX) {
    let incrementX = -1;
    if(startX < newX) {
        incrementX = -100;
    } else {
        incrementX = 100;
    }
    return incrementX;
}

function findDirectionY(startY, newY) {
    let incrementY = -1;
    if(startY < newY) {
        incrementY = -100;
    } else {
        incrementY = 100;
    }
    return incrementY;
}

// Add the direction increment to the piece starting position until it reaches the designated new position
// Add each position on the way to the new spot to an array to check for matching positions of other pieces later
function createPathX(startX, newX) {
    console.log("Function called")
    let incrementX = findDirectionX(startX, newX);
    let positionX = [];
    let currentX = startX;
    while(currentX != newX) { // I think this results in an infinite loop? Should increment the X value until it reaches the newX (just less than or greater than wouldnt work, because pieces can move left or right)
        console.log("Loop called") // But, I don't see this in the console when I move a piece. Maybe it never gets called, maybe the browser prevents it from looping?
        currentX += incrementX;
        positionX.push(currentX);
    }
    return positionX;
}

// Same thing but for Y
function createPathY(startY, newY) {
    let incrementY = findDirectionY(startY, newY);
    let positionY = [];
    let currentY = startY;
    while(currentY != newY) { // I think this results in an infinite loop?
        currentY += incrementY;
        positionY.push(currentY);
    }
    return positionY;
}

// Ugly and evil function that is broken, inefficient, and should not exist
// The idea is that it should take arrays from the the create path functions to determine what tiles the piece will "pass over"
// Then, it should check if any of the other pieces on the board have matching X and Y coordinates to anything on the path
// Any piece other than a knight should not be able to move over others
function checkPath(arrayX, arrayY) {
    console.log("checking");
    for(let i = 0; i<arrayX.length && i<arrayY.length; i++) {
        let lastX = arrayX[arrayX.length - 1];
        let lastY = arrayY[arrayY.length - 1];
        let currentX = 0;
        let currentY = 0;
        // If one array is shorter than the other, it should continue using the last position on the array,
        // which would be the final target movement position.
        // Basically, it has already "reached" the target coordinate on one dimension,
        // And so it should continue on the other dimension until both targets are reached.
        if(arrayX[i] == undefined) { 
            currentX = lastX;
        } else {
            currentX = arrayX[i];
        }

        if(arrayY[i] == undefined) {
            currentY = lastY;
        } else {
            currentY = arrayY[i];
        }
        
        // Check if the current coordinate on the path collides with any other piece on the board
        // In my tests, this never even gets called. I think the process breaks before this.
        for(let i = 0; i<allPieces.length; i++) {
            if (allPieces[i].positX == currentX && allPieces[i].positY == currentY) {
                console.log(`FUCK YOU X: ${allPieces[i].positX} Y: ${allPieces[i].positY} NAME: ${allPieces[i].name}`);
            }
        }
    }
}

// The small function that brings it all together. Once everything works properly, it should return true/false based on if it detects collision or not.
function checkPathMovementForCollision(startX, newX, startY, newY) {
    let pathX = createPathX(startX, newX);
    let pathY = createPathY(startY, newY);
    checkPath(pathX, pathY);
}

// Creates a new image of the piece moved in the new tile, calls fillOldTile, updates piece position variables, and deselects the piece.
function movePiece(x, y) {
    if((selectedPiece.positX != x || selectedPiece.positY != y)) { // Dont move pieces on top of themself
        // checkPathMovementForCollision(selectedPiece.positX, x, selectedPiece.positY, y); (uncommenting this will crash the browser if you try to move a piece :3)
        // Whatever old function I had to not move pieces on top of other pieces no worky after I made the pathfinding function, so I gotta do that again.
        isPieceSelected = false;
        ctx.drawImage(selectedPiece.image, x, y);
        fillOldTile(selectedPiece.positX, selectedPiece.positY);
        selectedPiece.positX = x;
        selectedPiece.positY = y;
    } else {
        isPieceSelected = false;
    }
}

// Detect mouse coordinates to nearest hundred, see if it landed on a piece if there isn't one already selected. If a piece is already selected, call movePiece.
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    // Uses findGrid to round mouse position to nearest 100
    let x = findGrid(event.clientX - rect.left);
    let y = findGrid(event.clientY - rect.top);
    if(isPieceSelected == false) {
        findClickedPiece(x, y); // Detect whether mouse input landed on a piece
    } else {
        movePiece(x, y);
    }
}
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})