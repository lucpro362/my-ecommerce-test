import React, { useState } from "react";
import logo from "../../components/assets/images/logo.svg";
import { Link } from "react-router-dom";

const Search = ({ CartItem, shopItems }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const generateSuggestions = (value) => {
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      if (shopItems && shopItems.length > 0) {
        const matchingItems = shopItems.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(matchingItems);
    }}
  };

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      if (suggestions.length > 0) {
        const selectedSuggestion = suggestions[0];
        setSearchResults([selectedSuggestion]);
      } else {
        const filteredResults = shopItems.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(filteredResults);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <img src={logo} alt="" />
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input
              type="text"
              placeholder="Tên mặt hàng..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                generateSuggestions(e.target.value);
              }}
            />
            <button className="search-box" onClick={handleSearch}>
              Tìm kiếm
            </button>
          </div>

          <div className="icon f_flex width">
            <i className="fa fa-user icon-circle"></i>
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {suggestions.length > 0 && (
        <div className="suggestions">
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => {
                  setSearchValue(suggestion.name);
                  setSuggestions([]);
                  handleSearch();
                }}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Search;
