import React, { useState, useEffect } from "react";
import Staffervice from "../../services/user.service";
import { enqueueSnackbar } from "notistack";
import ImageUpload from "../ImageUpload";

const Staff = () => {
  const [users, setUsers] = useState([]);
  const [rolesPayload] = useState([
    {
      id: 2,
      name: "ROLE_STAFF",
    },
  ]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: rolesPayload,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const defaultImage = "https://icons.veryicon.com/png/o/business/iconpack-003/gallery-28.png";
  const [StaffPicture, setStaffPicture] = useState(defaultImage);

  const handleImageUpload = (imageUrl) => {
    console.log("uploaded url :", imageUrl);
    formData.image = imageUrl;
    setStaffPicture(imageUrl);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    Staffervice.getAllStaff()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to fetch Staff.", { variant: "error" });
      });
  };

  const addUser = async (userData, token) => {
    console.log(userData);
   await Staffervice.create(userData)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Staff added successfully.", { variant: "success" });
        Staffervice.addPictureToUser(response.data.id, userData.image);
        setFormData([]);
        setStaffPicture(defaultImage);
        fetchUsers();
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      });
  };

  const updateUser = async (userId, userData, token) => {
    Staffervice.update(userId, userData)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Staff updated successfully.", { variant: "success" });
        setFormData([]);
        fetchUsers();
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to update Staff.", { variant: "error" });
      });
  };

  const deleteUser = async (userId, token) => {
    Staffervice.delete(userId)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Staff deleted successfully.", { variant: "success" });
        fetchUsers();
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to delete Staff.", { variant: "error" });
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
    // validation checks here...
    try {
      const token = localStorage.getItem("token");
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        roles: rolesPayload,
        image: StaffPicture,
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
          :  defaultImage,
      image: StaffPicture,
    });
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
      <h2>Staff</h2>
      {showForm ? (
        <div>
          <h3>{isEditMode ? "Update Staff" : "Add Staff"}</h3>
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
              <label>Staff Picture:</label>
              <ImageUpload
                name="userpic"
                onChange={handleImageUpload}
                width="100px"
                height="100px"
                className="custom-image"
                defaultUrl={StaffPicture}
              />
            </div>
            )}

            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Update Staff" : "Add Staff"}
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
          {users.length === 0 && <p>No Staff available.</p>}
            
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
                              : defaultImage
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

export default Staff;
