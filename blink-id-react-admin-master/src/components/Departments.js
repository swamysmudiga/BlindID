import React, { useState, useEffect } from 'react';
import DeptService from '../services/departments.service';
import { enqueueSnackbar } from 'notistack';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
    number: '',
    email: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {   
    DeptService.getAll()
    .then(response => {
      setDepartments(response.data);
    })
    .catch(e => {
      console.log(e);
      enqueueSnackbar('Failed to fetch roles.', { variant: 'error' });
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
    DeptService.create(formData)
    .then(response => {
      console.log(response.data);
      enqueueSnackbar('Department added successfully.', { variant: 'success' });
      setIsFormVisible(false);
      setIsEditMode(false);
      setFormData({}); 
      fetchDepartments();
    })
    .catch(e => {
      console.log(e);
      enqueueSnackbar('Failed to add  Department.', { variant: 'error' });
    });
  };

  const handleEdit = department => {
    setFormData({
      name: department.name,
      description: department.description,
      code: department.code,
      number: department.number,
      email: department.email,
    });
    setIsEditMode(true);
    setSelectedDepartmentId(department.id);
    setIsFormVisible(true); // Ensure the form is visible when editing
  };

  const handleUpdate =  async e => {
    e.preventDefault();
    formData.id = selectedDepartmentId;
    DeptService.update(selectedDepartmentId, formData)

    .then(response => {
      console.log(response.data);
      enqueueSnackbar('Department updated successfully.', { variant: 'success' });
      setIsFormVisible(false);
      fetchDepartments();
    })
    .catch(e => {
      console.log(e);
      enqueueSnackbar('Failed to update user.', { variant: 'error' });
    });
  };
  

  const handleDelete = async  department_id  => {
    DeptService.delete(department_id)
    .then(response => {
      console.log(response.data);
      enqueueSnackbar('Department deleted successfully.', { variant: 'success' });
      setIsFormVisible(false);
      fetchDepartments();
    })
    .catch(e => {
      console.log(e);
      enqueueSnackbar('Failed to delete Department.', { variant: 'error' });
    });
  };

  return (
    <div>
      <h2>Departments</h2>
      
      {isFormVisible && (

        
       <div className='col-6'>
       <h5>{isEditMode ? 'Update Department' : 'Add Department'}</h5>
        
          <div className="form-group">
            <label>Name:</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea  required name="description" value={formData.description} onChange={handleChange} className="form-control"></textarea>
          </div>
          <div className="form-group">
            <label>Code:</label>
            <input required type="text" name="code" value={formData.code} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Number:</label>
            <input required type="text" name="number" value={formData.number} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
          </div>
          <button type="submit"  onClick={isEditMode ? handleUpdate : handleSubmit}  className="btn btn-primary">{isEditMode ? 'Update' : 'Add'}</button>
         
        </div>
      )}
      {!isFormVisible && (
        
        <div className='table-responsive'>
        <button className="btn btn-primary mb-2 float-right" onClick={() => setIsFormVisible(true)}>Add New</button>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(department => (
              <tr key={department.id}>
                <td>{department.name}</td>
                <td>{department.code}</td>
                <td>{department.number}</td>
                <td>{department.email}</td>
                <td>
                  <button className='btn btn-primary  mr-2' onClick={() => handleEdit(department)}>Edit</button>
                  <button  className='btn btn-danger' onClick={() => handleDelete(department.id)}>Delete</button>
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

export default Departments;
