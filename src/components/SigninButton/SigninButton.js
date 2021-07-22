import React, { useContext } from 'react';
import './SigninButton.scss';
import { GlobalContext } from '../../context/Context';
import { googleAuth } from '../../services/auth/auth.service';

export default function SigninButton() {
  const { user, loadingUser, dispatch } = useContext(GlobalContext);

  const handleGoogleSignin = (e) => {
    e.stopPropagation();
    googleAuth().catch((err) => {
      dispatch({
        type: 'USER_SIGNIN_ERROR',
        payload: err,
      });
    });
  };
  return (
    <>
      {loadingUser && <p>Loading...</p>}
      {!loadingUser && user.email === null && !user.isAuthenticated && (
        <div className="signin-container">
          <button onClick={handleGoogleSignin} className="btn-signin">
            Signin Google
          </button>
        </div>
      )}
    </>
  );
}
