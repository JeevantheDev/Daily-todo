/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import './Header.scss';
import { GlobalContext } from '../../context/Context';
import AddBoard from '../AddBoard/AddBoard';
import { signOut } from '../../services/auth/auth.service';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getTodoBoardByDate } from '../../services/filter/filter.service';

export default function Header() {
  const { user, dispatch } = useContext(GlobalContext);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    handleFilter();
  }, [startDate, endDate]);

  const handleFilter = () => {
    getTodoBoardByDate(user.userID, {
      start: startDate,
      end: endDate,
    })
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
  };

  const handleSignout = (e) => {
    e.preventDefault();
    signOut()
      .then(() => {
        dispatch({
          type: 'USER_SIGNOUT',
        });
      })
      .catch((err) => {
        dispatch({
          type: 'USER_SIGNIN_ERROR',
          payload: err,
        });
      });
  };
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-container-title">
          {user.isAuthenticated && (
            <div className="filter">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDatePicker(!showDatePicker);
                }}
                className="btn-filter"
              >
                <i className="fas fa-filter fa-2x"></i>
              </button>
              {showDatePicker && (
                <div
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    placeholderText="Select your date range"
                    withPortal
                    isClearable
                  />
                </div>
              )}
            </div>
          )}
          <h1 className="header-title">Daily-Todos</h1>
        </div>
        {user.isAuthenticated && (
          <div className="header-container-profile">
            <img
              className="avatar"
              src={user.avatar}
              alt="avatar"
              width="50"
              height="50"
            />
            <button onClick={handleSignout} className="btn-signout">
              <i className="fas fa-sign-out-alt fa-2x"></i>
            </button>
          </div>
        )}
      </div>
      <AddBoard />
    </div>
  );
}
