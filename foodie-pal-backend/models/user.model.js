const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EatingHabbit = require("./eatingHabbit.model");
const Allergy = require("./allergy.model");
const MedicalCondition = require("./medicalCondition.model");
const CookingPreference = require("./cookingPreference.model");
const DietPlanUserInfo = require("./dietPlanUserInfo.model");
const DietairyPreference = require("./dietairyPreference.model");
const NutritionGoal = require("./nutritionGoal.model");
const Item = require("./Item.model");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  resetPasswordCode: {
    type: String,
    default: "",
  },
  resetPasswordCodeUsed: {
    type: Boolean,
    default: false,
  },
  userRole: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId("657f052bf4aaced6b5b8d7b0"),
  },
  imageUrl: {
    type: String,
    default: "no-profile-picture-icon.png",
  },
  medications: {
    type: [String],
  },
  items: {
    type: [Item.schema],
  },
  eatingHabbits: {
    type: [EatingHabbit.schema],
  },
  medicalConditions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: MedicalCondition,
  },
  allergies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Allergy,
  },
  cookingPreferences: {
    type: [CookingPreference.schema],
  },
  DietPlanUserInfo: {
    type: [DietPlanUserInfo.schema],
  },
  DietairyPreferences: {
    type: [DietairyPreference.schema],
  },
  NutritionGoals: {
    type: [NutritionGoal.schema],
  },
});

userSchema.pre(
  "save",
  async function (next) {
    if (!this.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
