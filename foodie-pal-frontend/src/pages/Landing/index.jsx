import React from "react";
import Nav from "../../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";
import CategoriesNav from "../../components/CategoriesNav";
import "./index.css";
function Landing() {
  const showMenu = () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("showing");
    menu.classList.toggle("hidden");
  };
  return (
    <div className="flex ">
      <div>
        <Nav />
      </div>
      <div className="landing ">
        <button onClick={showMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="flex center">
          <CategoriesNav />
        </div>

        <div className="flex wrap  center cards">
          <Card
            title="Tamil Nadu Style Poo Kosu Poriyal - Pepper Garlic Cauliflower Poriyal Recipe"
            calories="417"
            time="60m"
            imageUrl="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Indian_Masala_Pasta_Recipe_With_Achari_Chicken-6_1600.jpg"
          />
          <Card
            title="Banana Bread"
            calories="417"
            time="60m"
            imageUrl="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Indian_Masala_Pasta_Recipe_With_Achari_Chicken-6_1600.jpg"
          />
          <Card
            title="Banana Bread"
            calories="417"
            time="60m"
            imageUrl="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Indian_Masala_Pasta_Recipe_With_Achari_Chicken-6_1600.jpg"
          />
          <Card
            title="Banana Bread"
            calories="417"
            time="60m"
            imageUrl="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Indian_Masala_Pasta_Recipe_With_Achari_Chicken-6_1600.jpg"
          />
          <Card
            title="Banana Bread"
            calories="417"
            time="60m"
            imageUrl="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Indian_Masala_Pasta_Recipe_With_Achari_Chicken-6_1600.jpg"
          />
          <Card
            title="Banana Bread"
            calories="417"
            time="60m"
            imageUrl="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Indian_Masala_Pasta_Recipe_With_Achari_Chicken-6_1600.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
