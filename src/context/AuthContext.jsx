import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if(user) {
        const userDocRef = doc(db, 'users', user.uid);
        // Listens to firestore to update profile without having to refresh page
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          if(doc.exists()) {
            const userData = doc.data();
            setCurrentUser((prevUser) => ({ ...prevUser, ...userData }));
          } else {
            console.log('No updates to display')
          }
        }, (error) => {
          console.error(error);
        });
        // Unsubscribe from listener when component unmounts
        return () => unsubscribe();
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};