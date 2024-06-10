import React, { useState } from 'react';
import LoginService from '../services/login.service';
import { enqueueSnackbar } from 'notistack';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    enqueueSnackbar('Logging in...', { variant: 'info' });

    LoginService.login(email, password)
      .then(response => {
        console.log(response.data);

        const role_name = response.data.user.roles[0].name;
        localStorage.setItem("role_name", role_name);
        
        enqueueSnackbar('Logged in successfully!', { variant: 'success' });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLogin();
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar(e.response.data.message, { variant: 'error' });
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5" style={{ backgroundColor: '#f0f0f0', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div className="card-body">
              <h2 className="card-title text-center">Blink-id Admin Panel</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    required
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
