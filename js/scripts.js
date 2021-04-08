// Business Logic for Player -----
function Player(playerSymbol, username) {
  this.symbol = playerSymbol;
  this.username = username
}

Player.prototype.isMyTurn = function(fact) {
  this.myTurn = fact
} 

// Business Logic for Game -----
function Game(players, gameboard, Player1git) {
  this.players = players
  this.gameboard = gameboard
  this.whosTurn = "Player 1"
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
function Gameboard(squares) {
  this.squares = squares
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
    $("div.tic-box").text("X");
  })
}

$(document).ready(function() {
  attachTicContainerListener()
  $("#userName").submit(function(event) {
    event.preventDefault();
  });
})