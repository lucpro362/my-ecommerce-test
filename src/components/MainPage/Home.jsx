import React, { useState } from "react";
import Categories from "./Categories";
import "./Home.css";
import SliderHome from "./Slider";
import Sdata from "./Sdata"; // Import dữ liệu sản phẩm

const Home = () => {
  const [searchResults, setSearchResults] = useState([]); // Trạng thái lưu kết quả tìm kiếm

  // Hàm tìm kiếm các sản phẩm thuộc thương hiệu "JUNO"
  const searchJUNOProducts = () => {
    const junoProducts = Sdata.shopItems.filter(
      (item) => item.brand === "JUNO"
    );
    setSearchResults(junoProducts);
  };

  return (
    <>
      <section className="home">
        <div className="container d_flex">
          <Categories onJUNOCategoryClick={searchJUNOProducts} />
          <SliderHome />
        </div>
      </section>

      {/* Hiển thị kết quả tìm kiếm */}
      <div className="search-results">
        {searchResults.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            {/* Hiển thị thông tin sản phẩm khác */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
