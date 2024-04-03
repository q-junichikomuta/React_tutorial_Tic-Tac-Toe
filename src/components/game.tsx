import { useState } from "react";
import { Board } from "./board";
import styled from '@emotion/styled'


export default function Game({ squaresNum }: { squaresNum: number }) {
    const GameBoard = styled.div`
        display:flex;
        justify-content:center;
        align-items:center;
    `

    const [history, setHistory] = useState<Value[][]>([Array(squaresNum * squaresNum).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];


    function handlePlay(nextSquares: Value[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jampTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    const move = history.map((u, i) => {

        // const {row, col} = u.position || {}
        let description;
        if (i > 0) {
            description = "Go to move #" + i;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={i}>
                <button onClick={() => jampTo(i)}>{description}</button>
            </li>
        );
    });
    return (
        <GameBoard>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} squaresNum={squaresNum} />
            </div>
            <div className="game-info">
                <ol>{move}</ol>
            </div>
        </GameBoard>
    );
}