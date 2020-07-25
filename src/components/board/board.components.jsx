import React from "react";
import Cell from "../cell/cell.component";
import "./board.styles.css";
class Board extends React.Component {
  static defaultProps = { nrows: 5, ncols: 5, chanceOn: 0.75 };
  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.generateBoard() };
    this.handleToggle = this.handleToggle.bind(this);
  }

  generateBoard() {
    const board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        row.push(Math.random() < this.props.chanceOn ? true : false);
      }
      board.push(row);
    }
    return board;
  }
  handleToggle(recievedIndex) {
    const i = recievedIndex.split("-");
    const clickedIndex = i.join("");
    this.setState((curSt) => {
      const newBoard = curSt.board.map((row, rowIndex, arr) =>
        row.map((col, colIndex) => {
          return `${rowIndex}${colIndex}` === clickedIndex
            ? //  ||
              //   `${rowIndex - 1}${colIndex}` === clickedIndex ||
              //   `${rowIndex + 1}${colIndex}` === clickedIndex ||
              //   `${rowIndex}${colIndex + 1}` === clickedIndex ||
              //   `${rowIndex}${colIndex - 1}` === clickedIndex
              !arr[rowIndex][colIndex]
            : arr[rowIndex][colIndex];
        })
      );
      const handleWin = newBoard.every((row) =>
        row.every((cell) => cell === false)
      );

      return { board: newBoard, hasWon: handleWin };
    });
  }
  renderBoard() {
    if (this.state.hasWon) {
      return (
        <div class="container">
          <div class="neon win">You </div>
          <div class="flux win">Win!!</div>
        </div>
      );
    }
    return (
      <div>
        <div class="container">
          <div class="neon">Lights </div>
          <div class="flux">Out</div>
        </div>
        <table>
          <tbody>
            {this.state.board.map((row, index, arr) => (
              <tr>
                {row.map((col, idx) => (
                  <td>
                    {
                      <Cell
                        on={arr[index][idx]}
                        index={`${index}-${idx}`}
                        toggle={this.handleToggle}
                      />
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    return <div className="Board">{this.renderBoard()}</div>;
  }
}
export default Board;
