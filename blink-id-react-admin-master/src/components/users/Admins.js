import React, { useState, useEffect } from 'react';
import adminservice from '../../services/user.service';
import { enqueueSnackbar } from 'notistack';

const Admins = () => {
  const [users, setUsers] = useState([]);
  const [rolesPayload] = useState
  ([{ "id": 3,
      "name": "ROLE_ADMIN"
      }]
   );
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle form display

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    adminservice.getAllAdmins()
      .then(response => {
        setUsers(response.data);
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar('Failed to fetch admin.', { variant: 'error' });
      });
  }

  const addUser = async (userData, token) => {
    adminservice.create(userData)
      .then(response => {
        console.log(response.data);
        enqueueSnackbar('Admin added successfully.', { variant: 'success' });
        fetchUsers();
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar(e.response.data.message, { variant: 'error' });
      });
  };

  const updateUser = async (userId, userData, token) => {
    adminservice.update(userId, userData)
      .then(response => {
        console.log(response.data);
        enqueueSnackbar('Admin updated successfully.', { variant: 'success' });
        fetchUsers();
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar('Failed to update Admin.', { variant: 'error' });
      });
  };

  const deleteUser = async (userId, token) => {
    adminservice.delete(userId)
      .then(response => {
        console.log(response.data);
        enqueueSnackbar('Admin deleted successfully.', { variant: 'success' });
        fetchUsers();
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar('Failed to delete Admin.', { variant: 'error' });
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Validation checks
    try {
      const token = localStorage.getItem('token');
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        roles: rolesPayload
        
      };
      if (isEditMode) {
        await updateUser(selectedUserId, userData, token);
      } else {
        await addUser(userData, token);
      }
      fetchUsers();
      setFormData({
        username: '',
        email: '',
        password: '',
      });
      setIsEditMode(false);
      setSelectedUserId(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Failed to submit form.', { variant: 'error' });
    }
  };

  const handleEdit = user => {
    setFormData({
      username: user.username,
      email: user.email,
      password: user.password,
      roles: rolesPayload
    });
    setIsEditMode(true);
    setSelectedUserId(user.id);
    setShowForm(true);
  };

  const handleDelete = async userId => {
    const token = localStorage.getItem('token');
    await deleteUser(userId, token);
    fetchUsers();
  };

  return (
    <div>
      <h2>Admins</h2>
      {showForm ? (
        <div>
          <h3>{isEditMode ? 'Update Admin' : 'Add Admin'}</h3>
          <form onSubmit={handleSubmit}>
             
              <div className="row col-md-4">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="row col-md-4">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              {!isEditMode && (
                <div className="row col-md-4">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              )}
             
            <button type="submit" className="btn btn-primary mt-3">{isEditMode ? 'Update Admin' : 'Add Admin'}</button>
          </form>
        </div>
      ) : (
        <div className="admin-cards">
          <button onClick={() => setShowForm(true)} className="btn btn-primary mb-3 float-right">Add New</button><br />
          <div className="mt-10">&nbsp;        </div>
          <div className="row">
            {users.map(user => (
              <div key={user.id} className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{user.username}</h5>
                    <p className="card-text">Email: {user.email}</p>
                    <p className="card-text">Password: {user.password}</p>
                    
                    <div className="admin-actions">
                      <button onClick={() => handleEdit(user)} className="btn btn-primary mr-2">Edit</button>
                      <button onClick={() => handleDelete(user.id)} className="btn btn-light">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admins;
