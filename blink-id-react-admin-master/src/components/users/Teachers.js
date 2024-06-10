import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import { enqueueSnackbar } from "notistack";
import ImageUpload from "../ImageUpload";



const Teachers = () => {
  const defaultImage = "https://icons.veryicon.com/png/o/business/iconpack-003/gallery-28.png";
  const [users, setUsers] = useState([]);
  //add roles payload here  to avoid
  const [rolesPayload] = useState([{ id: 4, name: "ROLE_TEACHER" }]);
  const [TeacherPicture, setTeacherPicture] = useState(defaultImage);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: rolesPayload,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleImageUpload = (imageUrl) => {
    console.log("uploaded url :", imageUrl);
    formData.image = imageUrl;
    setTeacherPicture(imageUrl);
   // UserService.uploadpic(response.data.id, userData.image);

  };


  const fetchUsers = async () => {
    UserService.getAllTeachers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to fetch teachers.", { variant: "error" });
      });
  };

  const addUser = async (userData, token) => {
    try {
      // Create user
      const createUserResponse = await UserService.create(userData);
  
      // Once user is created, grab the user ID
      const userId = createUserResponse.data.id;
  
      // Add image 
      await UserService.addPictureToUser(userId, userData.image);
  
      // Fetch users after both user creation and image upload are done
      fetchUsers();
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "", // Reset role field
      });
      setTeacherPicture(defaultImage);
  
      console.log("User added successfully.");
      enqueueSnackbar("Teacher added successfully.", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };
  
  

  const updateUser = async (userId, userData, token) => {
    UserService.update(userId, userData)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Teacher updated successfully.", {
          variant: "success",
        });
        fetchUsers();
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "", // Reset role field
        });
        setTeacherPicture(defaultImage);
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to update teacher.", { variant: "error" });
      });
  };

  const deleteUser = async (userId, token) => {
    UserService.delete(userId)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Teacher deleted successfully.", {
          variant: "success",
        });
        fetchUsers();
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "", // Reset role field
        });
        setTeacherPicture(defaultImage);
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to delete teacher.", { variant: "error" });
      });
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
    if (formData.username === "") {
      enqueueSnackbar("Please enter username.", { variant: "error" });
      return;
    }
    if (formData.email === "") {
      enqueueSnackbar("Please enter Email address.", { variant: "error" });
      return;
    }
    if (formData.password === "") {
      enqueueSnackbar("Please enter password.", { variant: "error" });
      return;
    }
    try {
      const token = localStorage.getItem("token");
      
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        roles: rolesPayload, // Include role field
        image:  TeacherPicture,
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
        role: "", // Reset role field
      });
      setTeacherPicture(defaultImage);

      setIsEditMode(false);
      setSelectedUserId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar("Failed to submit form.", { variant: "error" });
    }
  };

  const handleEdit = (user) => {
    console.log(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: user.password,
      roles: rolesPayload, // Include role field
    });
    //setTeacherPicture(user.images[0].url);
    setIsEditMode(true);
    setSelectedUserId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    const Confirm = window.confirm('Are you sure to delete ?');
    if(Confirm)
    {
      const token = localStorage.getItem("token");
      await deleteUser(userId, token);
      fetchUsers();
    }
  };

  return (
    <div>
      <h2>Teachers</h2>
      <div className="mb-5">
        <button
          className="btn btn-primary mb-2 float-right  "
          onClick={() => setShowForm(true)}
        >
          Add New
        </button>
      </div>
      {showForm ? (
        <div>
          <h3>{isEditMode ? "Update teacher" : "Add teacher"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mt-2">
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
              <label>  Picture:</label>
              <ImageUpload
                name="userpic"
                onChange={handleImageUpload}
                width="100px"
                height="100px"
                className="custom-image"
                defaultUrl={TeacherPicture}
              />
            </div>
            )}


            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Update teacher" : "Add teacher"}
            </button>
          </form>
        </div>
      ) : (
        <div className="row">
        {users.length === 0 && <p>No Teachers available.</p>}
          {users.map((user) => (
            <div key={user.id} className="col-md-4 mt-2">
              <div className="card">
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
      )}
    </div>
  );
};

export default Teachers;
