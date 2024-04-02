import { useState } from "react";
import { Board } from "./board";

export default function Game() {
    const [history, setHistory] = useState<Value[][]>([Array(9).fill(null)]);
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

    const move = history.map((_u, i) => {
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
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{move}</ol>
            </div>
        </div>
    );
}