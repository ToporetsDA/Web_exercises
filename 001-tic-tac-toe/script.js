var screens = ['menu', 'settings', 'select-mode', 'game', 'results'];

var themes = {
  'Dark': {
    'menu':        'rgb(155, 55, 55)',
    'settings':    'rgb(55, 155, 55)',
    'select-mode': 'rgb(55, 55, 155)',
    'game':        'rgb(155, 155, 155)',
    'results':     'rgb(27, 155, 112)',
  },
  'Light': {
    'menu':        'rgb(225, 155, 155)',
    'settings':    'rgb(155, 255, 155)',
    'select-mode': 'rgb(155, 155, 255)',
    'game':        'rgb(255, 255, 255)',
    'results':     'aquamarine',
  },
  'Green': {
    'menu':        'rgb(155, 255, 155)',
    'settings':    'rgb(155, 255, 155)',
    'select-mode': 'rgb(155, 255, 155)',
    'game':        'rgb(155, 255, 155)',
    'results':     'rgb(155, 255, 155)',
  },
}

var players = [];
var currentPlayer = null;
var board = ['', '', '', '', '', '', '', '', ''];
var currentMode = {
  numberOfPlayers: null,
  playerSymbol: null
}
var winnerMessage = '';
var X = 0;
var O = 0;
var numberOfPlayers = 0;
var playerSymbol = ` `;
//var numOfPlayers = ` `;
var tile = null;
var tileId = null;
var tileContent = null;

function changeTheme (themeName) {
  var themeValues = themes[themeName];
  for (var screen in themeValues) {
    var el = document.getElementById(screen);
    el.style.backgroundColor = themeValues[screen];
  }
}

function createThemeButtons () {
  var container = document.getElementById('theme-buttons-container');
  for (var themeName in themes) {
    container.innerHTML += `<button onclick="changeTheme('${themeName}')">${themeName}</button>`
  }
}

function hideAllScreens () {
  for (let i = 0; i < screens.length; i++) {
    var el = document.getElementById(screens[i]);
    el.style.display = 'none';
  }
}

function showScreen (screenName) {
  hideAllScreens();
  var el = document.getElementById(screenName);
  el.style.display = 'flex';
}

function startNewScore () {
  const scoreX = document.getElementById('score-x');
  const scoreO = document.getElementById('score-o');
  scoreX.innerHTML = X;
  scoreO.innerHTML = O;
  showScreen('select-mode')
}

function continueScore () {
  const scoreX = document.getElementById('score-x');
  const scoreO = document.getElementById('score-o');
  if (winnerMessage === `Player X is winner`) {
    scoreX.innerHTML = X + 1;
  }
  if (winnerMessage === `Player O is winner`) {
    scoreO.innerHTML = O + 1;
  }
  selectMode(currentMode.numberOfPlayers, currentMode.playerSymbol);
  resetBoard();
}

function selectMode (numberOfPlayers, playerSymbol) {
  currentMode["numberOfPlayers"] = numberOfPlayers;
  currentMode["playerSymbol"] = playerSymbol;
  var secondPlayerSymbol = '';
  if (playerSymbol === 'X') secondPlayerSymbol = 'O';
  if (playerSymbol === 'O') secondPlayerSymbol = 'X';
  if (numberOfPlayers === 1) {
    players = [
      { type: 'human', symbol: playerSymbol},
      { type: 'computer', symbol: secondPlayerSymbol},
    ];
  } else {
    players = [
      { type: 'human', symbol: playerSymbol},
      { type: 'human', symbol: secondPlayerSymbol},
    ];
  }
  if (numberOfPlayers = 2) {
    if (Math.random() < 0.5) {
      currentPlayer = 1;
    } else {
      currentPlayer = 0;
    }
  } else {
    if (playerSymbol = `X`) {
      currentPlayer = 0;
    }
    if (playerSymbol = `O`) {
      currentPlayer = 1;
    }
  }
  showScreen('game');
  underlinePlayer(players[currentPlayer].symbol);
  resetBoard();
  numOfPlayers = numberOfPlayers;
}


function resetBoard () {
  for (let i = 0; i < 9; i++) {
    board[i] = '';
    var tile = document.getElementById('tile-' + i);
    tile.innerHTML = '';
    tile.classList.add("tile-hover");
  }
  var tiles = document.getElementsByClassName('tile');
  for (var tile of tiles) {
    tile.addEventListener('click', makeMove);
  }
}


function makeMove (event) {
    tile = event.target;
    tileId = event.target.id;
    tileContent = [tile].innerHTML;
    console.log(tileContent);
    tile.classList.remove("tile-hover");
    tileId = parseInt(tileId.split('-')[1]);
    var currentPlayerSymbol = players[currentPlayer].symbol;
    tile.innerHTML = currentPlayerSymbol;
    board[tileId] = currentPlayerSymbol;
    checkGameEnd(currentPlayer);
    if (currentPlayer === 0) {
      currentPlayer = 1;
    } else {
      currentPlayer = 0;
    }
    var newCurrentPlayerSymbol = players[currentPlayer].symbol;
    tile.removeEventListener('click', makeMove);
    underlinePlayer(newCurrentPlayerSymbol);
    if (numberOfPlayers = 1) {
      PCLogic(newCurrentPlayerSymbol);
    }
}

/*function PCLogic (PCSimbol) {
  var moveMade = false;
  while (moveMade = false) {
    var PCMove = ` `;
    PCMove = Math.floor(Math.random() * (9 - 1 + 1) + 1) - 1;
    tileId = 'tile-'+[PCMove];
    tile = document.getElementById(tileId);
    tileContent = tile.innerHTML;
    if {
      moveMade = true;
    }
  }
  tileId.classList.remove("tile-hover");
  var currentPlayerSymbol = players[secondPlayer].symbol;
  tile.innerHTML = currentPlayerSymbol;
  board[tileId] = currentPlayerSymbol;
  checkGameEnd(currentPlayer);
  if (currentPlayer === 0) {
    currentPlayer = 1;
  } else {
    currentPlayer = 0;
  }
}*/

function PCLogic (PCSimbol) {
  var moveMade = false;
  while (moveMade = false) {
    var PCMove = Math.floor(Math.random() * 10);
    if (PCMove.innerHTML = ` `) {
      moveMade = true;
    }
  }
  PCMove.classList.remove("tile-hover");
  tileId = parseInt(split('tile-')[PCMove]);
  var currentPlayerSymbol = players[currentPlayer].symbol;
  PCMove.innerHTML = currentPlayerSymbol;
  board[PCMove] = currentPlayerSymbol;
  checkGameEnd(currentPlayer);
  if (currentPlayer === 0) {
    currentPlayer = 1;
  } else {
    currentPlayer = 0;
  }
  var newCurrentPlayerSymbol = players[currentPlayer].symbol;
  PCMove.removeEventListener('click', makeMove);
  underlinePlayer(newCurrentPlayerSymbol);
  if (numberOfPlayers = 1) {
    PCLogic(newCurrentPlayerSymbol);
  }
}

function underlinePlayer (currentPlayerSymbol) {
  const playerX = document.getElementById('player-x');
  const playerO = document.getElementById('player-o');
  if (currentPlayerSymbol === 'X') {
    playerX.classList.add('current-player');
    playerO.classList.remove('current-player');
  } else {
    playerO.classList.add('current-player');
    playerX.classList.remove('current-player');
  }
}

function checkGameEnd (currentPlayer) {
  if ( board[0] === board[1] && board[1] === board[2] && board[2] !== ''
    || board[3] === board[4] && board[4] === board[5] && board[5] !== ''
    || board[6] === board[7] && board[7] === board[8] && board[8] !== ''
    || board[0] === board[3] && board[3] === board[6] && board[6] !== ''
    || board[1] === board[4] && board[4] === board[7] && board[7] !== ''
    || board[2] === board[5] && board[5] === board[8] && board[8] !== ''
    || board[0] === board[4] && board[4] === board[8] && board[8] !== ''
    || board[2] === board[4] && board[4] === board[6] && board[6] !== ''
  ) {
    winnerMessage = `Player ${players[currentPlayer].symbol} is winner`;
    showScreen('results');
    document.getElementById('winner-message').innerHTML = winnerMessage;
  } else {
    var emptyTiles = board.filter(function(e) {return e === ""});
    if (emptyTiles.length === 0) {
      winnerMessage = `It's a draw`;
      showScreen('results');
      document.getElementById('winner-message').innerHTML = winnerMessage;
    }
  }
}

changeTheme('dark');
createThemeButtons();
showScreen('menu');