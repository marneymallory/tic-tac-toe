// Business Logic for Player -----
function Player(playerSymbol, username) {
  this.symbol = playerSymbol;
  this.username = username
}

Player.prototype.isMyTurn = function(fact) {
  this.myTurn = fact
} 

// Business Logic for Game -----
function Game() {
  this.players = {};
  this.gameboard;
  this.whosTurn = "Player 1";
  this.currentId = 0;
}

Game.prototype.assignId = function(){
  this.currentId += 1;
  return this.currentId;
}

Game.prototype.addPlayer = function(player) {
  player.id = this.assignId();
  this.players[player.id] = player;
}

Game.prototype.addBoard = function(board) {
  this.gameboard = board;
}

Game.prototype.myTurnDone = function() {
  if (this.whosTurn === "Player 1") {
    this.whosTurn = "Player 2";
  } else if (this.whosTurn === "Player 2") {
    this.whosTurn = "Player 1";
  }
}

Game.prototype.isItOver = function() {
  const gameboardObject = this.gameboard;
  const xPlayerSquaresFilled = gameboardObject.squaresFilledByPlayer("X");
  const oPlayerSquaresFilled = gameboardObject.squaresFilledByPlayer("O");
  const emptySquares = gameboardObject.squaresFilledByPlayer("");
  
  const xPlayerString = xPlayerSquaresFilled.toString();
  
  const winningPossibilites = [[1,2,3], [1,4,7], [1,5,9], [4,5,6], [7,8,9], [3,5,7], [2,5,8], [3,6,9]];
  let winner;
  console.log(xPlayerSquaresFilled);
  console.log(oPlayerSquaresFilled);
  console.log(emptySquares);
  winningPossibilites.forEach(function(possibility) {
    //possibility = [1, 2, 3];
    console.log(possibility);
    if(xPlayerSquaresFilled.includes(possibility[0].toString()) && xPlayerSquaresFilled.includes(possibility[1].toString()) && xPlayerSquaresFilled.includes(possibility[2].toString())) {
      console.log("X wins!")
      winner = "X";
    }
    if(oPlayerSquaresFilled.includes(possibility[0].toString()) && oPlayerSquaresFilled.includes(possibility[1].toString()) && oPlayerSquaresFilled.includes(possibility[2].toString())) {
      console.log("O wins!")
      winner = "O";
    }
    if(emptySquares.length === 0) {
      winner = "Draw";
    }
  })
  if (winner) {
    return winner;
  }
  return "Continue";
}

Game.prototype.resetGame = function() {
  this.players = {};
  this.whosTurn = "Player 1";
  this.currentId = 0;
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
  const squares = this.squares;
  const squareKeys = Object.keys(squares);
  let squareNumbersFilled = [];
  squareKeys.forEach(function(key) {
    const squareSymbol = squares[key].markedWithSymbol;
    if (squareSymbol === markedWithSymbol){
      squareNumbersFilled.push(key); //not sure if key == square number, debug later?
    }
  });
  console.log(squareNumbersFilled);
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
function attachTicContainerListener(game) {
  $("div.tic-container").on("click", "div.tic-box", function() {
    const currentPlayerTurn = game.whosTurn;
    const clickedSquare = game.gameboard.squares[this.id];
    
    //based on who's turn it is, either put in an X or O
    let playerSymbol;
    if(currentPlayerTurn === "Player 1") {
      playerSymbol = "X";
    } else if (currentPlayerTurn === "Player 2") {
      playerSymbol= "O";
    }
    clickedSquare.markedWithSymbol = playerSymbol;
    game.myTurnDone();

    $("#" + this.id).text(playerSymbol);
    let winner = game.isItOver();
    $(".tic-panel").text(winner);
    console.log(clickedSquare.markedWithSymbol);
    console.log("#" + this.id); //this.id = 1 ->
    console.log(`#${this.id}`); //${this.id} = 1 -> "#1" '#${this.id}'
  })
}

$(document).ready(function() {
  const game = new Game();
  attachTicContainerListener(game)
  $("#userName").submit(function(event) {
    event.preventDefault();
    game.resetGame();
    const playerOneName = $("#player1").val();
    const playerTwoName = $("#player2").val();

    const playerOne = new Player("X", playerOneName);
    const playerTwo = new Player("O", playerTwoName);
    const gameBoard = new Gameboard();
    gameBoard.populateSquares();
    game.addPlayer(playerOne); 
    game.addPlayer(playerTwo);
    game.addBoard(gameBoard);
    console.log(playerOne);
    console.log(playerTwo);
    console.log(gameBoard);
    console.log(game);
  });
})