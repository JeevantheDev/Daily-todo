/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
    switch (action.type) {
        case 'USER_SIGNIN':
            return {
                ...state,
                user: {
                    userID: action.payload.userID,
                    name: action.payload.name,
                    email: action.payload.email,
                    avatar: action.payload.avatar,
                    isAuthenticated: true,
                },
                authError: null,
            };
        case 'USER_SIGNOUT':
            return {
                ...state,
                user: {
                    userID: null,
                    namename: null,
                    email: null,
                    avatar: null,
                    isAuthenticated: false,
                },
                currentTodoBoards: [],
                authError: null,
                todoError: null,
            };
        case 'USER_SIGNIN_ERROR':
            return {
                ...state,
                user: {
                    userID: null,
                    namename: null,
                    email: null,
                    avatar: null,
                    isAuthenticated: false,
                },
                authError: action.payload.error,
            };
        case 'GET_TODO_BOARDS':
            return {
                ...state,
                currentTodoBoards: action.payload,
                todoError: null,
            };
        case 'CREATE_TODO_BOARD':
            return {
                ...state,
                currentTodoBoards:action.payload,
                todoError: null,
            };
        case 'DELETE_TODO_BOARD':
            return {
                ...state,
                currentTodoBoards: state.currentTodoBoards.filter(
                    (board) => board.boardID !== action.payload.id
                ),
                todoError:
                    state.currentTodoBoards.length === action.payload.length
                        ? 'No Boards Found'
                        : null,
            };
        case 'ADD_TODO':
            return {
                ...state,
                currentTodoBoards: [...state.currentTodoBoards, action.payload],
                todoError: null,
            };
        case 'GET_TODO_BOARD_ERROR':
        case 'CREATE_TODO_BOARD_ERROR':
        case 'CREATE_TODO_ERROR':
        case 'NO_TODO_FOUND':
            return {
                ...state,
                currentTodoBoards: [],
                todoError: action.payload,
            };
        default:
            return state;
    }
};
