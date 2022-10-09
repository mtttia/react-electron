import React from 'react';
import './App.css';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';

function App() {
  let location = useLocation().pathname

  return (
    <div>
      <Outlet />
    </div>
  );
}
export default App
