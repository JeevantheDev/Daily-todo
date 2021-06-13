/* eslint-disable react-hooks/rules-of-hooks */
import firebase from 'firebase/app';
import { auth, db } from '../../config/firebase';

export const googleAuth = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await auth
        .signInWithPopup(provider)
        .then((resp) => {
            db.collection('users').doc(resp.user.uid).set({
                name: resp.user.displayName,
                email: resp.user.email,
                avatar: resp.user.photoURL,
            });
            return;
        })
        .catch((err) => {
            const errors = err.message;

            if (errors) {
                console.log(errors);
            }
            return errors;
        });
};

export const signOut = async () => {
    await auth
        .signOut()
        .then(() => {
            return;
        })
        .catch((err) => {
            return err.message;
        });
};
