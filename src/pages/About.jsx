/* eslint-disable react/no-unescaped-entities */
import "../App.css";

const About = () => {
  return (
    <div className="about-cont">
      <div className="about-header">
        <h1 className="header-h1">About us page.</h1>
        <p className="about-description">
          This is a simple website based react -{" "}
          <a href="https://vitejs.dev/" target="_blank">
            vite
          </a>
          {", "}
          where a user can view/search/filter products and add to cart, the user
          can also view the card remove items and move to checkout, login is
          required for placing the order and its achoved using real id's who are
          authenticated using API's and once the login is successful the user
          gets redirected to checkout.
        </p>
        <p>
          The state management is done using{" "}
          <a href="https://www.npmjs.com/package/redux" target="_blank">
            redux
          </a>{" "}
          and{" "}
          <a
            href="https://www.npmjs.com/package/@reduxjs/toolkit"
            target="_blank"
          >
            @reduxjs/toolkit
          </a>
          .
        </p>
        <p>
          The unit tests have been written using{" "}
          <a href="https://vitest.dev/">vitest</a> testing framework.
        </p>
        <p>
          The website is using dummy API's from{" "}
          <a href="https://fakestoreapi.com/">fakestoreapi.com</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
