import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp,
  collection,
  getDocs,
  limit,
  query
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../firebase';

const AuthContext = createContext(null);

// Designated Super Admin Email(s) for bootstrapping
const SUPER_ADMIN_EMAILS = [
  'iharshedt@gmail.com'
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthError(null);

      if (firebaseUser) {
        setUser(firebaseUser);

        // Firestore sync for user document
        if (db) {
          const userDocRef = doc(db, 'users', firebaseUser.uid);

          try {
            const userSnap = await getDoc(userDocRef);

            if (!userSnap.exists()) {
              // Determine if this user is a super admin or first user in the database
              const isSuperAdminEmail = firebaseUser.email && SUPER_ADMIN_EMAILS.includes(firebaseUser.email.toLowerCase());
              
              let isFirstUser = false;
              try {
                const usersCountSnap = await getDocs(query(collection(db, 'users'), limit(1)));
                isFirstUser = usersCountSnap.empty;
              } catch (e) {
                console.warn('Could not query users collection size:', e);
              }

              const initialRole = (isSuperAdminEmail || isFirstUser) ? 'admin' : 'pending';
              const initialStatus = initialRole === 'admin' ? 'active' : 'pending_approval';

              const newUserData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                displayName: firebaseUser.displayName || 'Smart Way Member',
                photoURL: firebaseUser.photoURL || '',
                role: initialRole,
                status: initialStatus,
                createdAt: serverTimestamp(),
                lastLoginAt: serverTimestamp()
              };

              await setDoc(userDocRef, newUserData);
              setUserProfile(newUserData);
            } else {
              // Update last login timestamp
              await updateDoc(userDocRef, {
                lastLoginAt: serverTimestamp(),
                photoURL: firebaseUser.photoURL || '',
                displayName: firebaseUser.displayName || userSnap.data().displayName
              }).catch(() => {});
            }

            // Real-time listener for role updates made by Admin in Team Portal
            if (unsubscribeSnapshot) unsubscribeSnapshot();
            unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
              if (docSnap.exists()) {
                const data = docSnap.data();
                setUserProfile(data);
              }
            }, (err) => {
              console.warn('Error listening to user profile changes:', err);
            });

          } catch (err) {
            console.error('Error fetching/creating user profile:', err);
            // Fallback local profile if offline
            setUserProfile({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'Smart Way Member',
              photoURL: firebaseUser.photoURL || '',
              role: (firebaseUser.email && SUPER_ADMIN_EMAILS.includes(firebaseUser.email.toLowerCase())) ? 'admin' : 'sales',
              status: 'active'
            });
          }
        } else {
          // No Firestore db configured
          setUserProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Smart Way Member',
            photoURL: firebaseUser.photoURL || '',
            role: 'admin',
            status: 'active'
          });
        }
      } else {
        setUser(null);
        setUserProfile(null);
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
          unsubscribeSnapshot = null;
        }
      }

      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized.');
    }
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      let message = 'Failed to sign in with Google. Please try again.';
      if (err.code === 'auth/popup-closed-by-user') {
        message = 'Sign-in cancelled. Popup was closed before completing.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        message = 'Another sign-in window is already open.';
      } else if (err.code === 'auth/popup-blocked') {
        message = 'Popup was blocked by your browser. Please allow popups for this site.';
      } else if (err.code === 'auth/configuration-not-found') {
        message = 'Firebase Authentication is not activated yet. Please open Firebase Console -> Authentication, click "Get Started", and enable the Google Sign-in provider.';
      } else if (err.code === 'auth/operation-not-allowed') {
        message = 'Google Sign-in provider is disabled. Please enable it in Firebase Console -> Authentication -> Sign-in method.';
      } else if (err.code === 'auth/unauthorized-domain') {
        message = 'Current domain is not authorized. Add "localhost" in Firebase Console -> Authentication -> Settings -> Authorized domains.';
      } else if (err.message) {
        message = err.message;
      }
      setAuthError(message);
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    if (!auth) return;
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error('Sign Out Error:', err);
    }
  };

  // Permissions helpers
  const role = userProfile?.role || 'pending';
  const isAdmin = role === 'admin';
  const isFinance = role === 'finance' || isAdmin;
  const isSales = role === 'sales' || isAdmin;
  const isPending = role === 'pending' || userProfile?.status === 'pending_approval';

  const value = {
    user,
    userProfile,
    role,
    isAdmin,
    isFinance,
    isSales,
    isPending,
    loading,
    authError,
    setAuthError,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
