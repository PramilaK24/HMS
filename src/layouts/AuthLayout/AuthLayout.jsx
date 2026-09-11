import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="authlayout">
      {/* <h2>AuthLayout</h2> */}
      {children || <Outlet />}
    </div>
  );
};

export default AuthLayout;
