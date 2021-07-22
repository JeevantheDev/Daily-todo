/* eslint-disable array-callback-return */
import React, { createContext, useReducer, useEffect, useState } from 'react';
import AppReducer from './AppReducer';
import { auth } from '../config/firebase';
import { getAllTodos } from '../services/todo/todo.service';

// Initial state
export const initialState = {
  user: {
    userID: null,
    name: null,
    email: null,
    avatar: null,
    isAuthenticated: false,
  },
  authError: null,
  todoError: null,
  currentTodoBoards: [],
};

// { boardID: null, date: null, todos: [] }
// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(function (authUser) {
      setLoadingUser(true);
      authUser
        ? userAuthenticated({
            userID: authUser.uid,
            name: authUser.displayName,
            email: authUser.email,
            avatar: authUser.photoURL,
          })
        : setLoadingUser(false);
    });
  }, []);

  const userAuthenticated = (authUser) => {
    dispatch({
      type: 'USER_SIGNIN',
      payload: authUser,
    });
    getAllTodos(authUser.userID)
      .then((data) => {
        if (typeof data === 'string') {
          dispatch({
            type: 'NO_TODO_FOUND',
            payload: data,
          });
        } else {
          dispatch({
            type: 'GET_TODO_BOARDS',
            payload: data,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: 'GET_TODO_BOARD_ERROR',
          payload: err,
        });
      });
    setLoadingUser(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        loadingUser,
        user: state.user,
        authError: state.authError,
        todoError: state.todoError,
        currentTodoBoards: state.currentTodoBoards,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
