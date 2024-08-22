import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../App.css";
import NavigatioFilter from "../components/NavigationFilter";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services";
import { fetched, setProducts } from "../store/productsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { category } = useParams();
  const [displayProducts, setDisplayProducts] = useState("");

  const filterData = [
    {
      name: "All",
      categoryName: "",
    },
    {
      name: "Men's",
      categoryName: "mens",
    },
    {
      name: "Women's",
      categoryName: "womens",
    },
    {
      name: "Electronic's",
      categoryName: "electronics",
    },
    {
      name: "Jewellery",
      categoryName: "jewellery",
    },
  ];

  const productsData = {
    "Women's": state.products.womens,
    "Men's": state.products.mens,
    "Electronic's": state.products.electronics,
    Jewelery: state.products.jewellery,
    womens: state.products.womens,
    mens: state.products.mens,
    electronics: state.products.electronics,
    jewellery: state.products.jewellery,
  };

  const productsToDisplay =
    productsData[displayProducts] ||
    productsData[category] ||
    state.products.products;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (state.products.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      const response = await getProducts(signal);
      dispatch(setProducts(response));
      dispatch(fetched());
      return response;
    };

    fetchProducts().catch((e) => console.log(e));
    return () => {
      controller.abort();
    };
  }, [dispatch, state.products.fetchDone]);

  const filteredData = (data) => {
    return data.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(state.products.searchQuery.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(state.products.searchQuery.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(state.products.searchQuery.toLowerCase())
    );
  };

  return (
    <div className="products-cont">
      <div className="category-select">
        {filterData?.map((filter) => (
          <NavigatioFilter
            displayProducts={displayProducts}
            name={filter.name}
            categoryName={filter.categoryName}
            category={category === filter.categoryName}
            setDisplayProducts={setDisplayProducts}
            key={filter.name}
          />
        ))}
      </div>
      <div className="product-card-cont">
        {filteredData(productsToDisplay).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
