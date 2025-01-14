import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { userApi } from "../../network/axios";

function EditProfile({ toggleEditProfile, user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showEditName, setShowEditName] = useState(false);
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    const profileInput = document.getElementById("profileInput");
    if (profileInput) {
      profileInput.click();
    }
  };
  const handleProfileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const image = await userApi.uploadImage(formData);
      setUploadedImage(image.image);
      user.imageUrl = image.image;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const saveChanges = async () => {
    const data = {
      subDocument: {},
    };

    if (firstName !== user.firstName) {
      data.subDocument.firstName = firstName;
    }

    if (lastName !== user.lastName) {
      data.subDocument.lastName = lastName;
    }

    if (password !== "") {
      data.subDocument.password = password;
    }
    const updatedUser = await userApi.updateUser(data);
    localStorage.setItem("user", JSON.stringify(updatedUser.updatedUser));
    toggleEditProfile();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button onClick={toggleEditProfile}>
            <FontAwesomeIcon icon={faX} color="white" />
          </button>
        </div>
        <hr />
        <div className="modal-content flex gap column">
          <div className="flex gap">
            <div className="flex gap center">
              <div className={`profile-image-container hovered`}>
                <img
                  className="recipe-image-medium"
                  src={
                    uploadedImage
                      ? `${process.env.REACT_APP_BASE_URL}/images/${uploadedImage}`
                      : `${process.env.REACT_APP_BASE_URL}/images/${user.imageUrl}`
                  }
                  alt="profile"
                />
                <input
                  type="file"
                  name=""
                  hidden
                  id="profileInput"
                  onChange={handleProfileChange}
                />
                <div className="overlay" onClick={handleClick}>
                  <div className="pen">
                    <FontAwesomeIcon icon={faPen} size="xs" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  center ">
              {!showEditName && (
                <h3 className="color-white">
                  {user.firstName + " " + user.lastName}
                </h3>
              )}
              {showEditName && (
                <div className="flex gap">
                  <input
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    onChange={handleLastNameChange}
                    value={lastName}
                  />
                </div>
              )}
              {!showEditName && (
                <div className="pen-square">
                  <button
                    className="btn-menu"
                    onClick={() => {
                      setShowEditName(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="color-white" htmlFor="email-profile">
              Email
            </label>
            <input
              type="text"
              className="input"
              disabled
              placeholder={user.email}
              id="email-profile"
            />
          </div>
          <div>
            <label className="color-white" htmlFor="password-profile">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              id="password-profile"
              className="input"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex center">
            <button className="btn" onClick={saveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
