import React, { useEffect, useState } from 'react';
import { AuthContext } from './AtuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loaging, setLoading] = useState(true);
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinuser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const SignInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = profile => {
    return updateProfile(auth.currentUser, profile);
  };
  useEffect(() => {
    const unSubscribs = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribs();
    };
  }, []);
  const authinfo = {
    user,
    loaging,
    registerUser,
    signinuser,
    SignInGoogle,
    logOut,
    updateUserProfile,
  };

  return <AuthContext value={authinfo}>{children}</AuthContext>;
};

export default AuthProvider;
