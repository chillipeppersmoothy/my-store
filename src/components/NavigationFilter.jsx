/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const NavigatioFilter = ({
  displayProducts,
  name,
  categoryName,
  category,
  setDisplayProducts,
}) => {
  const navigate = useNavigate();

  return (
    <span
      className={
        displayProducts === name || category
          ? "selected-color"
          : "category-select-each"
      }
      onClick={() => {
        setDisplayProducts(name);
        if (name === "All" || categoryName === "") {
          navigate(`/products/`, {
            replace: true,
          });
        } else {
          navigate(`/products/category/${categoryName}`, {
            replace: true,
          });
        }
      }}
    >
      {name}
    </span>
  );
};

export default NavigatioFilter;
