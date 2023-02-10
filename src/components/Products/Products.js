import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Products.css";
import Product from "./Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSearch } from "@fortawesome/free-solid-svg-icons";

function Products() {
  let [products, setProducts] = useState([]);
  
  let [filteredProducts, setFilteredProducts] = useState([]);
  
  let [filterProductsSearch, setFilterProductsSearch] = useState([]);
  
  let [filterPriceSearch, setFilterPriceSearch] = useState([]);
  

  let [cat, setCat] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then(function (response) {
      let products = response.data.products;
      setProducts(products);
      setFilteredProducts(products);
      setFilterProductsSearch(products);
      setFilterPriceSearch(products)
    });
  }, []);

  function handleCategory(category) {
    if (category === "all") {
      setCat(category);
      setFilteredProducts(products);
      setFilterProductsSearch(products);
      setFilterPriceSearch(products)
    } else {
      setCat(category);
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
      setFilterProductsSearch(
        products.filter((product) => product.category === category)
      );
      setFilterPriceSearch(
        products.filter((product) => product.category === category)
      );
    }
  }

  let handleProductSearch = (e) => {
    let name = e.target.value;

    let filterSearch = filteredProducts.filter((item) => {
      if (name === "") {
        return item;
      }
      if (item.title.toLowerCase().includes(name.toLowerCase())) {
        return item;
      }
    });
    
    setFilterProductsSearch(filterSearch);
    setFilterPriceSearch(filterSearch)
  };
  
  let handlePrice = (e)=>{
    let price = Number(e.target.value)
    
    console.log(typeof(price))
    
    console.log(filterProductsSearch.filter(product=> product.price === price))
    
    let filterSearch = filterProductsSearch.filter((item) => {
        if (price === 1) {
          return item;
        }
        if (item.price === price) {
          return item;
        }
      });
    
    setFilterPriceSearch(filterSearch)
  }

  return (
    <section className="products">
      <div className="container">
        <div className="row g-4">
          <div className="filter-content col-sm-6 col-md-3">
            <h4 className="mb-5">Categories</h4>
            <p
              className={cat === "all" ? "cat__active" : ""}
              onClick={() => handleCategory("all")}
            >
              All
            </p>
            <hr />
            <p
              className={cat === "smartphones" ? "cat__active" : ""}
              onClick={() => handleCategory("smartphones")}
            >
              SmartPhones
            </p>
            <hr />
            <p
              className={cat === "laptops" ? "cat__active" : ""}
              onClick={() => handleCategory("laptops")}
            >
              Laptops
            </p>
            <hr />
            <p
              className={cat === "fragrances" ? "cat__active" : ""}
              onClick={() => handleCategory("fragrances")}
            >
              Fragrances
            </p>
            <hr />
            <p
              className={cat === "skincare" ? "cat__active" : ""}
              onClick={() => handleCategory("skincare")}
            >
              Skincare
            </p>
            <hr />
            <p
              className={cat === "groceries" ? "cat__active" : ""}
              onClick={() => handleCategory("groceries")}
            >
              Groceries
            </p>
            <hr />
            <p
              className={cat === "home-decoration" ? "cat__active" : ""}
              onClick={() => handleCategory("home-decoration")}
            >
              Home Decoration
            </p>
            <hr />
            <h4>Price</h4>
            <input type="range" min="1" max="20" onChange={handlePrice} />
          </div>

          <div className="products col-sm-6 col-md-9">
            <div className="row g-3">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                <div className="count">
                  <div className="count-icon">
                    <FontAwesomeIcon icon={faList} />
                  </div>
                  <div className="count-number">
                    {filterPriceSearch.length} Products Found
                  </div>
                </div>

                <div className="search d-flex align-items-center">
                  <input type="text" onChange={handleProductSearch} />
                  <div className="count-icon">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </div>
              </div>
              {filterPriceSearch.map((product) => (
                <div className="col-xl-4 col-md-6">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
