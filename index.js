//DOM SELECTORS
const body = document.getElementsByTagName('body')[0];
const colorButtons = document.querySelectorAll('.color');
const openingScreen = document.querySelector('#opening-screen');
const dynamicMenu = document.getElementById('dynamic-menu');
const screenContent = document.querySelectorAll('.opening-content');
const nameFormContainer = document.querySelector('#name-forms');
const inputField = document.querySelectorAll('.input');
const title = document.querySelector('#title');
const turnDisplay = document.querySelector('#whos-turn');
const winnerDisplay = document.querySelector('#winner');
const clearBoardButton = document.querySelector('#clear-board');
const boardSizeSelectorContainer = document.getElementById('board-size-selector');
const gameGrid = document.querySelector('#game-grid');
const scoresDisplay = document.getElementsByClassName('score');


//STATE
const gameState = {};
gameState.players = ['X', 'O'];
gameState.board = [];
gameState.playersNames = ['', ''];
gameState.scores = [0,0];
gameState.isGameOver = true;
gameState.numberOfPlayers = 0;
gameState.activePlayer = gameState.players[Math.floor(Math.random() * 2)];
gameState.size = 3;
gameState.turnCounter = 0;
gameState.startingFontSize = 75;
gameState.boardSize = 300;
gameState.startingSize = 3;
gameState.difficulty = 1;
gameState.colorSchemes = {
    teal: {
        firstColor: '#e0ebeb',
        secondColor: '#a7bcb9',
        thirdColor: '#5dacbd',
        fourthColor: '#24527a',
    },

    pink: {
        firstColor: '#fecea8',
        secondColor: '#e84a5f',
        thirdColor: '#ff847c',
        fourthColor: '#45171d',
    },

    purple: {
        firstColor: '#e7eaf6',
        secondColor: '#a2a8d3',
        thirdColor: '#38598b',
        fourthColor: '#143c5f',
    },

    grey:{
        firstColor: '#EEEEEE',
        secondColor: '#CCCCCC',
        thirdColor: '#666666',
        fourthColor: '#333333',
    }
}

scoresDisplay[0].innerText = `X: ${gameState.scores[0]}`;
scoresDisplay[1].innerText = `O: ${gameState.scores[1]}`;
turnDisplay.innerText = ``;
clearBoardButton.innerText = 'New Game?';
title.innerText = 'Tic-Tac-Toe';
winnerDisplay.innerText = 'Winner: '
winnerDisplay.style.visibility = 'hidden';
dynamicMenu.innerHTML = `<h4>Choose Number of Players:</h4>
<div id="human-count-container"><button class="human-count-button">
1</button><button class="human-count-button">2</button></div>`
const humanCountButtons = document.querySelectorAll('.human-count-button');
body.style.backgroundColor = gameState.colorSchemes.grey.firstColor;
body.style.color = gameState.colorSchemes.grey.fourthColor;
openingScreen.style.backgroundColor = gameState.colorSchemes.grey.thirdColor;
gameGrid.style.backgroundColor = gameState.colorSchemes.grey.secondColor;
gameGrid.style.width = gameState.boardSize;
gameGrid.style.height = gameGrid.style.width;





//HELPER FUNCTIONS

const chooseColor = () =>{
    for(let i = 0; i < colorButtons.length; i++){
        colorButtons[i].addEventListener('click', ()=> {
        const currentColorScheme = gameState.colorSchemes[colorButtons[i].value];
            body.style.backgroundColor = currentColorScheme.firstColor;
            body.style.color = currentColorScheme.fourthColor
            openingScreen.style.backgroundColor = currentColorScheme.thirdColor;
            gameGrid.style.backgroundColor = currentColorScheme.secondColor
           
        })
    }
}

const makeBoard = (grids) => {
    gameState.board.map((element) => element.length = 0)
    gameState.board.length = 0;
    for(let i = 0; i < grids; i++){
        const rowArray = [];
        const newRow = document.createElement('tr');
        newRow.classList.add('row');
    for(let j = 0; j < grids; j++){
        const newColumn = document.createElement('td');
        newColumn.classList.add('column')
        newColumn.style.width = `${gameState.boardSize/grids}px`;
        newColumn.style.height = newColumn.style.width;
        newColumn.style.fontSize = `${gameState.startingFontSize*(gameState.startingSize/grids)}px`;
        newRow.appendChild(newColumn);
        gameGrid.appendChild(newRow);
        rowArray.push(newColumn);
    }
    gameState.board.push(rowArray);
}
}

const chooseSizeOfBoard = () => {
    for(let i = 0; i < sizeSelector.length; i++){
        sizeSelector[i].addEventListener('click', ()=>{
            gameGrid.innerHTML = '';
            gameState.size = sizeSelector[i].value;
            makeBoard(gameState.size);
        })
    }
}

const makeMove = (players) =>{
    if(players === 2){
    for(let i = 0; i <gameState.board.length; i++){
        for(let j = 0; j < gameState.board[i].length; j++){
            gameState.board[i][j].addEventListener('click', () =>{
                if(gameState.board[i][j].innerText === '' && !gameState.isGameOver){
                    gameState.activePlayer === gameState.players[0] ? turnDisplay.innerText = `${gameState.playersNames[1]}(${gameState.players[1]}'s Turn)` : turnDisplay.innerText = `Turn: ${gameState.playersNames[0]}(${gameState.players[0]})`;
                    gameState.board[i][j].innerText = gameState.activePlayer;
                    gameState.turnCounter++
                    checkForWin(gameState.activePlayer, i, j);
                    gameState.activePlayer === gameState.players[0] ? gameState.activePlayer = gameState.players[1] : gameState.activePlayer = gameState.players[0]; 

                }
            })
        }
    }
    }

    if(players === 1){
        if(gameState.activePlayer === gameState.players[1]){
            randomComputerControls();
    }
    for(let i = 0; i <gameState.board.length; i++){
        for(let j = 0; j < gameState.board[i].length; j++){
            gameState.board[i][j].addEventListener('click', () =>{
                if(gameState.board[i][j].innerText === '' && !gameState.isGameOver && gameState.activePlayer === gameState.players[0]){
                    gameState.board[i][j].innerText = gameState.activePlayer;
                    gameState.turnCounter++;
                    checkForWin(gameState.activePlayer, i, j);
                    gameState.activePlayer = gameState.players[1];
                    turnDisplay.innerText = `${gameState.playersNames[1]}(${gameState.players[1]})'s Turn`;
                    if(gameState.difficulty === 1){
                    randomComputerControls();
                    }
                    else{
                    miniMax(createBoardModel(gameState.board), gameState.players[1]);
                    }
                    console.log('active');
                    checkForWin(gameState.activePlayer, i, j);
                }
            })
        }
    }
    }

}

const winState = (winner) =>{
    const winnerIndex = gameState.players.indexOf(winner);
    winnerDisplay.style.visibility = 'visible';
    winnerDisplay.innerText = `Winner: ${gameState.playersNames[winnerIndex]}(${winner})`;
    gameState.scores[winnerIndex]++;
    scoresDisplay[winnerIndex].innerText = `${gameState.playersNames[winnerIndex]}(${winner}): ${gameState.scores[winnerIndex]}`;
    gameState.isGameOver = true;
}
const checkRow = (player, row) =>{
    for(let i = 0; i < gameState.board[row].length; i++){
        if(gameState.board[row][i].innerText !== player) return;
}
    winState(player)
}
const checkColumn = (player, column) => {
    for(let i = 0; i < gameState.board.length; i++){
        if(gameState.board[i][column].innerText !== player) return;
    }
    winState(player);
}

const checkLeftDiagonal = (player) => {

    for(let i = 0; i < gameState.board.length; i++){
        if(gameState.board[i][i].innerText !== player){
             return;
            }
    }
    winState(player)
}

const checkRightDiagonal = (player) =>{
    for(let i = 0; i < gameState.board.length; i++){   
        if(gameState.board[i][(gameState.board.length -1) -i].innerText !== player) return; 
    }    
    winState(player)
}

const checkDraw = () => {
    for(let i = 0; i < gameState.board.length; i++){
        for(let j = 0; j < gameState.board.length; j++){
            if(gameState.board[i][j].innerText === '') return;
        }
    }
    winnerDisplay.style.visibility = 'visible';
    winnerDisplay.innerText = 'DRAW!'
    gameState.isGameOver = true;
}

const checkForWin = (player, currentRow, currentColumn) => {
    if(gameState.turnCounter >= (gameState.board.length *2) -1){
        checkRow(player, currentRow)
        if(!gameState.isGameOver) checkColumn(player, currentColumn);
        if(!gameState.isGameOver) checkLeftDiagonal(player);
        if(!gameState.isGameOver) checkRightDiagonal(player); 
        if(!gameState.isGameOver) checkDraw();
        if(gameState.isGameOver) clearBoard();
    }
    else{
        return}
}

const randomComputerControls = () =>{
    const rowMove = Math.floor(Math.random() * gameState.board.length);
    const columnMove = Math.floor(Math.random() * gameState.board.length);
    if(!gameState.isGameOver && gameState.board[rowMove][columnMove].innerText === ''){
        setTimeout(()=>{
            gameState.board[rowMove][columnMove].innerText = gameState.players[1];
            turnDisplay.innerText = `${gameState.playersNames[0]}(${gameState.players[0]})'s Turn`;
            gameState.activePlayer = gameState.players[0];
            gameState.turnCounter++;
            checkForWin(gameState.players[1], rowMove, columnMove);
        },800);
    
    return;
    }
    else{randomComputerControls()};
}


const findEmptySpaces = (board) => {
    const emptySpacesIndex = [];
    board = board.flat();
    for(let i = 0; i < board.length; i++){
      if(board[i] === ''){
        emptySpacesIndex.push(i);
      }
    }
    return emptySpacesIndex;
  }
  const checkRowComp = (board, player) =>{
      for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[i].length; j++){
          if(board[i][j] !== player) break;
          if(j === board.length-1)return true;
    }
    }
    return false;
    }
  
  const checkColumnComp = (board, player) => {
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
        if(board[j][i] !== player) break;
        if(j === board.length-1)return true;
  
    }
  }
  return false
  }
  
  const checkLeftDiagonalComp = (board, player) => {
  
    for(let i = 0; i < board.length; i++){
        if(board[i][i] !== player){
             return false;
            }
    }
    return true;
  }
  
  const checkRightDiagonalComp = (board, player) =>{
    for(let i = 0; i < board.length; i++){   
        if(board[i][(board.length -1) -i] !== player) return false; 
    }       
    return true;
  }
  
  const winCheck = (board, player) => {
    if(checkRowComp(board, player) || checkColumnComp(board, player) || 
    checkRightDiagonalComp(board, player) || checkLeftDiagonalComp(board, player)) 
    return true;
    else return false;
  }
  

  const createBoardModel = (htmlArray) =>{
    const boardModel = [];
    for(let i = 0; i < htmlArray.length; i++){
        const mediatorArray = [];
        for(let j = 0; j < htmlArray[i].length; j++){
            mediatorArray.push(htmlArray[i][j].innerText);
        }
        boardModel.push(mediatorArray);
    }
    return boardModel;
  }

  const miniMax = (newBoard, player) => {
      const availSpots = findEmptySpaces(newBoard);
      if(winCheck(newBoard, gameState.players[0])){
        return {score: -10};
      }
      else if(winCheck(newBoard, gameState.players[1])){
        return {score: 10};
      }
      else if (availSpots.length === 0){
        return{score: 0};
      }
      const moves = [];
      for(let i = 0; i < availSpots.length; i++){
        const move = {};
        move.indexI = Math.floor(availSpots[i] / newBoard.length); 
        move.indexJ = availSpots[i] % newBoard.length; 
        newBoard[move.indexI][move.indexJ] = player;
        if(player === gameState.players[1]){
          const result = miniMax(newBoard, gameState.players[0]);
          move.score = result.score
        }
        else{
          
          const result = miniMax(newBoard, gameState.players[1]);
          move.score = result.score;
        }
        moves.push(move);
      }
      let bestMove;
      if(player === gameState.players[1]){
        let bestScore = -10000;
        for(let i = 0; i < moves.length; i++){
          if(moves[i].score > bestScore){
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }else{
        let bestScore = 10000;
        for(let i = 0; i < moves.length; i++){
          if(moves[i].score < bestScore){
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }
      console.log(moves[bestMove]);
      gameState.board[moves[bestMove].indexI][moves[bestMove].indexJ].innerText = gameState.activePlayer;
    //   if(winCheck(newBoard, gameState.activePlayer)) console.log(true);
      
      gameState.activePlayer = gameState.players[0];
      return 
  }

const clearBoard = () => {
    clearBoardButton.style.visibility = 'visible';
    clearBoardButton.addEventListener('click', () => {
        for(let i = 0; i < gameState.board.length; i++){
            for(let j = 0; j < gameState.board.length; j++){
                gameState.board[i][j].innerText = ''
            }
        }
        gameState.isGameOver = false;
        clearBoardButton.style.visibility = 'hidden';
        winnerDisplay.style.visibility = 'hidden';
        winnerDisplay.innerText = 'Winner:';
        gameState.turnCounter = 0;
        makeMove(gameState.numberOfPlayers);
    })
}


const openingScreenFunction = () => {{
    let nameFields;
    for(let i = 0; i < humanCountButtons.length; i++){
        humanCountButtons[i].addEventListener('click', (eventClick)=> {
            if(eventClick.target === humanCountButtons[0]){
                gameState.numberOfPlayers = 1;
                gameState.playersNames[1] = 'Computer';
                nameFields = `<input class="name opening-content" type="text" placeholder="Player1(X)"></input>
                            <div id= "difficulty-buttons-container"><button class="diff-button">Random</button>
                            <button class="diff-button">Intentional</button>`;
            }
            else{
                gameState.numberOfPlayers = 2
                nameFields = `<input class="name opening-content" type="text" placeholder="Player1(X)">
                              <input class="name opening-content" type="text" placeholder="Player2(O)">`
            }
            dynamicMenu.innerHTML = `<h4 class="opening-content">Enter Players Names:</h4>
                ${nameFields}
                <h5 id="board-size-selector" class="opening-content">Select Board Size:
                <div id="size-buttons"> <button class="sizes" value="3">3x3</button> <button class="sizes" value="4">4x4</button> 
                <button class="sizes" value="5">5x5</button> <button class="sizes" value="6">6x6</button></div>
                </h5>
                <button class='opening-content' id="start-button">Start Game!</button>`;
                const difficultySelectorButtons = () => {
                    for(let i = 0; i < difficultyButtons.length; i++){
                        difficultyButtons[i].addEventListener('click', ()=>{
                            if(i === 0) {
                                gameState.difficulty = 1;
                            }
                            else{
                                gameState.difficulty = 2;
                            }
                        })
                    }
                }
                const difficultyButtons = document.querySelectorAll('.diff-button');
                const sizeSelector = document.querySelectorAll('.sizes');
                const startButton = document.getElementById('start-button'); 
                const names = document.querySelectorAll('.name');
               difficultySelectorButtons();
                for(let i = 0; i < sizeSelector.length; i++){
                    sizeSelector[i].addEventListener('click', ()=>{
                        gameGrid.innerHTML = '';
                        gameState.size = sizeSelector[i].value;
                        makeBoard(gameState.size);
                    })
                }
                startButton.addEventListener('click', ()=>{ 
                    for(let i = 0; i < gameState.numberOfPlayers; i++){
                        gameState.playersNames[i] = names[i].value;}
                    turnDisplay.innerText = `${gameState.playersNames[gameState.players.indexOf(gameState.activePlayer)]}(${gameState.activePlayer})'s Turn`;
                    scoresDisplay[0].innerText = `${gameState.playersNames[0]}(${gameState.players[0]}): ${gameState.scores[0]}`;
                    scoresDisplay[1].innerText = `${gameState.playersNames[1]}(${gameState.players[1]}): ${gameState.scores[1]}`;
                    gameState.isGameOver = false; 
                    openingScreen.style.visibility = 'hidden';
                    makeMove(gameState.numberOfPlayers);
                        console.log()
                })
        })
    }
}}
 
//RUN
makeBoard(gameState.size);
chooseColor();
openingScreenFunction();

