/* eslint-disable no-self-compare */
export const isActiveBoard = (date) => {
    if (typeof date === 'string') {
        if (new Date(date).getDate() === new Date().getDate()) {
            return true;
        } else {
            return false;
        }
    } else {
        if (
            date &&
            new Date(date.toDate()).getDate() === new Date().getDate()
        ) {
            return true;
        } else {
            return false;
        }
    }
};

export const boardType = (date) => {
    if (typeof date === 'string') {
        if (new Date(date).getDate() === new Date().getDate()) {
            return 'current-todo-board';
        } else if (new Date(date).getDate() > new Date().getDate()) {
            return 'next-todo-board';
        } else {
            return 'prev-todo-board';
        }
    } else {
        if (new Date(date.toDate()).getDate() === new Date().getDate()) {
            return 'current-todo-board';
        } else if (new Date(date.toDate()).getDate() > new Date().getDate()) {
            return 'next-todo-board';
        } else {
            return 'prev-todo-board';
        }
    }
};
export const btnTypeColor = (date) => {
    if (typeof date === 'string') {
        if (new Date(date).getDate() === new Date().getDate()) {
            return 'current-todo-btn-color';
        } else if (new Date(date).getDate() > new Date().getDate()) {
            return 'next-todo-btn-color';
        } else {
            return 'prev-todo-btn-color';
        }
    } else {
        if (new Date(date.toDate()).getDate() === new Date().getDate()) {
            return 'current-todo-btn-color';
        } else if (new Date(date.toDate()).getDate() > new Date().getDate()) {
            return 'next-todo-btn-color';
        } else {
            return 'prev-todo-btn-color';
        }
    }
};
