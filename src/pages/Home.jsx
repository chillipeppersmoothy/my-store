import { useLocation } from "react-router-dom";
import "../App.css";
import CategoryCard from "../components/CategoryCard";
import Hero from "./../components/Hero";
import MensClothing from "/images/men-clothe.png";
import WomensClothing from "/images/women-clothe.png";
import ElectronicImage from "/images/electronic-transformed.png";
import JewelsImage from "/images/jewel-transformed.png";

const Home = () => {
  const location = useLocation();

  setTimeout(() => {
    if (location.state?.scrollToCategory) {
      const categorySection = document.getElementById("categoryScroll");
      categorySection.scrollIntoView({ behavior: "smooth" });
    }
  }, 300);

  const categories = [
    { imgSrc: MensClothing, title: "Men's" },
    { imgSrc: WomensClothing, title: "Women's" },
    { imgSrc: ElectronicImage, title: "Electronics" },
    { imgSrc: JewelsImage, title: "Jewellery" },
  ];

  return (
    <div>
      <Hero />
      <hr />
      <h2 style={{ textAlign: "center" }}>Categories</h2>
      <div
        className="cat-cont"
        id="categoryScroll"
        data-testid="categoryScroll"
      >
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            imgSrc={category.imgSrc}
            title={category.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
