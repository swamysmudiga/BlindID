import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';
//import RoleService from '../../services/role.service'; 
import { enqueueSnackbar } from 'notistack';

const Users = () => {
  const [users, setUsers] = useState([]);
   
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '', // Added password field
    roles: [], // Roles are stored as an array
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle form display
  const [selectedRoles, setSelectedRoles] = useState([]); // State to track selected roles
  //const [roles, setRoles] = useState([]); // State to store fetched roles
  const [userinfo, setUserinfo] = useState([]); // State to store fetched roles
  const [searchString, setSearchString] = useState(''); // State to store search string
 

  useEffect(() => {
    fetchUsers();
   // fetchRoles();
    
  }, []);

   
 
  const handleSearch = e => {
    const { value } = e.target; // Destructure the value directly from the event
    setSearchString(value); // Update the search string state
  };

  // Filter users based on the search string
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchString.toLowerCase()) ||
    user.email.toLowerCase().includes(searchString.toLowerCase())
  );
  const fetchUsers = async () => {

    UserService.getAll()
      .then(response => {
        setUsers(response.data);
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar('Failed to fetch users.', { variant: 'error' });
      });

  }

  // const fetchRoles = async () => {

  //   RoleService.getAll()
  //     .then(response => {
  //       setRoles(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       enqueueSnackbar('Failed to fetch roles.', { variant: 'error' });
  //     });
  // };

  // const addUser = async (userData, token) => {
  //   console.log(formData)
  //   UserService.create(userData)

  //     .then(response => {
  //       console.log(response.data);
  //       enqueueSnackbar('User added successfully.', { variant: 'success' });
  //       fetchUsers();
  //     })
  //     .catch(e => {
        
  //       console.log(e);
  //       enqueueSnackbar( e.response.data.message, { variant: 'error' });
  //     });
  // };


  const updateUser = async (userId, userData, token) => {

    UserService.update(userId, userData)

      .then(response => {
        console.log(response.data);
        enqueueSnackbar('User updated successfully.', { variant: 'success' });
        fetchUsers();
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar('Failed to update user.', { variant: 'error' });
      });
  };



  // const deleteUser = async (userId, token) => {

  //   UserService.delete(userId)
  //     .then(response => {
  //       console.log(response.data);
  //       enqueueSnackbar('User deleted successfully.', { variant: 'success' });
  //       fetchUsers();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       enqueueSnackbar('Failed to delete user.', { variant: 'error' });
  //     }
  //     );
  // };



  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleCheckboxChange = e => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setSelectedRoles(prevRoles => [...prevRoles, value]); // Add role to selectedRoles array
  //   } else {
  //     setSelectedRoles(prevRoles => prevRoles.filter(role => role !== value)); // Remove role from selectedRoles array
  //   }
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    if (selectedRoles.length === 0) {
      enqueueSnackbar('Please select at least one role.', { variant: 'error' });
      return;
    }
    try {
      const token = localStorage.getItem('token');
      //const rolesPayload = roles.filter(role => selectedRoles.includes(role.name)).map(role => ({ id: role.id, name: role.name }));
      // const userData = {
      //   username: formData.username,
      //   email: formData.email,
      //   password: formData.password,
      //   departmentId:formData.departmentId,
      //   profileImageUrl: '',
      //   roles: rolesPayload
      // };
      if (isEditMode) {
        userinfo.password = formData.password;
        await updateUser(selectedUserId, userinfo, token);
      }  
      fetchUsers();
      setFormData({
        username: '',
        email: '',
        password: '',
        roles: [],
      });
      setIsEditMode(false);
      setSelectedUserId(null);
      setShowForm(false);
      setSelectedRoles([]);
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Failed to submit form.', { variant: 'error' });
    }
  };


  const handleEdit = user => {
    setFormData({
      username: user.username,
      email: user.email,
      password:  user.password, // Clear password field when editing
      roles: user.roles.map(role => role.name), // Set the roles array based on the user's roles
    });
    setUserinfo(user);
    setIsEditMode(true);
    setSelectedUserId(user.id);
    setShowForm(true);
    setSelectedRoles(user.roles.map(role => role.name)); // Set selected roles for editing
  };

  // const handleDelete = async userId => {
  //   const token = localStorage.getItem('token');
  //   await deleteUser(userId, token);
  //   fetchUsers();
  // };


  return (
    <div>
      <h2>User password reset</h2>
  
      {!showForm && (
  <>
    <input
      type='text'
      placeholder="Search users"
      className='float-right mr-2'
      onChange={handleSearch} // Remove parentheses here
    />
  </>
)}

      
                <br />
      {showForm ? (
        <div><br />
               
                          <form onSubmit={handleSubmit}>

          

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="username">Username: &nbsp;</label><b>{formData.username}</b>
                  
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email: &nbsp;</label>{formData.email}
                  
                </div>
              </div>
            </div>
          
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="password">New Password: </label>
                  <input required
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
           
            <button type="submit" className="btn btn-primary">Update Password</button>
          </form>
        </div>
      ) : (
        <div className="crud_display table-responsive">
          {/* <button className="btn btn-primary mb-2 float-right" onClick={() => setShowForm(true)}>Add New</button> */}
          <table className="table table-striped">
            <thead>
              <tr>
            
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Roles</th>
               
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredUsers.length === 0 && ( <tr><td colspan="5" align="center">No user results found</td></tr>)} 
              {filteredUsers.map(user => (
                <tr key={user.id}>
                
              
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.roles ? user.roles.map(role => role.name).join(', ') : ''}</td>
                  
                  <td>
                  <button className="btn btn-primary mr-2  " onClick={() => handleEdit(user)}>Reset Password</button>
                    {/* <button className="btn btn-light" onClick={() => handleDelete(user.id)}>Delete</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
