import { useMemo, useState } from "react";
import { Board } from "./board";
import styled from '@emotion/styled'

type History = {
    value: Value[];
    position: Position;
};

export default function Game({ squaresNum }: { squaresNum: number }) {
    const GameBoard = styled.div`
        display:flex;
        justify-content:center;
        align-items:center;
    `

    const [history, setHistory] = useState<History[]>([{
        value: Array(squaresNum * squaresNum).fill(null),
        position: {
            row: null,
            col: null,
        },
    }]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];


    function handlePlay(nextSquares: Value[], position: Position) {
        const nextHistory = [...history.slice(0, currentMove + 1), { value: nextSquares, position: position }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jampTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    const move = useMemo(() => history.map((u, i) => {
        const { row, col } = u.position || {}
        let description;
        if (i > 0) {
            description = "Go to move #" + i + " 座標" + row + "-" + col;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={i}>
                <button onClick={() => jampTo(i)}>{description}</button>
            </li>
        );
    }), [history, jampTo]);

    return (
        <GameBoard>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares.value} onPlay={handlePlay} squaresNum={squaresNum} />
            </div>
            <div className="game-info">
                <ol>{move}</ol>
            </div>
        </GameBoard>
    );
}