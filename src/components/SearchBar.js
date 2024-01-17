import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import data from '../books.json';

import './SearchBar.css';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelecteditem] = useState(-1);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setSearch('');
    setSearchData([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp' && selectedItem > 0) {
      setSelecteditem((prev) => prev + 1);
    } else if (e.key === 'ArrowDown' && selectedItem < searchData.length - 1) {
      setSelecteditem((prev) => prev + 1);
    } else if (e.key === 'Enter' && selectedItem >= 0) {
      window.open(searchData[selectedItem].link);
    }
  };
  useEffect(() => {
    if (search !== '') {
      const newfilterData = data.filter((book) => {
        return book.title.includes(search);
      });
      setSearchData(newfilterData);
    }
  }, [search]);

  return (
    <section className="search_section">
      <div className="search_input_div">
        <input
          type="text"
          className="search_input"
          placeholder="Search..."
          autoComplete="off"
          onChange={handleChange}
          value={search}
          onKeyDown={handleKeyDown}
        />
        <div className="search_icon">
          {search === '' ? <SearchIcon /> : <CloseIcon onClick={handleClose} />}
        </div>
      </div>
      <div className="search_result">
        {searchData.slice(0, 10).map((data, index) => {
          return (
            <a
              href={data.link}
              key={index}
              rel="noopener noreferrer"
              target="_blank"
              className={
                selectedItem === index
                  ? 'search_suggestion_line active'
                  : 'search_suggestion_line'
              }
            >
              {data.title}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default SearchBar;
