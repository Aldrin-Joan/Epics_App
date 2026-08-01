import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../api/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          const tokenVal = await firebaseUser.getIdToken();
          setToken(tokenVal);
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            const fullName = data.full_name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';
            const profile = {
              id: firebaseUser.uid,
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...data,
              full_name: fullName,
            };
            setUser(profile);
            // Sync back if full_name was missing
            if (!data.full_name) {
              await setDoc(userRef, { full_name: fullName }, { merge: true }).catch(() => {});
            }
          } else {
            // Auto-provision user document for third-party auth (Google)
            const autoProfile = {
              full_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              username: firebaseUser.email?.split('@')[0] + '_' + Math.random().toString(36).substr(2, 4),
              email: firebaseUser.email,
              is_lawyer: false,
              is_active: true,
              created_at: new Date().toISOString(),
            };
            await setDoc(userRef, autoProfile);
            setUser({
              id: firebaseUser.uid,
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...autoProfile,
            });
          }
        } catch (err) {
          console.error("Error restoring user session:", err);
          const fallbackName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';
          setUser({
            id: firebaseUser.uid,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            full_name: fallbackName,
            username: firebaseUser.email?.split('@')[0] || 'user',
            is_lawyer: false,
          });
        }
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const tokenVal = await cred.user.getIdToken();
    setToken(tokenVal);
    const userRef = doc(db, 'users', cred.user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      const fullName = data.full_name || cred.user.displayName || cred.user.email?.split('@')[0] || 'User';
      const fullProfile = {
        id: cred.user.uid,
        uid: cred.user.uid,
        email: cred.user.email,
        ...data,
        full_name: fullName,
      };
      setUser(fullProfile);
      return fullProfile;
    } else {
      const basicName = cred.user.displayName || cred.user.email?.split('@')[0] || 'User';
      const basicProfile = {
        id: cred.user.uid,
        uid: cred.user.uid,
        email: cred.user.email,
        full_name: basicName,
        username: cred.user.email?.split('@')[0] || 'user',
        is_lawyer: false,
        is_active: true,
        created_at: new Date().toISOString(),
      };
      await setDoc(userRef, basicProfile).catch(() => {});
      setUser(basicProfile);
      return basicProfile;
    }
  }, []);

  const updateUserProfile = useCallback(async (updatedFields) => {
    if (!user?.uid) return;
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, updatedFields);
    setUser((prev) => ({ ...prev, ...updatedFields }));
  }, [user]);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setToken(null);
  }, []);

  const isAuthenticated = !!user;
  const isLawyer = user?.is_lawyer === true;
  const isVerified = user?.is_active === true;
  const isPendingVerification =
    isLawyer && user?.verification_status?.includes('pending');

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      updateUserProfile,
      isAuthenticated,
      isLawyer,
      isVerified,
      isPendingVerification,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
