// Business Logic for Player -----
function Player(playerSymbol, username) {
  this.symbol = playerSymbol;
  this.username = username
}

Player.prototype.isMyTurn = function(fact) {
  this.myTurn = fact
} 

// Business Logic for Game -----
function Game(gameboard) {
  this.players = {}
  this.gameboard = gameboard
  this.whosTurn = "Player 1"
  this.currentId = 0;
}

Game.prototype.assignID = function(){
  this.currentId += 1;
  return this.currentId;
}

Game.prototype.addPlayer = function(player) {
  player.id = this.assignId();
  this.players[player.id] = player;
}

Game.prototype.isItOver = function() {
  const gameboardObject = this.gameboard;
  const xPlayerSquaresFilled = gameboardObject.squaresFilledByPlayer("X");
  const oPlayerSquaresFilled = gameboardObject.squaresFilledByPlayer("O");
  const emptySquares = gameboardObject.squaresFilledByPlayer("");
  
  const xPlayerString = xPlayerSquaresFilled.toString();
  
  const winningPossibilites = [[1,2,3] [1,4,7] [1,5,9] [4,5,6] [7,8,9] [3,5,7] [2,5,8] [3,6,9]];
  let winningArray = [];
  
  winningPossibilites.forEach(function(possibility) {
    //possibility = [1, 2, 3];
    if(xPlayerSquaresFilled.includes(possibility[0]) && xPlayerSquaresFilled.includes(possibility[1]) && xPlayerSquaresFilled.includes(possibility[2])) {
      return "X";
    }
    if(oPlayerSquaresFilled.includes(possibility[0]) && oPlayerSquaresFilled.includes(possibility[1]) && oPlayerSquaresFilled.includes(possibility[2])) {
      return "O";
    }
    if(emptySquares.length === 0) {
      return "Draw";
    }
  })
  return "Continue";
}

// Business Logic for Gameboard -----
function Gameboard() {
  this.squares = {};
  this.currentId = 0;
}

Gameboard.prototype.addSquare = function(square) {
  this.currentId += 1;
  square.id = this.currentId;
  this.squares[square.id] = square;
}

Gameboard.prototype.populateSquares = function() {
  //const someArray = [3, 7, 9, 1];
  //someArray.forEach(function(element) { do something })
  for (let i = 0; i < 9; i+=1) { //this loop just says to run 9 times
    //make a square object with a constructor
    let newSquare = new Square();
    this.addSquare(newSquare); //add sqauare to gameboard
  }
}




Gameboard.prototype.squaresFilledByPlayer = function(markedWithSymbol){
  const squareKeys = Object.keys(this.squares);
  let squareNumbersFilled = [];
  squareKeys.forEach(function(key) {
    const squareSymbol = this.squares[key].markedWithSymbol;
    if (squareSymbol === markedWithSymbol){
      squareNumbersFilled.push(key); //not sure if key == square number, debug later?
    }
  });
  return squareNumbersFilled; //array of square numbers that have the markedWithSymbol character
}

// Business Logic for Square -----
function Square() {
  this.markedWithSymbol = ""
}
Square.prototype.addMark = function(markBeingPassedIntoMethod) {
  this.markedWithSymbol = markBeingPassedIntoMethod
}

// UI Logic -----
function attachTicContainerListener() {
  $("div.tic-container").on("click", "div.tic-box", function() {
    $("#" + this.id).text("X");
    console.log("#" + this.id); //this.id = 1 ->
    console.log(`#${this.id}`); //${this.id} = 1 -> "#1" '#${this.id}'
  })
}

$(document).ready(function() {
  attachTicContainerListener()
  $("#userName").submit(function(event) {
    event.preventDefault();
    const playerOneName = $("#player1").val();
    const playerTwoName = $("#player2").val();

    const playerOne = new Player("X", playerOneName);
    const playerTwo = new Player("O", playerTwoName);
    const gameBoard = new Gameboard();
    gameBoard.populateSquares();
    const game = new Game(gameBoard, playerOne, playerTwo);
    console.log(playerOne);
    console.log(playerTwo);
    console.log(gameBoard);
  });
})