import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';

const UserDataContext = createContext();

export function UserDataContextProvider({ userRepository, children }) {
  const [userData, setUserData] = useState(null);
  const { user, uid } = useAuthContext();
  useEffect(() => {
    if (!uid) {
      return;
    }
    userRepository.syncUserData(uid, (data) => {
      data && setUserData(data);
    });
  }, [uid]);
  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  return useContext(UserDataContext);
}
