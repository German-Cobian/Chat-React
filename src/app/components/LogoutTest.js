import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/auth';

const LogoutTest = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <h1>Test Page</h1>
      <button className="" type="button" onClick={logout}>Logout</button>
    </>
  );
};

export default LogoutTest;