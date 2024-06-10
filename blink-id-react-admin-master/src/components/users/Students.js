import React, { useState, useEffect } from "react";
import StudentService from "../../services/user.service";
import { enqueueSnackbar } from "notistack";
import ImageUpload from "../ImageUpload";

const Students = () => {
  const [users, setUsers] = useState([]);
  const [rolesPayload] = useState([
    {
      id: 1,
      name: "ROLE_STUDENT",
    },
  ]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: rolesPayload,
  });
  const defaultImage = "https://icons.veryicon.com/png/o/business/iconpack-003/gallery-28.png";
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);  
  const [studentPicture, setstudentPicture] = useState(defaultImage);
  
  //handling the form edited or not 
  // const [formInitialData, setformInitialData] = useState(null);
  // const [formUpdatedData, setformUpdatedData] = useState(null);

  const handleImageUpload = (imageUrl) => {
    console.log("uploaded url :", imageUrl);
    formData.image = imageUrl;
    setstudentPicture(imageUrl);
  };

  // const isFormDirty = () => {
  //   // Compare current form data with initial data
  //   return JSON.stringify(formUpdatedData) !== JSON.stringify(formInitialData);
  // };


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    StudentService.getAllStudents()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to fetch students.", { variant: "error" });
      });
  };

  const addUser = async (userData, token) => {
    console.log(userData);
   await  StudentService.createStudent(userData)
      .then((response) => {
        console.log(response.data);
        setstudentPicture(defaultImage);
        setFormData([]);
        enqueueSnackbar("Student added successfully.", { variant: "success" });
        fetchUsers();
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      });
  };

  const updateUser = async (userId, userData, token) => {
    StudentService.update(userId, userData)
      .then((response) => {
        console.log(response.data);
        setstudentPicture(defaultImage);
        setFormData([]);
         
        enqueueSnackbar("Student updated successfully.", {
          variant: "success",
        });
        fetchUsers();
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to update Student.", { variant: "error" });
      });
  };

  const deleteUser = async (userId, token) => {

    const Confirm = window.confirm('Are you sure to delete ?');
    if(Confirm)
    {
    StudentService.delete(userId)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Student deleted successfully.", {
          variant: "success",
        });
        fetchUsers();
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to delete Student.", { variant: "error" });
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation checks here...
    try {
      const token = localStorage.getItem("token");
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        roles: rolesPayload,
        image: studentPicture,
      };
      if (isEditMode) {
        await updateUser(selectedUserId, userData, token);
      } else {
        await addUser(userData, token);
      }
      fetchUsers();
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setIsEditMode(false);
      setSelectedUserId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar("Failed to submit form.", { variant: "error" });
    }
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      password: user.password,
      role: rolesPayload,
      image_src:
        user.images && user.images.length > 0
          ? user.images[0].url
          : "images/noimage.jpg",
      image: studentPicture,
    });
    setIsEditMode(true);
    setSelectedUserId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token");
    await deleteUser(userId, token);
    fetchUsers();
  };

  return (
    <div>
      <h2>Students</h2>
      {showForm ? (
        <div>
          <h3>{isEditMode ? "Update Student" : "Add Student"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {!isEditMode && (
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
            {!isEditMode && (
            <div>
              <label>Student Picture:</label>
              <ImageUpload
                name="userpic"
                onChange={handleImageUpload}
                width="100px"
                height="100px"
                className="custom-image"
                defaultUrl={studentPicture}
              />
            </div>
            )}

            <button type="submit" className="mt-2 btn btn-primary">
              {isEditMode ? "Update student" : "Add Student"}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-primary mb-2 float-right"
            onClick={() => setShowForm(true)}
          >
            Add New
          </button>
          <br />
          <div className="row  ">
          {users.length === 0 && <p>No Students available.</p>}
            
              {users.map((user) => (
                <div key={user.id} className="col-md-4 mt-2">
                  <div className="card ">
                    <div className="card-body">
                      <div
                        className="card-image"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            user.images && user.images.length > 0
                              ? user.images[0].url
                              : "images/noimage.jpg"
                          }
                          alt="User"
                          className="img-fluid"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            fileSize: "1",
                          }}
                        />
                      </div>
                      <h5 className="card-title">{user.username}</h5>
                      <p className="card-text">Email: {user.email}</p>
                      <p className="card-text">Password: {user.password}</p>

                      <div className="admin-actions">
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn btn-primary mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-light"
                        >
                          Delete
                        </button>
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

export default Students;
