import React, { useState, useEffect } from 'react';
import { getGroupDetails } from '../services/group.service'; 


const StudentList = ({ groupId }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch group details using the provided id
    getGroupDetails(groupId)
      .then(details => {
        setStudents(details.data.users); // Assuming users represent students
      })
      .catch(error => {
        console.error('Error fetching group details:', error);
      });
  }, [groupId]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student => {
    return student.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h3>Students</h3>
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.id}>
              <td>{student.username}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleDelete(student.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
