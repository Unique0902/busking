import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserDataContext } from '../context/UserDataContext';

export default function UserDataProtectedRoute({ children }) {
  const { userData } = useUserDataContext();
  if (!userData) {
    return <Navigate to={'/busking/makeUser/'} replace />;
  }
  return children;
}
