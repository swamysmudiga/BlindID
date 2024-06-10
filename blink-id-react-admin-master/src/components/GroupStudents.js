import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GroupService from '../services/group.service'; 
import StudentService from '../services/group_students.service'; 
import { enqueueSnackbar } from 'notistack';

const GroupStudents = () => {
  const { id } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  
  useEffect(() => {
    // Fetch group details using the provided id
    GroupService.get(id)
      .then(details => {
        setGroupDetails(details.data);
        // Extract user IDs from group details
        const userIds = details.data.users.map(user => user.id);
        setAddedUsers(userIds);
      })
      .catch(error => {
        console.error('Error fetching group details:', error);
      });
  }, [id]);

const handleSearchChange = async e => {
  setSearchTerm(e.target.value);
  if (!e.target.value.trim()) {
    setSearchResults([]);
    return;
  }
  // Perform search and update search results
  try {
    const users = await StudentService.getStudents(id);
    const usersInfo = users.data; // Assuming users.data contains the array of users
    const filteredUsers = usersInfo.filter(user =>
      user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

  
  const handleAddUser = async user => {
    try {
      const token = localStorage.getItem('token');
      await StudentService.create({ groupid: id, user }, token); // Pass the user object
      enqueueSnackbar('User added successfully.', { variant: 'success' });
      // Refresh group details after adding user
      GroupService.get(id)
        .then(details => {
          setGroupDetails(details.data);
          setSearchResults([]);
          setSearchTerm('');
          // Update addedUsers state with the newly added user ID
          setAddedUsers(prevUsers => [...prevUsers, user.id]);
        })
        .catch(error => {
          console.error('Error fetching group details:', error);
        });
    } catch (error) {
      console.error('Error adding user:', error);
      enqueueSnackbar('Failed to add user.', { variant: 'error' });
    }
  };

  const handleDeleteUser = async userId => {
    try {
      const token = localStorage.getItem('token');
      await StudentService.delete(id, userId, token);
      enqueueSnackbar('User removed successfully.', { variant: 'success' });
      // Refresh group details after deleting user
      GroupService.get(id)
        .then(details => {
          setGroupDetails(details.data);
          // Remove the deleted user ID from addedUsers state
          setAddedUsers(prevUsers => prevUsers.filter(id => id !== userId));
        })
        .catch(error => {
          console.error('Error fetching group details:', error);
        });
    } catch (error) {
      console.error('Error deleting user:', error);
      enqueueSnackbar('Failed to delete user.', { variant: 'error' });
    }
  };

  return (
    <div className="container">
      <h2>Group - {groupDetails && groupDetails.name} - Students</h2>
      
      <div className='mb-3'>
        <input
          type="text"
          placeholder="Search users to add ..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
        />
        {searchResults.length > 0 && (
          <ul className="list-group mt-2">
            {searchResults.map(user => (
              <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>{user.username}</div>
                {addedUsers.includes(user.id) ? (
                  <span className="badge badge-success badge-pill px-3 py-2">Already Added</span>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAddUser(user)}
                  >
                    Add
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Serial No</th>
            <th> </th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {groupDetails && groupDetails.users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>   <img
                          src={
                             user.images && user.images.length > 0
                              ? user.images[0].url
                              : "images/noimage.jpg"
                          }
                          alt="User"
                          className="img-fluid"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            fileSize: "1",
                          }}
                        />
                </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupStudents;
