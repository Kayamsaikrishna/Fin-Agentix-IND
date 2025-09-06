
import React from 'react';
import Register from './Register';
import Login from './Login';
import Kyc from './Kyc';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Lending App</h1>
      <Register />
      <Login />
      <Kyc />
    </div>
  );
};

export default Home;
