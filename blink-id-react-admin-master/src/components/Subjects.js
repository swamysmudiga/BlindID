import React, { useState, useEffect } from 'react';
import SubjectsService from '../services/subjects.service';
import DepartmentService from '../services/departments.service';
import { enqueueSnackbar } from 'notistack';

const Subjects = () => {
  const [SubjectsList, setSubjects] = useState([]);
  const [Departments, SetDepartments] = useState([]);
  const [formData, setFormData] = useState({
      name: '',
      description: '',
      departmentId: '',
      image: '',
      code: '',
      credit: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility

  useEffect(() => {
    fetchSubjects();
    fetchDepartments();
  }, []);

  const fetchSubjects = async () => {   
    SubjectsService.getAll()
    .then(response => {
      setSubjects(response.data);
    })
    .catch(e => {
      console.log(e);
      enqueueSnackbar('Failed to fetch Subjects.', { variant: 'error' });
    });
  };

  const fetchDepartments = async () => {   
    DepartmentService.getAll()
    .then(response => {
      SetDepartments(response.data);
    })
    .catch(e => {
      console.log(e);
      enqueueSnackbar('Failed to fetch departments.', { variant: 'error' });
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
    SubjectsService.create(formData)
    .then(response => {
      console.log(response.data);
      enqueueSnackbar('Subject added successfully.', { variant: 'success' });
      setIsFormVisible(false);
      setIsEditMode(false);
      setFormData({}); 
      fetchSubjects();
    })
    .catch(e => {
      console.log(e);
      enqueueSnackbar('Failed to add  Subjects.', { variant: 'error' });
    });

};


const handleAdd= Subjects => {
    setFormData({
      name: '',  
      description: '',  
      departmentId: '',  
      image: '',  
      code: '',  
      credit: ''
    });
    setIsEditMode(false);
    setIsFormVisible(true);
};
const handleCancel= Subjects => {
    
    setIsFormVisible(false);
    fetchSubjects();
};





  const handleEdit = Subjects => {
    setFormData({
      name: Subjects.name,      
      description: Subjects.description,
      departmentId: Subjects.departmentId,
      image: Subjects.image,
      code: Subjects.code,
      credit: Subjects.credit 
    });
 
    setIsEditMode(true);
    setSelectedSubjectId(Subjects.id);
    setIsFormVisible(true); // Ensure the form is visible when editing
  };

  const handleUpdate =  async e => {
    e.preventDefault();
    
    formData.id = selectedSubjectId;
    console.log(selectedSubjectId);
    console.log(formData);
    SubjectsService.update(selectedSubjectId, formData)

    .then(response => {
      console.log(response.data);
      enqueueSnackbar('Subject updated successfully.', { variant: 'success' });
      setIsFormVisible(false);
      fetchSubjects();
    })
    .catch(e => {
      console.log(e);
      enqueueSnackbar('Failed to Subject  .', { variant: 'error' });
    });
  };
  

  const handleDelete = async  Subject_id  => {
    SubjectsService.delete(Subject_id)
    .then(response => {
      console.log(response.data);
      enqueueSnackbar('Subject deleted successfully.', { variant: 'success' });
      setIsFormVisible(false);
      fetchSubjects();
    })
    .catch(e => {
      console.log(e);
      enqueueSnackbar('Failed to delete Subjects.', { variant: 'error' });
    });
  };

  return (
    <div>
      <h2>Subjects</h2>
      
      {isFormVisible && (
       
        <form onSubmit={handleSubmit}>
       <div className='col-6'>
       <h5>{isEditMode ? 'Update Subject' : 'Add Subject'}</h5>
      
        
          <div className="form-group">
            <label>Name:</label>
            <input  required type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
          </div>
           <div className="form-group">
            <label>Description:</label>
            <textarea  required name="description" value={formData.description} onChange={handleChange} className="form-control"></textarea>
          </div>
          
          <div className="form-group">
          <label>Department:</label>
          <select required name="departmentId" value={formData.departmentId} onChange={handleChange} className="form-control">
              <option value="">Select Department</option>
              {Departments.map(department => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
            </div>
            <div className="form-group">
            <label>Code:</label>
            <input required type="text" name="code" value={formData.code} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input required type="text" name="image" value={formData.image} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Credit:</label>
            <input required type="text" name="credit" value={formData.credit} onChange={handleChange} className="form-control" />
          </div>
         
         
          <button type="submit"  onClick={isEditMode ? handleUpdate : handleSubmit}  className="btn btn-primary mr-2">{isEditMode ? 'Update' : 'Add'}</button>
          <button className='btn btn-warning  mr-2' onClick={() => handleCancel()}>Cancel</button>
          
        </div>
        </form>
      )}
      {!isFormVisible && (
        
        <div className='table-responsive'>
        <button className="btn btn-primary mb-2 float-right " onClick={() => handleAdd()} >Add New</button>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Code</th>  
              <th>Image</th>
              <th>Credit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {SubjectsList.map(SubjectDetails => (
              <tr key={SubjectDetails.id}>
                <td>{SubjectDetails.name}</td>                
                <td>{Departments.find(depts => depts.id === SubjectDetails.departmentId)?.name}</td> 
                <td>{SubjectDetails.code}</td> 
                <td>{SubjectDetails.image}</td> 
                <td>{SubjectDetails.credit}</td>
                <td>
                  <button className='btn btn-primary  mr-2' onClick={() => handleEdit(SubjectDetails)}>Edit</button>
                  <button  className='btn btn-danger mr-2'  onClick={() => handleDelete(SubjectDetails.id)}>Delete</button>
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

export default Subjects;
