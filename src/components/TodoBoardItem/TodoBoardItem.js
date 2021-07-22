import React, { useState, useEffect, useRef, useContext } from 'react';
import moment from 'moment';
import './TodoBoardItem.scss';
import { deleteTodoBoard } from '../../services/todo/todo.service';
import {
  isActiveBoard,
  boardType,
  btnTypeColor,
} from '../../helpers/helper.date.format';
import { GlobalContext } from '../../context/Context';
import TodoList from '../TodoList/TodoList';

const TodoBoardItem = React.memo((props) => {
  const { dispatch } = useContext(GlobalContext);
  const { boardList } = props;
  const activeBoard = useRef(null);
  const notActiveBoard = useRef(null);
  const [todoBoards, setTodoBoards] = useState(boardList);

  useEffect(() => {
    setTodoBoards(boardList);
  }, [boardList]);

  useEffect(() => {
    if (activeBoard.current !== null) {
      activeBoard.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [todoBoards, activeBoard]);

  const deleteBoard = (id) => {
    deleteTodoBoard(id).then(() => {
      dispatch({
        type: 'DELETE_TODO_BOARD',
        payload: { id: id },
      });
    });
  };

  return (
    <>
      {todoBoards.length > 0 &&
        todoBoards.map((board, index) => {
          return (
            <div
              ref={isActiveBoard(board.date) ? activeBoard : notActiveBoard}
              id={`${moment(
                typeof board.date === 'string'
                  ? board.date
                  : board.date.toDate()
              ).format('LL')}`}
              key={board.boardID}
              className="todo-baord-item-main"
            >
              <div className="todo-board-container">
                <div
                  className={`todo-board-container-header ${boardType(
                    board.date
                  )}`}
                >
                  <p className="mr-auto header-text">
                    {moment(
                      typeof board.date === 'string'
                        ? board.date
                        : board.date.toDate()
                    ).format('ll')}
                  </p>
                  <p
                    className="cursor-pointer ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBoard(board.boardID);
                    }}
                  >
                    <i class="far fa-times-circle fa-2x"></i>
                  </p>
                </div>
                <div className="todo-board-container-todo-lists">
                  <TodoList
                    board={board}
                    todos={board.todos}
                    currentColor={btnTypeColor(board.date)}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
});

export default TodoBoardItem;
