import React, { useState, useEffect } from "react";
import GroupService from "../services/group.service";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [adminPayload, setAdminPayload] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const [userPayload] = useState([]);

  useEffect(() => {
    console.log("user effect 1");
    fetchGroups();
  }, []);

  useEffect(() => {
    console.log("user effect 2");
    console.log("local storage:", localStorage);
    const storedUsers = localStorage.getItem("user");
    console.log("Stored users:", storedUsers);
    const parsedUsers = JSON.parse(storedUsers);
    console.log("Parsed users:", parsedUsers);
    setAdminPayload(parsedUsers || []);
  }, []);

  const fetchGroups = async () => {
    GroupService.getAll()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to fetch Groups.", { variant: "error" });
      });
  };

  const addGroup = async (groupData, token) => {
    GroupService.create(groupData)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Group added successfully.", { variant: "success" });
        fetchGroups();
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      });
  };

  const updateGroup = async (groupId, groupData, token) => {
    GroupService.update(groupId, groupData)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Group updated successfully.", { variant: "success" });
        fetchGroups();
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to update Group.", { variant: "error" });
      });
  };

  const deleteGroup = async (groupId, token) => {
    GroupService.delete(groupId)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Group deleted successfully.", { variant: "success" });
        fetchGroups();
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar("Failed to delete Group.", { variant: "error" });
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
    if (formData.name === "") {
      enqueueSnackbar("Please enter name.", { variant: "error" });
      return;
    }
    if (formData.description === "") {
      enqueueSnackbar("Please enter description.", { variant: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const groupData = {
        name: formData.name,
        description: formData.description,
        users: userPayload,
        admins: [adminPayload],
      };
      if (isEditMode) {
        await updateGroup(selectedGroupId, groupData, token);
      } else {
        await addGroup(groupData, token);
      }
      fetchGroups();
      setFormData({
        name: "",
        description: "",
      });
      setIsEditMode(false);
      setSelectedGroupId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar("Failed to submit form.", { variant: "error" });
    }
  };

  const handleEdit = (group) => {
    setFormData({
      name: group.name,
      description: group.description,
    });
    setIsEditMode(true);
    setSelectedGroupId(group.id);
    setShowForm(true);
  };

  const handleDelete = async (groupId) => {
    const token = localStorage.getItem("token");
    await deleteGroup(groupId, token);
    fetchGroups();
  };

  return (
    <div>
      <h2>Groups</h2>
      
      <div className="mb-5">
        <button
          className="btn btn-primary mb-2 float-right"
          onClick={() => setShowForm(true)}
        >
          Add New
        </button>
      </div>
      {showForm ? (
        <div>
          <h3>{isEditMode ? "Update Group" : "Add Group"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mt-2">
                <div className="form-group">
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
                <div className="form-group">
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
            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Update Group" : "Add Group"}
            </button>
          </form>
        </div>
      ) : (
        <div className="row">
        {groups.length === 0 && <p>No Groups available.</p>}
          {groups.map((group) => (
            <div key={group.id} className="col-md-4 mt-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{group.name}</h5>

                  <p className="card-text">{group.description}</p>
                  {/* <p className="card-text">Students :{group.users.length}</p>
                  <p className="card-text">Admins :{group.admins.length}</p> */}
                  <div className="admin-actions">
                    <Link
                      className="btn btn-success  btn-block"
                      to={`/groups/${group.id}/admins`}
                    >
                      Admins ({group.admins.length})
                    </Link>

                    <Link
                      className="btn btn-primary btn-block"
                      to={`/groups/${group.id}/students`}
                    >
                      Students ({group.users.length}){" "}
                    </Link>
                    <br />
                    <button
                      onClick={() => handleDelete(group.id)}
                      className="btn btn-light"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(group)}
                      className="btn btn-secondary float-right"
                    >
                      Edit
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

export default Groups;
