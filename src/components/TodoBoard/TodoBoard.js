/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { GlobalContext } from '../../context/Context';
import './TodoBoard.scss';
import TodoBoardItem from '../TodoBoardItem/TodoBoardItem';

const TodoBoard = React.memo(() => {
    const { currentTodoBoards, todoError } = useContext(GlobalContext);
    return (
        <div className="todo-board">
            {todoError && (
                <div className="center">
                    <p>{todoError}</p>
                </div>
            )}
            <TodoBoardItem boardList={currentTodoBoards} />
        </div>
    );
});

export default TodoBoard;
