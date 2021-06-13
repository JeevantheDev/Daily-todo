import React, { useContext } from 'react';
import './Header.scss';
import { GlobalContext } from '../../context/Context';
import AddBoard from '../AddBoard/AddBoard';
import { signOut } from '../../services/auth/auth.service';

export default function Header() {
    const { user, dispatch } = useContext(GlobalContext);
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
                        <button className="btn-filter">
                            <i className="fas fa-filter fa-2x"></i>
                        </button>
                    )}
                    <h1>Daily-Todos</h1>
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
