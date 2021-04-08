// useState: tic tac toe
// 💯 (alternate) migrate from classes
// http://localhost:3000/isolated/exercise/04-classes.js

import * as React from 'react'

// If you'd rather practice refactoring a class component to a function
// component with hooks, then go ahead and do this exercise.

// 🦉 You've learned all the hooks you need to know to refactor this Board
// component to hooks. So, let's make it happen!

function Board() {
  const [squares, setSquares] = React.useState(
    () =>
      JSON.parse(window.localStorage.getItem('squares2')) ||
      Array(9).fill(null),
  )

  React.useEffect(() => {
    window.localStorage.setItem('squares2', JSON.stringify(squares))
  }, [squares])

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  let status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return
    }
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)
  }

  function renderSquare(squareIndex) {
    return (
      <button className="square" onClick={() => selectSquare(squareIndex)}>
        {squares[squareIndex]}
      </button>
    )
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={() => restart()}>
        restart
      </button>
    </div>
  )
}

// class Board extends React.Component {
//   state = {
//     squares:
//       JSON.parse(window.localStorage.getItem('squares')) || Array(9).fill(null),
//   }

//   selectSquare(square) {
//     const {squares} = this.state
//     const nextValue = calculateNextValue(squares)
//     if (calculateWinner(squares) || squares[square]) {
//       return
//     }
//     const squaresCopy = [...squares]
//     squaresCopy[square] = nextValue
//     this.setState({squares: squaresCopy})
//   }
//   renderSquare = i => (
//     <button className="square" onClick={() => this.selectSquare(i)}>
//       {this.state.squares[i]}
//     </button>
//   )

//   restart = () => {
//     this.setState({squares: Array(9).fill(null)})
//     this.updateLocalStorage()
//   }

//   componentDidMount() {
//     this.updateLocalStorage()
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.squares !== this.state.squares) {
//       this.updateLocalStorage()
//     }
//   }

//   updateLocalStorage() {
//     window.localStorage.setItem('squares', JSON.stringify(this.state.squares))
//   }

//   render() {
//     const {squares} = this.state
//     const nextValue = calculateNextValue(squares)
//     const winner = calculateWinner(squares)
//     let status = calculateStatus(winner, squares, nextValue)

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//         <button className="restart" onClick={this.restart}>
//           restart
//         </button>
//       </div>
//     )
//   }
// }

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
