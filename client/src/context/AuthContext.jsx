import { createContext, useEffect, useMemo, useState } from 'react';
import { AUTH_STORAGE_KEY } from '../utils/constants';
import { registerRequest, loginRequest, getMeRequest } from '../services/authService';

export const AuthContext = createContext(null);

const readStoredAuth = () => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return { token: null, user: null };
  try {
    return JSON.parse(raw);
  } catch {
    return { token: null, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [{ token, user }, setAuth] = useState(readStoredAuth);
  const [isLoading, setIsLoading] = useState(true);

  const persist = (nextToken, nextUser) => {
    if (nextToken && nextUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token: nextToken, user: nextUser }));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setAuth({ token: nextToken, user: nextUser });
  };

  // On first load, if a token exists, confirm it's still valid and refresh user info
  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const freshUser = await getMeRequest();
        persist(token, freshUser);
      } catch {
        persist(null, null);
      } finally {
        setIsLoading(false);
      }
    };
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = async ({ name, email, password, role }) => {
    const data = await registerRequest({ name, email, password, role });
    persist(data.token, data.user);
    return data.user;
  };

  const login = async ({ email, password }) => {
    const data = await loginRequest({ email, password });
    persist(data.token, data.user);
    return data.user;
  };

  const logout = () => {
    persist(null, null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isOrganizer: user?.role === 'organizer',
      isLoading,
      register,
      login,
      logout,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
