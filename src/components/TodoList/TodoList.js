import React, { useState, useContext } from 'react';
import './TodoList.scss';
import { GlobalContext } from '../../context/Context';
import { updateTodoBoard } from '../../services/todo/todo.service';
import { v4 as uuidv4 } from 'uuid';

const TodoList = (props) => {
    const { currentColor, todos, board } = props;
    const { dispatch, user } = useContext(GlobalContext);

    const [editState, setEditState] = useState(false);
    const [currentTodoIndex, setCurrentIndex] = useState(null);
    const [todo_name, setTodoName] = useState('');
    const [todo_checked] = useState(false);
    const [loading, setloading] = useState(false);

    const addOrUpdateTodo = (todoId, tobeDelete) => {
        const todoObj = {
            id: todoId === '' ? uuidv4() : todoId,
            isChecked: todo_checked,
            name: todo_name,
            createAt: new Date(),
        };
        let foundIndex = board.todos.findIndex(
            (todo) => todo.id === todoObj.id
        );
        if (foundIndex === -1) {
            board.todos.push(todoObj);
        } else {
            if (tobeDelete) {
                console.log('step here 1');
                board.todos.splice(foundIndex, 1);
            } else if (editState && todoId !== '' && todo_name !== '') {
                console.log('step here 2');
                board.todos[foundIndex] = todoObj;
            } else {
                alert('Please fill the field');
            }
        }
        setloading(true);
        updateTodoBoard(board, board.boardID, user.userID)
            .then((res) => {
                dispatch({
                    type: 'GET_TODO_BOARDS',
                    payload: res,
                });
                setloading(false);
            })
            .catch((err) => {
                dispatch({
                    type: 'GET_TODO_BOARD_ERROR',
                    payload: err,
                });
                setloading(false);
            });
        setTodoName('');
        setEditState(false);
        setCurrentIndex(null);
    };

    const checkTodo = ({ name, isChecked, ...values }, index) => {
        const todos = board.todos.map((todo) =>
            todo.name === name
                ? { name, ...values, isChecked: !isChecked }
                : todo
        );

        if (index !== -1) {
            board.todos[index] = todos[index];
        }
        setloading(true);
        updateTodoBoard(board, board.boardID, user.userID)
            .then((res) => {
                dispatch({
                    type: 'GET_TODO_BOARDS',
                    payload: res,
                });
                setloading(false);
            })
            .catch((err) => {
                dispatch({
                    type: 'GET_TODO_BOARD_ERROR',
                    payload: err,
                });
            });
    };

    return (
        <div className="todo-box">
            {todos.map((todo, index) => {
                return (
                    <div key={todo.todoID} className="input-container">
                        {todo.name !== '' && (
                            <input
                                checked={todo.isChecked}
                                type="checkbox"
                                onChange={(e) => {
                                    e.stopPropagation();
                                    checkTodo(todo, index);
                                }}
                                name="check"
                                id="check"
                            />
                        )}
                        <input
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(index);
                                setTodoName(todo.name);
                                setEditState(true);
                            }}
                            value={
                                todo.name !== '' && !editState
                                    ? todo.name
                                    : index === currentTodoIndex
                                    ? todo_name
                                    : todo.name
                            }
                            onChange={(e) => {
                                setTodoName(e.target.value);
                            }}
                            className={todo.isChecked ? `strike-through` : ''}
                            type="text"
                            placeholder="enter your todo"
                            name="todo"
                        />
                        {todo.name !== '' && index !== currentTodoIndex ? (
                            <i
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addOrUpdateTodo(todo.id, true);
                                }}
                                class="fas fa-trash-alt"
                            ></i>
                        ) : (
                            <>
                                {index === currentTodoIndex && (
                                    <i
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addOrUpdateTodo(todo.id, false);
                                        }}
                                        class="fas fa-check-circle"
                                    ></i>
                                )}
                                {index !== currentTodoIndex && (
                                    <i
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addOrUpdateTodo(todo.id, true);
                                        }}
                                        class="fas fa-ban"
                                    ></i>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
            {todos.length >= 0 && (
                <i
                    onClick={(e) => {
                        e.stopPropagation();
                        todo_name === ''
                            ? addOrUpdateTodo('', false)
                            : alert('Can not create todo !!');
                    }}
                    class={
                        !loading
                            ? `fas fa-plus-circle fa-3x ${currentColor}`
                            : `fas fa-spinner fa-pulse fa-3x ${currentColor}`
                    }
                ></i>
            )}
        </div>
    );
};

export default TodoList;
