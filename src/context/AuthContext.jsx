import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthContextProvider({ authService, children }) {
  const [user, setUser] = useState();
  const logout = () => {
    authService.logout();
  };
  const login = (providerName) => {
    authService.login(providerName);
  };
  useEffect(() => {
    authService.onAuthChange((user) => setUser(user));
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
