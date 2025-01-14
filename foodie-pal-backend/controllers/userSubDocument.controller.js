const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const addEditSubDocument = async (req, res) => {
  try {
    const user = req.user;
    const subDocument = req.body.subDocument;
    for (const [key, value] of Object.entries(subDocument)) {
      let updateQuery = {};

      if (key === "items") {
        const existingItems = user.items || [];
        const newItem = value;

        const newItemName = newItem.name
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase());

        if (
          !existingItems.some(
            (item) => item.name.toLowerCase() === newItemName.toLowerCase()
          )
        ) {
          const updatedItems = [...existingItems, { name: newItemName }];
          updateQuery[key] = updatedItems;
        }
      } else if (key === "FavoriteRecipes") {
        const existingFavs = user.FavoriteRecipes || [];
        const newFav = value;

        if (!existingFavs.some((fav) => fav.title === newFav.title)) {
          const updatedItems = [...existingFavs, newFav];
          updateQuery[key] = updatedItems;
        }
      } else if (key === "password") {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(value, salt);
        updateQuery[key] = hashedPass;
      } else {
        updateQuery[key] = value;
      }

      await User.findByIdAndUpdate(req.user._id, updateQuery);
    }
    const updatedUser = await User.findById(req.user._id).select(
      "-password -_id -__v"
    );

    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubDocument = async (req, res) => {
  try {
    const subDocument = req.body.subDocument;

    for (const [key, value] of Object.entries(subDocument)) {
      if (key === "items" || key === "FavoriteRecipes") {
        await User.findByIdAndUpdate(req.user._id, {
          $pull: { [`${key}`]: value },
        });
      } else {
        await User.findByIdAndUpdate(req.user._id, {
          [`${key}`]: [],
        });
      }
    }

    const user = await User.findById(req.user._id).select(
      "-password -_id -__v"
    );

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addEditSubDocument,
  deleteSubDocument,
};
