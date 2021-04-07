$(document).ready(function() {
  $("#userName").submit(function(event) {
    event.preventDefault();
  })
})
function Player(XO, username) {
  this.XO = XO
  this.username = username
}
function Game(players, gameboard) {
  this.players = players
  this.gameboard = gameboard
}
function Gameboard(squares) {
  this.squares = squares
}
function Square() {
this.markedWithSymbol = ""
}
Square.prototype.addMark = function(markBeingPassedIntoMethod) {
  this.markedWithSymbol = markBeingPassedIntoMethod
}
Player.prototype.isMyTurn = function(fact) {
  this.myTurn = fact
} 
Game.prototype.isItOver = function() {
  //Gameboard method
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
//Gameboard method
//look at the Squares
//return gameboard state