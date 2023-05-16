import './index.css';
import React, { useEffect, useState } from "react";

function App() {
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [count,setCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);


  const [gridCells, setGridCells] = useState(Array(9).fill({ marker: "", visited: false }));

  function Alert() {
    return (
      <p className="alert-message">Game over! Click Reset to play another game.</p>
    );
  }

  function handleChanges(index) {
    if(gameOver) {
      setShowAlert(true);
    }
    if (!gridCells[index].visited && !gameOver) {
      const newMarker = player === 1 ? "X" : "O";
      const newGridCells = [...gridCells];
      newGridCells[index] = {
        marker: newMarker,
        visited: true
      };
      setGridCells(newGridCells);
      setPlayer(player === 1 ? 2 : 1);
      checkWinner(index, newMarker);
      setCount(count+1);
    }
  }
  useEffect(() => {
    if (count === 9 && winner !== "X wins!!" && winner !== "O wins!!") {
      setWinner("It's a DRAW!!");
      setGameOver(true);
      setCount(0);
    }
  }, [count, winner]);  

  const winningCombos = {};
  winningCombos[1] = [[2, 3], [4, 7], [5, 9]];
  winningCombos[2] = [[1, 3], [5, 8]];
  winningCombos[3] = [[1, 2], [6, 9], [5, 7]];
  winningCombos[4] = [[1, 7], [5, 6],];
  winningCombos[5] = [[1, 9], [2, 8], [4, 6]];
  winningCombos[6] = [[4, 5], [3, 9]];
  winningCombos[7] = [[1, 4], [8, 9], [3, 5]];
  winningCombos[8] = [[7, 9], [2, 5]];
  winningCombos[9] = [[3, 6], [1, 5], [7, 8]];

  function checkWinner (index, currMarker){
    for(let i =0;i<winningCombos[index+1].length;i++) {
      let id1 = winningCombos[index+1][i][0]-1;
      let id2 = winningCombos[index+1][i][1]-1;
      if((gridCells[id1].marker === currMarker) && (gridCells[id2].marker === currMarker)) {
        setWinner(`${currMarker} wins!!`);
        setCount(0);
        setGameOver(true);
      }
    }
  };

  function reset () {
    setGridCells(Array(9).fill({ marker: "", visited: false }));
    setPlayer(1);
    setWinner("");
    setGameOver(false);
    setCount(0);
    setShowAlert(false);
  }
  
  return (
    <div className="App">
      <h1 className='winner'>{winner}</h1>
      {showAlert && gameOver && (
        <Alert
          message="Game over! Click Reset to play another game!"
        />
      )}
      <div className='grids'>
      <div className="row1">
        <div className='cell0' onClick={() => {handleChanges(0)}}>{gridCells[0].marker}</div>
        <div className='cell1' onClick={() => {handleChanges(1)}}>{gridCells[1].marker}</div>
        <div className='cell2'onClick={() => {handleChanges(2)}}>{gridCells[2].marker}</div>
      </div>
      <div className="row2">
        <div className='cell3'onClick={() => {handleChanges(3)}}>{gridCells[3].marker}</div>
        <div className='cell4'onClick={() => {handleChanges(4)}}>{gridCells[4].marker}</div>
        <div className='cell5'onClick={() => {handleChanges(5)}}>{gridCells[5].marker}</div>
      </div>
      <div className="row3">
        <div className='cell6'onClick={() => {handleChanges(6)}}>{gridCells[6].marker}</div>
        <div className='cell7'onClick={() => {handleChanges(7)}}>{gridCells[7].marker}</div>
        <div className='cell8'onClick={() => {handleChanges(8)}}>{gridCells[8].marker}</div>
      </div>
      <div className='reset' id='reset'>
        <button onClick={reset}>RESET</button>
      </div>
      </div>
    </div>
  );
}

export default App;
