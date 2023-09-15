import React from "react";

const Categories = ({ onBrandFilter }) => {
  const data = [
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "JUNO",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "ĐÔNG THỊNH",
    },
    {
      cateImg: "./images/category/cat-3.png",
      cateName: "BE CLASSY",
    },
    {
      cateImg: "./images/category/cat-4.png",
      cateName: "ĐÔNG HẢI",
    },
    {
      cateImg: "./images/category/cat-5.png",
      cateName: "MWC",
    },
    {
      cateImg: "./images/category/cat-6.png",
      cateName: "ANANAT",
    },
  ];

  const handleBrandClick = (brandName) => {
    if (typeof onBrandFilter === "function") {
      onBrandFilter(brandName);
    }
  };

  return (
    <>
      <div className="category">
        {data.map((value, index) => {
          return (
            <div
              className="box f_flex"
              key={index}
              onClick={() => handleBrandClick(value.cateName)}
            >
              <img src={value.cateImg} alt="" />
              <span>{value.cateName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
