import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const CategoryCard = ({ imgSrc, title }) => {
  const navigate = useNavigate();

  const categoryMap = {
    "Men's": "mens",
    "Women's": "womens",
    Electronics: "electronics",
    Jewellery: "jewellery",
  };

  const handleClick = () => {
    const categoryPath = categoryMap[title];
    navigate(`/my-store/products/category/${categoryPath}`);
  };

  return (
    <div className="category-card">
      <div className="cat-card-img-cont">
        <img
          src={imgSrc}
          alt="category-img"
          style={{ width: "60%", height: "100%" }}
        />
      </div>
      <button className="bigText" onClick={() => handleClick()}>
        {title}
      </button>
    </div>
  );
};

export default CategoryCard;
