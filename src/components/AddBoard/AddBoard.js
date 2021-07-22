import React, { useContext, useState } from 'react';
import './AddBoard.scss';
import { addTodoBoard } from '../../services/todo/todo.service';
import { GlobalContext } from '../../context/Context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddBoard() {
  const { user, dispatch, loadingUser } = useContext(GlobalContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());

  const openDatePicker = (e) => {
    e.preventDefault();
    setShowDatePicker(!showDatePicker);
  };

  const createBoard = async (e) => {
    e.preventDefault();
    setLoadingCreate(true);
    await addTodoBoard(user.userID, selectDate)
      .then((res) => {
        dispatch({
          type: 'CREATE_TODO_BOARD',
          payload: res,
        });
        setShowDatePicker(false);
        setLoadingCreate(false);
      })
      .catch((err) => {
        dispatch({
          type: 'CREATE_TODO_BOARD_ERROR',
          payload: err,
        });
      });
  };

  return (
    <>
      <div className="btn-container">
        {!loadingUser && user.email !== null && user.isAuthenticated && (
          <button onClick={openDatePicker} className="btn-board">
            {showDatePicker ? 'x' : '+ Board'}
          </button>
        )}
        {showDatePicker && (
          <button onClick={createBoard} className="btn-create">
            {loadingCreate ? 'Adding...' : '+'}
          </button>
        )}
      </div>
      {showDatePicker && (
        <div style={{ zIndex: '10' }}>
          <DatePicker
            selected={selectDate}
            onChange={(date) => setSelectDate(date)}
            withPortal
            placeholderText="Choose Date"
            minDate={new Date()}
            showDisabledMonthNavigation
          />
        </div>
      )}
    </>
  );
}
