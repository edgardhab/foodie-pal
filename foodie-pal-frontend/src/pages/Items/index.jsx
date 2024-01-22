import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import SwiperVertical from "../../components/SwiperVertical";
import Loading from "../../components/Loading";
import { userApi } from "../../network/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import checkIfLoggedIn from "../../assets/checkIfLoggedIn";
import { useNavigate } from "react-router-dom";

import "./index.css";
import ItemsByPhoto from "../../components/ItemsByPhoto";
import YourItems from "../../components/YourItems";

const Items = () => {
  const navigate = useNavigate();
  const check = async () => {
    if (!(await checkIfLoggedIn())) {
      localStorage.clear();
      navigate("/");
    }
  };
  check();
  const [items, setItems] = useState([]);
  const [Load, setLoading] = useState(false);
  const [itemName, setItemName] = useState("");

  const handleCamerabtn = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const addBtnHandler = async (item) => {
    setLoading(true);
    if (item === "") {
      setLoading(false);
      return;
    }
    try {
      const data = {
        subDocument: {
          items: {
            name: item,
          },
        },
      };
      await userApi.updateUser(data);
      handleGetItems();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleGetItems = async () => {
    setLoading(true);
    try {
      const response = await userApi.getUser();
      setItems(response.items);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetItems();
  }, []);

  return (
    <div className="flex background">
      <div>
        <Nav />
      </div>
      <div className="landing">
        <Header />
        <div className="flex center column full-width  add-items">
          <div className="items-wraper">
            <div className="flex margin gap  center">
              <input
                type="text"
                className="input"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />
              <button
                className="btn"
                onClick={() => {
                  addBtnHandler(itemName);
                  setItemName("");
                }}
              >
                Add Item
              </button>
              <button className="btn" onClick={handleCamerabtn}>
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </div>
            <ItemsByPhoto addBtnHandler={addBtnHandler} />
            <YourItems />
          </div>
        </div>
      </div>
      {Load && <Loading />}
    </div>
  );
};

export default Items;
