import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getMyResume } from '../services/api';
import { SAMPLE_RESUME_DATA } from '../utils/sampleData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt_token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_profile');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [currentResume, setCurrentResume] = useState(SAMPLE_RESUME_DATA);
  const [loadingResume, setLoadingResume] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUserResume();
    }
  }, [token]);

  const fetchUserResume = async () => {
    setLoadingResume(true);
    try {
      const data = await getMyResume();
      if (data && data.resume) {
        setCurrentResume(data.resume);
      } else {
        setCurrentResume(SAMPLE_RESUME_DATA);
      }
    } catch (error) {
      console.warn('Failed to fetch resume, using sample resume:', error);
      setCurrentResume(SAMPLE_RESUME_DATA);
    } finally {
      setLoadingResume(false);
    }
  };

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    if (res && res.access_token) {
      localStorage.setItem('jwt_token', res.access_token);
      localStorage.setItem('user_profile', JSON.stringify(res.user));
      setToken(res.access_token);
      setUser(res.user);
      await fetchUserResume();
      return res;
    }
    throw new Error('Invalid login response');
  };

  const register = async (name, email, password) => {
    const res = await registerUser({ name, email, password });
    if (res && res.access_token) {
      localStorage.setItem('jwt_token', res.access_token);
      localStorage.setItem('user_profile', JSON.stringify(res.user));
      setToken(res.access_token);
      setUser(res.user);
      await fetchUserResume();
      return res;
    }
    throw new Error('Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_profile');
    setToken(null);
    setUser(null);
    setCurrentResume(SAMPLE_RESUME_DATA);
  };

  const updateResume = (newResumeData) => {
    setCurrentResume(newResumeData);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        currentResume,
        updateResume,
        fetchUserResume,
        loadingResume,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
