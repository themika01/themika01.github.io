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
let r1 = new Piece("Rook", wRookImage, 0, 700, "white rook 1");
let r2 = new Piece("Rook", wRookImage, 700, 700, "white rook 2");
let n1 = new Piece("Knight", wKnightImage, 100, 700, "white knight 1");
let n2 = new Piece("Knight", wKnightImage, 600, 700, "white knight 2");
let b1 = new Piece("Bishop", wBishopImage, 200, 700, "white bishop 1");
let b2 = new Piece("Bishop", wBishopImage, 500, 700, "white bishop 2");
let q1 = new Piece("Queen", wQueenImage, 300, 700, "white queen");
let k1 = new Piece("King", wKingImage, 400, 700, "white king");
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
let ra = new Piece("Rook", bRookImage, 0, 0, "black rook 1");
let rb = new Piece("Rook", bRookImage, 700, 0, "black rook 2");
let na = new Piece("Knight", bKnightImage, 100, 0, "black knight 1");
let nb = new Piece("Knight", bKnightImage, 600, 0, "black knight 2");
let ba = new Piece("Bishop", bBishopImage, 200, 0, "black bishop 1");
let bb = new Piece("Bishop", bBishopImage, 500, 0, "black bishop 2");
let qa = new Piece("Queen", bQueenImage, 300, 0, "black queen");
let ka = new Piece("King", bKingImage, 400, 0, "black king");
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


function createPieceMoveset(pieceType) {
    let validMoves = [[], []]; // First array is for X values, second for Y values
    switch (pieceType) {
        case "wPawn":
            validMoves = createPawnArray();
            break;
        case "bPawn": // These have different movesets but can still be dealt with by the same function
            validMoves = createPawnArray();
            break;
        case "King":
            validMoves = createKingArray();
            break;
    }
    return validMoves;
}
// Highlight the tiles a piece can move to when selected
function highlightPieceMoveset() {
    let validMoves = createPieceMoveset(selectedPiece.type)
    ctx.fillStyle = "rgba(0, 153, 51, 0.5)"; // Transparent green
    console.log(validMoves)
    for(let i = 0; i<validMoves.length; i++) {
        // Go through each item in the nested array and highlight green at [[x coord], [y coord]]
        for(let j = 0; j<validMoves[i].length; j++) {
            ctx.fillRect(validMoves[0][j], validMoves[1][j], 100, 100);
        }
    }
}

function createPawnArray() {
    let pawnMoves = [[0, 0], [0, 0]];
    console.log(selectedPiece.type);
    if(selectedPiece.type == "wPawn") {
        pawnMoves[0][0] = selectedPiece.positX;
        pawnMoves[0][1] = selectedPiece.positX;
        pawnMoves[1][0] = selectedPiece.positY - 100;
        pawnMoves[1][1] = selectedPiece.positY - 200;
    } else {
        pawnMoves[0][0] = selectedPiece.positX;
        pawnMoves[0][1] = selectedPiece.positX;
        pawnMoves[1][0] = selectedPiece.positY + 100;
        pawnMoves[1][1] = selectedPiece.positY + 200;
    }
    return pawnMoves;
}

function createKingArray() {
    let kingMoves = [[0, 1, 2, 3], [0, 1, 2, 3]];
    kingMoves[0][0] = selectedPiece.positX-100;
    kingMoves[1][0] = selectedPiece.positY;
    kingMoves[0][1] = selectedPiece.positX+100;
    kingMoves[1][1] = selectedPiece.positY;
    kingMoves[0][2] = selectedPiece.positX;
    kingMoves[1][2] = selectedPiece.positY+100;
    kingMoves[0][3] = selectedPiece.positX;
    kingMoves[1][3] = selectedPiece.positY-100;
    return kingMoves;
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

function removeHighlightedAreas() {
    let oldMoves = createPieceMoveset(selectedPiece.type);
    for(let i = 0; i<oldMoves.length; i++) {
        // Go through each item in the nested array and highlight green at [[x coord], [y coord]]
        for(let j = 0; j<oldMoves[i].length; j++) {
            if((((oldMoves[0][j]/100) + (oldMoves[1][j]/100))%2) == 0) {
                ctx.fillStyle = "#eeeed2";
            } else {
                ctx.fillStyle = "#630";
            }
            ctx.fillRect(oldMoves[0][j], oldMoves[1][j], 100, 100);
        }
    }
}

// Creates a new image of the piece moved in the new tile, calls fillOldTile, updates piece position variables, and deselects the piece.
function movePiece(x, y) {
    if((selectedPiece.positX != x || selectedPiece.positY != y)) { // Dont move pieces on top of themself
        removeHighlightedAreas();
        isPieceSelected = false;
        ctx.drawImage(selectedPiece.image, x, y);
        fillOldTile(selectedPiece.positX, selectedPiece.positY);
        selectedPiece.positX = x;
        selectedPiece.positY = y;
    } else {
        isPieceSelected = false;
    }
}

// Find a piece clicked on from mouse coordinate on board
// Mouse coordinates are supplied from getCursorPosition function
let pieceFound = false;
let isPieceSelected = false;
let selectedPiece = 0;
function findClickedPiece(x, y) {
    console.log(`X: ${x} Y: ${y}`);
    pieceFound = false;
    let i = 0;
    while(!pieceFound || i<allPieces.length-1) { // Call checkPiece() on each array item until a piece is found
        checkPiece(x, y, i); // Done as a separate if statement function to improve efficiency.
        i++;
    }
}
function checkPiece(x, y, i) { // If provided piece is equal to the place clicked, coords privded by findClickedPiece(), select that piece.
    if (allPieces[i].positX == x && allPieces[i].positY == y) {
        pieceFound = true;
        isPieceSelected = true;
        selectedPiece = allPieces[i];
        highlightPieceMoveset();
    }
}

// Detect mouse coordinates to nearest hundred, see if it landed on a piece if there isn't one already selected. 
// If a piece is already selected, call movePiece.
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