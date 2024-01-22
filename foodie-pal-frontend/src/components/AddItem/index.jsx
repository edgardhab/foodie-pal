import React from "react";

function AddItem() {
  return (
    <>
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
    </>
  );
}

export default AddItem;
