import React, { useState, useEffect } from 'react';
import ExamService from '../services/exam.service'; 
import { enqueueSnackbar } from 'notistack';
import { Link} from 'react-router-dom';  

const Exams = () => {
  const [Exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    examDate:'',
    examTime:'',
    examDuration:'',
    examLocation:''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [adminPayload, setAdminPayload] = useState(JSON.parse(localStorage.getItem('user')) || []);
  const [userPayload] = useState([]);
  
  useEffect(() => {
    console.log("user effect 1");
    fetchExams(); 
  }, []);

  useEffect(() => {
    console.log("user effect 2");
    console.log('local storage:', localStorage);
    const storedUsers = localStorage.getItem('user');
    console.log('Stored users:', storedUsers);
    const parsedUsers = JSON.parse(storedUsers);
    console.log('Parsed users:', parsedUsers);
    setAdminPayload(parsedUsers || []);
  }, []);
  

  const fetchExams = async () => {
    ExamService.getAll()
      .then(response => {
        setExams(response.data);
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar('Failed to fetch Exams.', { variant: 'error' });
      });
  }

  const addExam = async (formData, token) => {
    ExamService.create(formData)
      .then(response => {
        console.log(response.data);
        enqueueSnackbar('Exam added successfully.', { variant: 'success' });
        fetchExams();
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar(e.response.data.message, { variant: 'error' });
      });
  };

  const updateExam = async (ExamId, ExamData, token) => {
    ExamService.update(ExamId, ExamData)
      .then(response => {
        console.log(response.data);
        enqueueSnackbar('Exam updated successfully.', { variant: 'success' });
        fetchExams();
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar('Failed to update Exam.', { variant: 'error' });
      });
  };

  const deleteExam = async (ExamId, token) => {
    ExamService.delete(ExamId)
      .then(response => {
        console.log(response.data);
        enqueueSnackbar('Exam deleted successfully.', { variant: 'success' });
        fetchExams();
      })
      .catch(e => {
        console.log(e);
        enqueueSnackbar('Failed to delete Exam.', { variant: 'error' });
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
    if (formData.name === '') {
      enqueueSnackbar('Please enter name.', { variant: 'error' });
      return;
    }
    if (formData.description === '') {
        enqueueSnackbar('Please enter description.', { variant: 'error' });
        return;
      }
       
    try {
      const token = localStorage.getItem('token');
      
      const ExamData = {
         
        name: formData.name,
        description: formData.description, 
        users: userPayload,
        admins: [adminPayload],
        examDate: formData.examDate,
        examTime: formData.examTime,
        examDuration: formData.examDuration,
        examLocation: formData.examLocation,
      };
      if (isEditMode) {
        await updateExam(selectedExamId, ExamData, token);
      } else {
        await addExam(ExamData, token);
      }
      fetchExams();
      setFormData({
        name: '',
        description: '', 
      });
      setIsEditMode(false);
      setSelectedExamId(null);
      setShowForm(false);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Failed to submit form.', { variant: 'error' });
    }
  };

  const handleEdit = Exam => {
    setFormData({
       

      name: Exam.name,
      description: Exam.description, 
      users: userPayload,
      admins: [adminPayload],
      examDate: Exam.examDate,
      examTime: Exam.examTime,
      examDuration: Exam.examDuration,
      examLocation: Exam.examLocation,
    });
    setIsEditMode(true);
    setSelectedExamId(Exam.id);
    setShowForm(true);
  };

  const handleDelete = async ExamId => {
    const token = localStorage.getItem('token');
    await deleteExam(ExamId, token);
    fetchExams();
  };

  return (
    <div>
      <h2>Exams</h2>
      <div className='mb-5'>
        <button className="btn btn-primary mb-2 float-right" onClick={() => setShowForm(true)}>Add New</button>
      </div>
      {showForm ? (
        <div>
          <h3>{isEditMode ? 'Update Exam' : 'Add Exam'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mt-2">
                <div className="form-Exam">
                  <label htmlFor="name">Name:</label>
                  <input  
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-Exam">
                  <label htmlFor="description">Description:</label>
                  <input  
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
             <div className="row">
              <div className="col-md-6">
                <div className="form-Exam">
                  <label htmlFor="examDate">Date:</label>
                  <input  
                    type="date"
                    id="examDate"
                    name="examDate"
                    className="form-control"
                    value={formData.examDate}
                    onChange={handleChange}
                  />
                </div>
              
                <div className="form-Exam">
                  <label htmlFor="examTime">Time:</label>
                  <input  
                    type="time"
                    id="examTime"
                    name="examTime"
                    className="form-control"
                    value={formData.examTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-Exam">
                  <label htmlFor="description">Duration:</label>
                  <input  
                    type="text"
                    id="examDuration"
                    name="examDuration"
                    className="form-control"
                    value={formData.examDuration}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-Exam">
                  <label htmlFor="description">Exam location:</label>
                  <input  
                    type="text"
                    id="examLocation"
                    name="examLocation"
                    className="form-control"
                    value={formData.examLocation}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
 
 
            <button type="submit" className="btn btn-primary mt-2 mb-2">{isEditMode ? 'Update Exam' : 'Add Exam'}</button>
            <div className='mb-3'>&nbsp;</div>
          </form>
        </div>
      ) : (
        <div className="row">
        {Exams.length === 0 && <p>No Exams available.</p>}
          {Exams.map(Exam => (
            <div key={Exam.id} className="col-md-4 mt-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{Exam.name}</h5>                   
                  <p className="card-text">{Exam.description}</p>
                  <p className="card-text">Date :{Exam.examDate} -{Exam.examTime} </p>
                  <p className="card-text">  Duration: {Exam.examDuration}</p>
                  <p className="card-text">Location : {Exam.examLocation}</p>
                  {/* <p className="card-text">Students :{Exam.users.length}</p>
                  <p className="card-text">Admins :{Exam.admins.length}</p> */}
                  <div className="admin-actions">
                   
                    <Link className=" btn btn-success  btn-block" to={`/exams/${Exam.id}/admins`}>Admins ({Exam.admins.length})</Link>
                    <br /> 
                    <Link className="btn btn-primary btn-block" to={`/exams/${Exam.id}/students`}>Students ({Exam.users.length})</Link>
                   <br />
                   
                    <button onClick={() => handleDelete(Exam.id)} className="btn btn-light">Delete</button>
                    <button onClick={() => handleEdit(Exam)} className="btn btn-secondary float-right" >Edit</button>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exams;
